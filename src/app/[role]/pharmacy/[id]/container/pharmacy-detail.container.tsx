"use client";

import { useQuery } from "@apollo/client/react";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { Alert, Box, Button, Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import DetailFactGrid from "@/components/detail/DetailFactGrid";
import DetailMetricCard from "@/components/detail/DetailMetricCard";
import DetailPageShell from "@/components/detail/DetailPageShell";
import DetailSectionCard from "@/components/detail/DetailSectionCard";
import EntityLocationMap from "@/components/detail/EntityLocationMap";
import {
  PharmacyDetailDocument,
  type PharmacyDetailQuery,
  type PharmacyDetailQueryVariables,
} from "@/features/pharmacy/graphql/queries.gql";
import { getPharmacySubjectForRole, getPortalRole } from "@/lib/casl";
import {
  formatAddress,
  formatDateTime,
  formatNullable,
  formatPrice,
} from "@/utils/detailFormatters";

type PharmacyDetailContainerProps = {
  id: string;
};

const statusLabelMap: Record<string, string> = {
  AVAILABLE: "Боломжтой",
  LOW: "Нөөц багатай",
  OUT_OF_STOCK: "Дууссан",
  UNKNOWN: "Тодорхойгүй",
};

export default function PharmacyDetailContainer({
  id,
}: PharmacyDetailContainerProps) {
  const { data: session } = useSession();
  const portalRole = getPortalRole(session?.user ?? null, null);
  const subject = getPharmacySubjectForRole(portalRole);

  const { data, loading, error } = useQuery<
    PharmacyDetailQuery,
    PharmacyDetailQueryVariables
  >(PharmacyDetailDocument, {
    variables: { pharmacyDetailId: id },
    fetchPolicy: "no-cache",
  });

  const pharmacy = data?.pharmacyDetail;
  const addressText = formatAddress([
    pharmacy?.address?.address1,
    pharmacy?.address?.address2,
    pharmacy?.address?.province,
  ]);

  const rolePrefix =
    portalRole === "ADMIN"
      ? "admin"
      : portalRole === "USER"
        ? "user"
        : "pharmacy";

  return (
    <AbilityGuard action="read" subject={subject}>
      {loading ? (
        <StateView title="Эмийн сангийн мэдээллийг уншиж байна..." loading />
      ) : error ? (
        <StateView
          title="Эмийн сангийн мэдээлэл ачаалахад алдаа гарлаа"
          description={error.message}
        />
      ) : !pharmacy ? (
        <StateView
          title="Эмийн сангийн мэдээлэл олдсонгүй"
          description="Хүссэн эмийн сангийн бүртгэл байхгүй эсвэл харах эрх хүрэлцэхгүй байна."
        />
      ) : (
        <DetailPageShell
          title={pharmacy.name ?? "Эмийн сангийн дэлгэрэнгүй"}
          subtitle="Хаяг, холбоо барих суваг, байршил болон энэ эмийн санд байгаа эмүүдийн мэдээллийг нэг дор харуулна."
          typeLabel="Эмийн сан"
          meta={[
            `Шинэчлэгдсэн: ${formatDateTime(pharmacy.updatedAt)}`,
            `Бүртгэсэн: ${formatDateTime(pharmacy.createdAt)}`,
          ]}
          aside={
            <>
              <DetailMetricCard
                label="Бүртгэлийн төлөв"
                value="Идэвхтэй"
                tone="success"
              />
              <DetailMetricCard
                label="Байршлын мэдээлэл"
                value={
                  pharmacy.address?.latitude != null &&
                  pharmacy.address?.longitude != null
                    ? "Бэлэн"
                    : "Дутуу"
                }
                tone={
                  pharmacy.address?.latitude != null &&
                  pharmacy.address?.longitude != null
                    ? "success"
                    : "warning"
                }
              />
              <DetailMetricCard
                label="Бүртгэлтэй эм"
                value={`${pharmacy.inventoryCount}`}
                tone={pharmacy.inventoryCount > 0 ? "success" : "warning"}
              />
              <DetailSectionCard
                title="Хурдан мэдээлэл"
                description="Хэрэглэгчдэд хэрэгтэй товч мэдээлэл."
                eyebrow="Тойм"
              >
                <Stack spacing={1.5}>
                  <Chip
                    icon={<PhoneRoundedIcon />}
                    label={`Утас: ${formatNullable(pharmacy.phone)}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<MailRoundedIcon />}
                    label={`И-мэйл: ${formatNullable(pharmacy.email)}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<LocalPharmacyRoundedIcon />}
                    label={`Хаяг: ${addressText || "Бүртгэгдээгүй"}`}
                    variant="outlined"
                  />
                </Stack>
              </DetailSectionCard>
            </>
          }
        >
          <DetailSectionCard
            title="Үндсэн мэдээлэл"
            description="Эмийн сангийн холбоо барих болон байршлын үндсэн мэдээлэл."
            eyebrow="Мэдээлэл"
          >
            <DetailFactGrid
              items={[
                {
                  label: "Эмийн сангийн нэр",
                  value: formatNullable(pharmacy.name),
                },
                { label: "И-мэйл", value: formatNullable(pharmacy.email) },
                { label: "Утас", value: formatNullable(pharmacy.phone) },
                { label: "Хаяг", value: addressText || "Бүртгэгдээгүй" },
                { label: "Ажиллах цаг", value: "Системд бүртгэгдээгүй" },
                { label: "Тайлбар", value: "Системд бүртгэгдээгүй" },
              ]}
            />
          </DetailSectionCard>

          <EntityLocationMap
            title="Эмийн сангийн байршил"
            entityLabel="Эмийн сан"
            entityName={pharmacy.name ?? "Эмийн сан"}
            entityAddress={addressText || "Хаяг бүртгэгдээгүй"}
            latitude={pharmacy.address?.latitude}
            longitude={pharmacy.address?.longitude}
          />

          <DetailSectionCard
            title="Энэ эмийн санд байгаа эмүүд"
            description="Бүртгэлтэй эмүүдийн нөөц, үнэ болон төлөвийн мэдээллийг харуулна."
            eyebrow="Нөөц"
          >
            {pharmacy.inventory.length === 0 ? (
              <StateView
                title="Одоогоор эмийн нөөц бүртгэгдээгүй байна"
                description="Эмийн сан нөөцийн мэдээллээ шинэчлэх үед энэ хэсэг автоматаар дүүрнэ."
              />
            ) : (
              <Stack spacing={2}>
                {pharmacy.inventory.map((entry) => (
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
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={2}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", md: "center" }}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight={800}>
                          {entry.drug.name ?? "Нэргүй эм"}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          Ерөнхий нэр: {formatNullable(entry.drug.genericName)}{" "}
                          | Хэлбэр: {formatNullable(entry.drug.dosageForm)} |
                          Тун: {formatNullable(entry.drug.strength)}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mt: 0.75, display: "block" }}
                        >
                          Сүүлд шинэчилсэн: {formatDateTime(entry.updatedAt)}
                        </Typography>
                      </Box>
                      <Stack
                        spacing={1.25}
                        alignItems={{ xs: "stretch", md: "flex-end" }}
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          useFlexGap
                          flexWrap="wrap"
                        >
                          <Chip
                            icon={<MedicationRoundedIcon />}
                            label={
                              statusLabelMap[entry.status ?? ""] ??
                              "Тодорхойгүй"
                            }
                            sx={{ fontWeight: 700 }}
                          />
                          <Chip
                            label={`${entry.quantity ?? 0} ширхэг`}
                            sx={{ fontWeight: 700 }}
                          />
                          <Chip
                            label={
                              entry.price != null
                                ? `${formatPrice(entry.price)} ₮`
                                : "Үнэ бүртгэгдээгүй"
                            }
                            sx={{ fontWeight: 700 }}
                          />
                        </Stack>
                        {entry.drug.id ? (
                          <Button
                            component={Link}
                            href={`/${rolePrefix}/medicine/${entry.drug.id}`}
                            variant="outlined"
                          >
                            Эмийн дэлгэрэнгүй харах
                          </Button>
                        ) : null}
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </DetailSectionCard>

          <DetailSectionCard
            title="Анхаарах зүйлс"
            description="Мэдээлэл дутуу байлаа ч хэрэглэгчийн туршлагыг тогтвортой байлгана."
            eyebrow="Тайлбар"
          >
            <Alert severity="info" sx={{ borderRadius: "0.75rem" }}>
              Ажиллах цаг, тайлбар зэрэг нэмэлт талбарууд одоогоор өгөгдлийн
              санд тусдаа хадгалагдаагүй тул энэ хуудсанд бодитоор байгаа
              мэдээллийг л найдвартай харуулж байна.
            </Alert>
          </DetailSectionCard>
        </DetailPageShell>
      )}
    </AbilityGuard>
  );
}
