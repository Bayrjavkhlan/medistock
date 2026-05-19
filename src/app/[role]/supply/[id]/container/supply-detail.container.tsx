"use client";

import { useQuery } from "@apollo/client/react";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import DetailFactGrid from "@/components/detail/DetailFactGrid";
import DetailMetricCard from "@/components/detail/DetailMetricCard";
import DetailPageShell from "@/components/detail/DetailPageShell";
import DetailSectionCard from "@/components/detail/DetailSectionCard";
import SupplierCard from "@/components/features/supply/SupplierCard";
import SupplyItemCard from "@/components/features/supply/SupplyItemCard";
import {
  supplyAvailabilityLabelMap,
  supplyCategoryLabelMap,
} from "@/features/supply/constants";
import {
  SupplierSupplyItemsDocument,
  type SupplierSupplyItemsQuery,
  type SupplierSupplyItemsQueryVariables,
  SupplyItemDetailDocument,
  type SupplyItemDetailQuery,
  type SupplyItemDetailQueryVariables,
} from "@/features/supply/graphql/queries.gql";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";
import { getPortalRole, getSupplyDetailSubject } from "@/lib/casl";
import {
  formatDateTime,
  formatNullable,
  formatPrice,
} from "@/utils/detailFormatters";

type SupplyDetailContainerProps = {
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

export default function SupplyDetailContainer({
  id,
}: SupplyDetailContainerProps) {
  const subject = getSupplyDetailSubject();
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

  const detailQuery = useQuery<
    SupplyItemDetailQuery,
    SupplyItemDetailQueryVariables
  >(SupplyItemDetailDocument, {
    variables: { supplyItemDetailId: id },
    fetchPolicy: "no-cache",
  });

  const supplierId = detailQuery.data?.supplyItemDetail?.supplier.id ?? "";
  const supplierItemsQuery = useQuery<
    SupplierSupplyItemsQuery,
    SupplierSupplyItemsQueryVariables
  >(SupplierSupplyItemsDocument, {
    variables: { supplierId, take: 10, skip: 0 },
    fetchPolicy: "no-cache",
    skip: !supplierId,
  });

  const item = detailQuery.data?.supplyItemDetail;
  const relatedItems =
    supplierItemsQuery.data?.supplierSupplyItems?.data?.filter(
      (entry) => entry.id && entry.id !== item?.id,
    ) ?? [];

  return (
    <AbilityGuard action="read" subject={subject}>
      {detailQuery.loading ? (
        <StateView title="Хангамжийн дэлгэрэнгүйг ачаалж байна..." loading />
      ) : detailQuery.error ? (
        <StateView
          title="Хангамжийн дэлгэрэнгүйг ачаалж чадсангүй"
          description={detailQuery.error.message}
        />
      ) : !item ? (
        <StateView
          title="Хангамжийн бүртгэл олдсонгүй"
          description="Хүссэн бүртгэл байхгүй эсвэл танд хандах эрх алга."
        />
      ) : (
        <DetailPageShell
          title={item.name}
          subtitle={
            item.shortDescription ||
            item.description ||
            "Энэ бүртгэлийн нийлүүлэгч, үнэ, баримт бичиг болон техникийн мэдээллийг үзнэ үү."
          }
          typeLabel="Хангамж"
          meta={[
            `Шинэчилсэн: ${formatDateTime(item.updatedAt)}`,
            `Үүсгэсэн: ${formatDateTime(item.createdAt)}`,
          ]}
          aside={
            <>
              <DetailMetricCard
                label="Бэлэн байдал"
                value={
                  supplyAvailabilityLabelMap[
                    item.availability as keyof typeof supplyAvailabilityLabelMap
                  ] ?? item.availability
                }
                tone={item.availability === "AVAILABLE" ? "success" : "warning"}
              />
              <DetailMetricCard
                label="Үнэ"
                value={
                  item.price != null
                    ? `${formatPrice(item.price)} ${item.currency ?? ""}`.trim()
                    : "Үнийг лавлана уу"
                }
              />
              <DetailMetricCard label="Нийлүүлэгч" value={item.supplier.name} />
              <SupplierCard
                supplier={item.supplier}
                href={`/${rolePrefix}/suppliers/${item.supplier.id}`}
              />
            </>
          }
        >
          <DetailSectionCard
            title="Ерөнхий мэдээлэл"
            description="Эмнэлэг, лабораториуд үнэлгээ хийхдээ ашиглах үндсэн каталогийн мэдээлэл."
            eyebrow="Товч"
          >
            <DetailFactGrid
              items={[
                { label: "Нэр", value: item.name },
                {
                  label: "Ангилал",
                  value:
                    supplyCategoryLabelMap[
                      item.category as keyof typeof supplyCategoryLabelMap
                    ] ?? item.category,
                },
                { label: "Нийлүүлэгч", value: item.supplier.name },
                { label: "Загвар", value: formatNullable(item.model) },
                { label: "Брэнд", value: formatNullable(item.brand) },
                {
                  label: "Үйлдвэрлэгч",
                  value: formatNullable(item.manufacturer),
                },
                {
                  label: "Баталгаа",
                  value: formatNullable(item.warranty),
                },
                {
                  label: "Холбоо барих мэдээлэл",
                  value: formatNullable(item.contactInfo),
                },
              ]}
            />
          </DetailSectionCard>

          <DetailSectionCard
            title="Тайлбар"
            description="Хангамжийн арилжааны болон техникийн ерөнхий тайлбар."
            eyebrow="Бүртгэл"
          >
            <Typography sx={{ lineHeight: 1.9 }}>
              {item.description ||
                item.shortDescription ||
                "Дэлгэрэнгүй тайлбар алга."}
            </Typography>
          </DetailSectionCard>

          <DetailSectionCard
            title="Үзүүлэлтүүд"
            description="Хангамжийн бүртгэлд хадгалсан бүтцэт техникийн өгөгдөл."
            eyebrow="Техник"
          >
            {item.specifications ? (
              <Box
                component="pre"
                sx={{
                  m: 0,
                  p: 2.5,
                  borderRadius: "0.75rem",
                  bgcolor: "rgba(248,250,252,0.95)",
                  overflow: "auto",
                  fontFamily: "monospace",
                  fontSize: 13,
                }}
              >
                {JSON.stringify(item.specifications, null, 2)}
              </Box>
            ) : (
              <StateView
                title="Бүтцэт үзүүлэлт алга"
                description="Энэ бүртгэлд одоогоор бүтцэт үзүүлэлт оруулаагүй байна."
              />
            )}
          </DetailSectionCard>

          <DetailSectionCard
            title="Зураг ба баримт"
            description="Нийлүүлэгчээс оруулсан зураг болон хавсаргасан баримтын холбоосууд."
            eyebrow="Файлууд"
          >
            <Stack spacing={2.5}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                  },
                  gap: 2,
                }}
              >
                {item.imageUrls.length > 0 ? (
                  item.imageUrls.map((imageUrl) => (
                    <Box
                      key={imageUrl}
                      sx={{
                        minHeight: 220,
                        borderRadius: "0.75rem",
                        border: "1px solid",
                        borderColor: "divider",
                        background: `center / cover no-repeat url(${imageUrl})`,
                      }}
                    />
                  ))
                ) : (
                  <StateView
                    title="Зураг алга"
                    description="Энэ бүртгэлд одоогоор зураг хавсаргаагүй байна."
                  />
                )}
              </Box>
              <Stack spacing={1}>
                {item.documentUrls.length > 0 ? (
                  item.documentUrls.map((documentUrl) => (
                    <Button
                      key={documentUrl}
                      component={Link}
                      href={documentUrl}
                      target="_blank"
                      rel="noreferrer"
                      variant="outlined"
                      startIcon={<DescriptionRoundedIcon />}
                      sx={{ alignSelf: "flex-start", textTransform: "none" }}
                    >
                      Баримт нээх
                    </Button>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Хавсаргасан баримт байхгүй.
                  </Typography>
                )}
              </Stack>
            </Stack>
          </DetailSectionCard>

          <DetailSectionCard
            title="Холбоотой тоног төхөөрөмж"
            description="Энэ нийлүүлэгчийн бусад тоног төхөөрөмж, хангамж."
            eyebrow="Судлах"
          >
            {relatedItems.length === 0 ? (
              <StateView
                title="Холбоотой бүртгэл алга"
                description="Энэ нийлүүлэгчийн өөр хангамж нэмэгдэхэд энд автоматаар харагдана."
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
                {relatedItems.map((related) =>
                  related.id ? (
                    <SupplyItemCard
                      key={related.id}
                      item={related}
                      href={`/${rolePrefix}/supply/${related.id}`}
                    />
                  ) : null,
                )}
              </Box>
            )}
          </DetailSectionCard>
        </DetailPageShell>
      )}
    </AbilityGuard>
  );
}
