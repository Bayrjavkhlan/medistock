"use client";

import { useQuery } from "@apollo/client/react";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRef } from "react";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import DetailFactGrid from "@/components/detail/DetailFactGrid";
import DetailMetricCard from "@/components/detail/DetailMetricCard";
import DetailPageShell from "@/components/detail/DetailPageShell";
import DetailSectionCard from "@/components/detail/DetailSectionCard";
import EntityLocationMap from "@/components/detail/EntityLocationMap";
import SupplyItemCard from "@/components/features/supply/SupplyItemCard";
import {
  supplierStatusLabelMap,
  supplyCategoryLabelMap,
} from "@/features/supply/constants";
import {
  SupplierDetailDocument,
  type SupplierDetailQuery,
  type SupplierDetailQueryVariables,
  SupplierSupplyItemsDocument,
  type SupplierSupplyItemsQuery,
  type SupplierSupplyItemsQueryVariables,
} from "@/features/supply/graphql/queries.gql";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";
import { getPortalRole, getSupplierDetailSubject } from "@/lib/casl";
import {
  formatAddress,
  formatDateTime,
  formatNullable,
} from "@/utils/detailFormatters";

type SupplierDetailContainerProps = {
  id: string;
};

const resolveRolePrefix = (
  portalRole: string | null,
  isPlatformAdmin?: boolean,
) => {
  if (isPlatformAdmin || portalRole === "ADMIN") return "admin";
  if (portalRole?.startsWith("HOSPITAL_")) return "hospital";
  if (portalRole?.startsWith("PHARMACY_")) return "pharmacy";
  if (portalRole?.startsWith("SUPPLIER_")) return "supplier";
  return "user";
};

export default function SupplierDetailContainer({
  id,
}: SupplierDetailContainerProps) {
  const subject = getSupplierDetailSubject();
  const { data: session } = useSession();
  const { activeOrganization } = useActiveOrganization();
  const portalRole = getPortalRole(
    session?.user ?? null,
    activeOrganization ?? null,
  );
  const rolePrefix = resolveRolePrefix(
    portalRole,
    session?.user?.isPlatformAdmin,
  );
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const detailQuery = useQuery<
    SupplierDetailQuery,
    SupplierDetailQueryVariables
  >(SupplierDetailDocument, {
    variables: { supplierDetailId: id },
    fetchPolicy: "no-cache",
  });

  const supplyItemsQuery = useQuery<
    SupplierSupplyItemsQuery,
    SupplierSupplyItemsQueryVariables
  >(SupplierSupplyItemsDocument, {
    variables: { supplierId: id, take: 24, skip: 0 },
    fetchPolicy: "no-cache",
  });

  const supplier = detailQuery.data?.supplierDetail;
  const supplyItems = supplyItemsQuery.data?.supplierSupplyItems?.data ?? [];
  const address = formatAddress([
    supplier?.address?.address1,
    supplier?.address?.address2,
    supplier?.address?.province,
  ]);

  const scrollCarousel = (direction: "left" | "right") => {
    const node = carouselRef.current;
    if (!node) return;
    node.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <AbilityGuard action="read" subject={subject}>
      {detailQuery.loading || supplyItemsQuery.loading ? (
        <StateView title="Нийлүүлэгчийн дэлгэрэнгүйг ачаалж байна..." loading />
      ) : detailQuery.error || supplyItemsQuery.error ? (
        <StateView
          title="Нийлүүлэгчийн дэлгэрэнгүйг ачаалж чадсангүй"
          description={(detailQuery.error || supplyItemsQuery.error)?.message}
        />
      ) : !supplier ? (
        <StateView
          title="Нийлүүлэгч олдсонгүй"
          description="Хүссэн нийлүүлэгчийн бүртгэл байхгүй эсвэл танд хандах эрх алга."
        />
      ) : (
        <DetailPageShell
          title={supplier.name}
          subtitle={
            supplier.description ||
            "Баталгаажсан нийлүүлэгчийн танилцуулга, холбоо барих мэдээлэл, хамрах хүрээ болон боломжит бараанууд."
          }
          typeLabel="Нийлүүлэгч"
          meta={[
            `Шинэчилсэн: ${formatDateTime(supplier.updatedAt)}`,
            `Үүсгэсэн: ${formatDateTime(supplier.createdAt)}`,
          ]}
          aside={
            <>
              <DetailMetricCard
                label="Төлөв"
                value={
                  supplierStatusLabelMap[
                    supplier.status as keyof typeof supplierStatusLabelMap
                  ] ?? supplier.status
                }
                tone={supplier.status === "ACTIVE" ? "success" : "warning"}
              />
              <DetailMetricCard
                label="Бүртгэл"
                value={`${supplier.supplyItemCount}`}
              />
              <DetailMetricCard
                label="Ангилал"
                value={`${supplier.categoriesSupplied.length}`}
              />
            </>
          }
        >
          <DetailSectionCard
            title="Нийлүүлэгчийн танилцуулга"
            description="Худалдан авалт болон эмнэлгийн үнэлгээнд хэрэгтэй үндсэн танилцуулга."
            eyebrow="Ерөнхий"
          >
            <DetailFactGrid
              items={[
                { label: "Нийлүүлэгчийн нэр", value: supplier.name },
                { label: "Имэйл", value: formatNullable(supplier.email) },
                { label: "Утас", value: formatNullable(supplier.phone) },
                { label: "Вэбсайт", value: formatNullable(supplier.website) },
                { label: "Хаяг", value: address || "Оруулаагүй" },
                {
                  label: "Нийлүүлдэг ангиллууд",
                  value:
                    supplier.categoriesSupplied.length > 0
                      ? supplier.categoriesSupplied
                          .map(
                            (value) =>
                              supplyCategoryLabelMap[
                                value as keyof typeof supplyCategoryLabelMap
                              ] ?? value,
                          )
                          .join(", ")
                      : "Оруулаагүй",
                },
              ]}
            />
          </DetailSectionCard>

          <DetailSectionCard
            title="Холбоо барих ба төлөв"
            description="Зах зээлийн бүртгэлээс шууд харагдах гол нийлүүлэгчийн мэдээлэл."
            eyebrow="Арилжааны"
          >
            <Stack spacing={2}>
              <Typography sx={{ lineHeight: 1.9 }}>
                {supplier.description || "Нийлүүлэгчийн тайлбар алга."}
              </Typography>
              {supplier.website ? (
                <Typography variant="body2" color="text.secondary">
                  Вэбсайт:{" "}
                  <Link
                    href={supplier.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {supplier.website}
                  </Link>
                </Typography>
              ) : null}
            </Stack>
          </DetailSectionCard>

          <EntityLocationMap
            title="Нийлүүлэгчийн байршил"
            entityLabel="Нийлүүлэгч"
            entityName={supplier.name}
            entityAddress={address || "Хаяг оруулаагүй"}
            latitude={supplier.address?.latitude}
            longitude={supplier.address?.longitude}
          />

          <DetailSectionCard
            title="Бүх тоног төхөөрөмж ба хангамж"
            description="Энэ нийлүүлэгчтэй холбоотой бүх идэвхтэй бүртгэл."
            eyebrow="Каталог"
          >
            {supplyItems.length === 0 ? (
              <StateView
                title="Бүртгэл алга"
                description="Энэ нийлүүлэгчийн хангамжийн бүртгэл нэмэгдэхэд энд автоматаар харагдана."
              />
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                  },
                  gap: 3,
                }}
              >
                {supplyItems.map((item) =>
                  item.id ? (
                    <SupplyItemCard
                      key={item.id}
                      item={item}
                      href={`/${rolePrefix}/supply/${item.id}`}
                    />
                  ) : null,
                )}
              </Box>
            )}
          </DetailSectionCard>

          <DetailSectionCard
            title="Энэ нийлүүлэгчийн тоног төхөөрөмжүүд"
            description="Энэ нийлүүлэгчийн борлуулж буй бусад барааг гүйлгэн үзэх хэсэг."
            eyebrow="Судлах"
          >
            {supplyItems.length === 0 ? (
              <StateView
                title="Харуулах карт алга"
                description="Энэ нийлүүлэгч дор хаяж нэг бүртгэлтэй болмогц гүйлгэх жагсаалт автоматаар гарч ирнэ."
              />
            ) : (
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" fontWeight={800}>
                    Нийлүүлэгчийн бараануудыг үзэх
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => scrollCarousel("left")}>
                      <ChevronLeftRoundedIcon />
                    </IconButton>
                    <IconButton onClick={() => scrollCarousel("right")}>
                      <ChevronRightRoundedIcon />
                    </IconButton>
                  </Stack>
                </Stack>
                <Box
                  ref={carouselRef}
                  sx={{
                    display: "flex",
                    gap: 2,
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    pb: 1,
                    "&::-webkit-scrollbar": { height: 8 },
                  }}
                >
                  {supplyItems.map((item) =>
                    item.id ? (
                      <Box
                        key={item.id}
                        sx={{
                          minWidth: { xs: 280, md: 340 },
                          flex: "0 0 auto",
                        }}
                      >
                        <SupplyItemCard
                          item={item}
                          href={`/${rolePrefix}/supply/${item.id}`}
                        />
                      </Box>
                    ) : null,
                  )}
                </Box>
              </Stack>
            )}
          </DetailSectionCard>
        </DetailPageShell>
      )}
    </AbilityGuard>
  );
}
