"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import { Alert, Box, Button, Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import DetailFactGrid from "@/components/detail/DetailFactGrid";
import DetailMetricCard from "@/components/detail/DetailMetricCard";
import DetailPageShell from "@/components/detail/DetailPageShell";
import DetailSectionCard from "@/components/detail/DetailSectionCard";
import EntityLocationsMap from "@/components/detail/EntityLocationsMap";
import {
  PHARMACY_DRUG_DELETE,
  type PharmacyDrugDeleteMutation,
  type PharmacyDrugDeleteMutationVariables,
} from "@/features/medicine/graphql/mutation.gql";
import {
  DrugDetailDocument,
  type DrugDetailQuery,
  type DrugDetailQueryVariables,
} from "@/features/medicine/graphql/queries.gql";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";
import { getMedicineSubjectForRole, getPortalRole } from "@/lib/casl";
import { useAbility } from "@/lib/casl/useAbility";
import {
  formatAddress,
  formatDateTime,
  formatNullable,
  formatPrice,
} from "@/utils/detailFormatters";
import { getApolloErrorMessage } from "@/utils/getApolloErrorMessage";

import PharmacyDrugListingModal from "../../components/pharmacy-drug-listing.modal";

type MedicineDetailContainerProps = {
  id: string;
};

const statusLabelMap: Record<string, string> = {
  AVAILABLE: "Боломжтой",
  LOW: "Нөөц багатай",
  OUT_OF_STOCK: "Дууссан",
  UNKNOWN: "Тодорхойгүй",
};

export default function MedicineDetailContainer({
  id,
}: MedicineDetailContainerProps) {
  const { data: session } = useSession();
  const { activeOrganization } = useActiveOrganization();
  const portalRole = getPortalRole(
    session?.user ?? null,
    activeOrganization ?? null,
  );
  const subject = getMedicineSubjectForRole(portalRole);
  const ability = useAbility();

  const [listingModalOpen, setListingModalOpen] = useState(false);
  const [listingError, setListingError] = useState<string | null>(null);

  const { data, loading, error, refetch } = useQuery<
    DrugDetailQuery,
    DrugDetailQueryVariables
  >(DrugDetailDocument, {
    variables: { drugDetailId: id },
    fetchPolicy: "no-cache",
  });

  const [deleteListing, deleteListingState] = useMutation<
    PharmacyDrugDeleteMutation,
    PharmacyDrugDeleteMutationVariables
  >(PHARMACY_DRUG_DELETE);

  const drug = data?.drugDetail;
  const organizationId = activeOrganization?.organization?.id ?? null;
  const currentListing =
    drug?.availability.find(
      (entry) => entry.organizationId === organizationId,
    ) ?? null;

  const isPharmacyPortal =
    portalRole === "PHARMACY_OWNER" ||
    portalRole === "PHARMACY_MANAGER" ||
    portalRole === "PHARMACY_STAFF";
  const canManageListing =
    isPharmacyPortal &&
    (ability.can("create", subject) ||
      ability.can("update", subject) ||
      ability.can("delete", subject));

  const rolePrefix =
    portalRole === "ADMIN"
      ? "admin"
      : portalRole === "USER"
        ? "user"
        : "pharmacy";

  const handleDeleteListing = async () => {
    if (!drug?.id) return;

    setListingError(null);

    try {
      await deleteListing({ variables: { drugId: drug.id } });
      await refetch();
    } catch (mutationError) {
      setListingError(
        getApolloErrorMessage(
          mutationError,
          "Энэ эмийн сангийн нөөцийн мэдээллийг устгах үед алдаа гарлаа.",
        ),
      );
    }
  };

  return (
    <AbilityGuard action="read" subject={subject}>
      {loading ? (
        <StateView title="Эмийн мэдээллийг уншиж байна..." loading />
      ) : error ? (
        <StateView
          title="Эмийн мэдээлэл ачаалахад алдаа гарлаа"
          description={error.message}
        />
      ) : !drug ? (
        <StateView
          title="Эмийн мэдээлэл олдсонгүй"
          description="Хүссэн эмийн бүртгэл байхгүй эсвэл харах эрх хүрэлцэхгүй байна."
        />
      ) : (
        <>
          <DetailPageShell
            title={drug.name ?? "Эмийн дэлгэрэнгүй"}
            subtitle="Тухайн эмийн үндсэн мэдээлэл, аль эмийн сангуудад худалдаалагдаж байгаа байдал, үнийн мэдээлэл болон нөөцийн төлөвийг нэг дор харуулна."
            typeLabel="Эм"
            meta={[
              `Шинэчлэгдсэн: ${formatDateTime(drug.updatedAt)}`,
              `Бүртгэсэн: ${formatDateTime(drug.createdAt)}`,
            ]}
            aside={
              <>
                <DetailMetricCard
                  label="Нийт нөөц"
                  value={`${drug.totalStock} ширхэг`}
                  tone={drug.totalStock > 0 ? "success" : "warning"}
                />
                <DetailMetricCard
                  label="Доод үнэ"
                  value={
                    drug.startingPrice != null
                      ? `${formatPrice(drug.startingPrice)} ₮`
                      : "Бүртгэгдээгүй"
                  }
                />
                <DetailMetricCard
                  label="Зарж буй эмийн сан"
                  value={`${drug.availabilityCount}`}
                  tone={drug.availabilityCount > 0 ? "success" : "warning"}
                />
                {canManageListing ? (
                  <DetailSectionCard
                    title="Манай эмийн сан"
                    description="Энэ эмийн өөрийн салбар дээрх нөөц, үнэ, төлөвийг эндээс удирдана."
                    eyebrow="Удирдлага"
                  >
                    <Stack spacing={1.5}>
                      {listingError ? (
                        <Alert
                          severity="error"
                          sx={{ borderRadius: "0.75rem" }}
                        >
                          {listingError}
                        </Alert>
                      ) : null}
                      {currentListing ? (
                        <Alert
                          severity="success"
                          sx={{ borderRadius: "0.75rem" }}
                        >
                          Манай эмийн санд {currentListing.quantity} ширхэг
                          нөөцтэй
                          {currentListing.price != null
                            ? `, үнэ нь ${formatPrice(currentListing.price)} ₮ байна.`
                            : "."}
                        </Alert>
                      ) : (
                        <Alert severity="info" sx={{ borderRadius: "0.75rem" }}>
                          Энэ эм манай эмийн санд одоогоор холбоогүй байна.
                        </Alert>
                      )}
                      <Button
                        variant="contained"
                        onClick={() => setListingModalOpen(true)}
                      >
                        {currentListing
                          ? "Нөөцийн мэдээлэл засах"
                          : "Манай эмийн санд нэмэх"}
                      </Button>
                      {currentListing ? (
                        <Button
                          color="error"
                          variant="outlined"
                          onClick={handleDeleteListing}
                          disabled={deleteListingState.loading}
                        >
                          Эмийн сангаас хасах
                        </Button>
                      ) : null}
                    </Stack>
                  </DetailSectionCard>
                ) : null}
              </>
            }
          >
            <DetailSectionCard
              title="Эмийн мэдээлэл"
              description="Каталогийн үндсэн мэдээлэл болон хэрэглэгчид харагдах товч тайлбар."
              eyebrow="Профайл"
            >
              <DetailFactGrid
                items={[
                  { label: "Эмийн нэр", value: formatNullable(drug.name) },
                  {
                    label: "Ерөнхий нэр",
                    value: formatNullable(drug.genericName),
                  },
                  {
                    label: "Брэнд / үйлдвэрлэгч",
                    value: formatNullable(drug.manufacturer),
                  },
                  { label: "Хэлбэр", value: formatNullable(drug.dosageForm) },
                  { label: "Тун / хүч", value: formatNullable(drug.strength) },
                  {
                    label: "Доод үнэ",
                    value:
                      drug.startingPrice != null
                        ? `${formatPrice(drug.startingPrice)} ₮`
                        : "Бүртгэгдээгүй",
                  },
                  { label: "Нийт нөөц", value: `${drug.totalStock} ширхэг` },
                  {
                    label: "Зарж буй эмийн сан",
                    value: `${drug.availabilityCount}`,
                  },
                ]}
              />
            </DetailSectionCard>

            <DetailSectionCard
              title="Тайлбар"
              description="Системд бүртгэгдсэн эмийн тайлбар болон хэрэглээний ерөнхий мэдээлэл."
              eyebrow="Танилцуулга"
            >
              <Stack spacing={2.5}>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: "0.75rem",
                    bgcolor: "rgba(248,250,252,0.95)",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Дэлгэрэнгүй тайлбар
                  </Typography>
                  <Typography sx={{ lineHeight: 1.8 }}>
                    {formatNullable(drug.description)}
                  </Typography>
                </Box>
                <Alert severity="info" sx={{ borderRadius: "0.75rem" }}>
                  Заалт, анхааруулга, гаж нөлөө зэрэг нарийвчилсан агуулгын
                  тусдаа өгөгдөл танай системд одоогоор хадгалагдаагүй байна.
                  Тиймээс энэ хэсэг нь бодитоор бүртгэгдсэн тайлбарыг л харуулж
                  байна.
                </Alert>
              </Stack>
            </DetailSectionCard>

            <DetailSectionCard
              title="Энэ эмийг зарж байгаа эмийн сангууд"
              description="Энэ эмийг худалдаалж буй эмийн сангуудын хаяг, утас, үнэ болон нөөцийн байдлыг салбар тус бүрээр нь харуулна."
              eyebrow="Худалдаа"
            >
              {drug.availability.length === 0 ? (
                <StateView
                  title="Одоогоор энэ эмийг зарж буй эмийн сан бүртгэгдээгүй байна"
                  description="Эмийн сангууд нөөцийн мэдээллээ шинэчлэх үед энд автоматаар харагдана."
                />
              ) : (
                <Stack spacing={2}>
                  {drug.availability.map((entry) => {
                    const addressText = formatAddress([
                      entry.address?.address1,
                      entry.address?.address2,
                      entry.address?.province,
                    ]);

                    return (
                      <Box
                        key={entry.id}
                        sx={{
                          p: 2.5,
                          borderRadius: "0.75rem",
                          border: "1px solid",
                          borderColor: "divider",
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)",
                        }}
                      >
                        <Stack spacing={2}>
                          <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
                            justifyContent="space-between"
                            alignItems={{ xs: "flex-start", md: "center" }}
                          >
                            <Box>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                                useFlexGap
                                flexWrap="wrap"
                              >
                                <Typography variant="h6" fontWeight={800}>
                                  {entry.pharmacyName}
                                </Typography>
                                {entry.organizationId === organizationId ? (
                                  <Chip
                                    size="small"
                                    label="Манай эмийн сан"
                                    sx={{
                                      bgcolor: "rgba(15,118,110,0.12)",
                                      color: "#0f766e",
                                      fontWeight: 700,
                                    }}
                                  />
                                ) : null}
                              </Stack>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                              >
                                {addressText || "Хаяг бүртгэгдээгүй"}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                              >
                                Утас: {formatNullable(entry.pharmacyPhone)} |
                                И-мэйл: {formatNullable(entry.pharmacyEmail)}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ mt: 0.75, display: "block" }}
                              >
                                Сүүлд шинэчилсэн:{" "}
                                {formatDateTime(entry.updatedAt)}
                              </Typography>
                            </Box>
                            <Button
                              component={Link}
                              href={`/${rolePrefix}/pharmacy/${entry.pharmacyId}`}
                              variant="outlined"
                              startIcon={<LocalPharmacyRoundedIcon />}
                            >
                              Эмийн санг харах
                            </Button>
                          </Stack>

                          <Stack
                            direction="row"
                            spacing={1}
                            useFlexGap
                            flexWrap="wrap"
                          >
                            <Chip
                              icon={<Inventory2RoundedIcon />}
                              label={`${entry.quantity} ширхэг`}
                              sx={{ fontWeight: 700 }}
                            />
                            <Chip
                              icon={<SellRoundedIcon />}
                              label={
                                entry.price != null
                                  ? `${formatPrice(entry.price)} ₮`
                                  : "Үнэ бүртгэгдээгүй"
                              }
                              sx={{ fontWeight: 700 }}
                            />
                            <Chip
                              icon={<MedicationRoundedIcon />}
                              label={
                                statusLabelMap[entry.status ?? ""] ??
                                "Тодорхойгүй"
                              }
                              sx={{
                                fontWeight: 700,
                                bgcolor:
                                  entry.quantity > 0
                                    ? "rgba(34,197,94,0.12)"
                                    : "rgba(249,115,22,0.12)",
                              }}
                            />
                          </Stack>
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </DetailSectionCard>

            <EntityLocationsMap
              title="Энэ эмийг зарж байгаа эмийн сангуудын байршил"
              description="Зарж буй эмийн сангуудын байршлыг нэг газрын зураг дээр харуулна. Хэрэв зөвшөөрвөл таны одоогийн байршлыг хамтад нь үзүүлнэ."
              entityLabel="Эмийн сан"
              items={drug.availability.map((entry) => ({
                id: entry.id,
                name: entry.pharmacyName,
                address:
                  formatAddress([
                    entry.address?.address1,
                    entry.address?.address2,
                    entry.address?.province,
                  ]) || "Хаяг бүртгэгдээгүй",
                latitude: entry.address?.latitude,
                longitude: entry.address?.longitude,
              }))}
            />
          </DetailPageShell>

          {canManageListing && drug.id ? (
            <PharmacyDrugListingModal
              open={listingModalOpen}
              drugId={drug.id}
              initialData={
                currentListing
                  ? {
                      quantity: currentListing.quantity,
                      price: currentListing.price,
                      status: currentListing.status,
                    }
                  : null
              }
              onClose={() => setListingModalOpen(false)}
              onSuccess={async () => {
                setListingModalOpen(false);
                setListingError(null);
                await refetch();
              }}
            />
          ) : null}
        </>
      )}
    </AbilityGuard>
  );
}
