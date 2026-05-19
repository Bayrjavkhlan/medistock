"use client";

import { useQuery } from "@apollo/client/react";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Box,
  Container,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import SupplierCard from "@/components/features/supply/SupplierCard";
import SupplyItemCard from "@/components/features/supply/SupplyItemCard";
import {
  SUPPLY_AVAILABILITY,
  SUPPLY_CATEGORIES,
  supplyAvailabilityLabelMap,
  supplyCategoryLabelMap,
} from "@/features/supply/constants";
import {
  SuppliersDocument,
  type SuppliersQuery,
  type SuppliersQueryVariables,
  SupplyItemsDocument,
  type SupplyItemsQuery,
  type SupplyItemsQueryVariables,
} from "@/features/supply/graphql/queries.gql";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";
import { getPortalRole, getSupplyMarketplaceSubject } from "@/lib/casl";

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

export default function SupplyMarketplaceContainer() {
  const subject = getSupplyMarketplaceSubject();
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

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [availability, setAvailability] = useState("");
  const [sortBy, setSortBy] = useState("UPDATED_AT");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const handler = debounce(() => setDebouncedSearch(search), 350);
    handler();
    return () => handler.cancel();
  }, [search]);

  const suppliersQuery = useQuery<SuppliersQuery, SuppliersQueryVariables>(
    SuppliersDocument,
    {
      variables: { take: 12, skip: 0, where: undefined },
      fetchPolicy: "no-cache",
    },
  );

  const supplyItemsQuery = useQuery<
    SupplyItemsQuery,
    SupplyItemsQueryVariables
  >(SupplyItemsDocument, {
    variables: {
      take: 24,
      skip: 0,
      where: {
        search: debouncedSearch || undefined,
        category: category || undefined,
        supplierId: supplierId || undefined,
        availability: availability || undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sortBy,
        sortOrder: "desc",
      },
    },
    fetchPolicy: "no-cache",
  });

  const loading = suppliersQuery.loading || supplyItemsQuery.loading;
  const error = suppliersQuery.error || supplyItemsQuery.error;

  const suppliers = suppliersQuery.data?.suppliers?.data ?? [];
  const supplyItems = supplyItemsQuery.data?.supplyItems?.data ?? [];

  const featuredSuppliers = useMemo(() => suppliers.slice(0, 6), [suppliers]);

  return (
    <AbilityGuard action="read" subject={subject}>
      {loading ? (
        <StateView title="Хангамжийн хуудсыг ачаалж байна..." loading />
      ) : error ? (
        <StateView
          title="Хангамжийн хуудсыг ачаалж чадсангүй"
          description={error.message}
        />
      ) : (
        <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
          <Stack spacing={4}>
            <Box
              sx={{
                borderRadius: "0.75rem",
                border: "1px solid",
                borderColor: "divider",
                px: { xs: 2.5, md: 4 },
                py: { xs: 3, md: 4 },
                background:
                  "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 45%, #fefce8 100%)",
                boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
              }}
            >
              <Typography variant="overline" sx={{ letterSpacing: "0.18em" }}>
                Эмнэлэг, лабораторийн хангамж
              </Typography>
              <Typography
                variant="h3"
                fontWeight={900}
                sx={{ mt: 1, letterSpacing: "-0.03em" }}
              >
                Баталгаажсан эмнэлэг, лабораторийн хангамжийг нэг дороос
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 1.5, maxWidth: 780, lineHeight: 1.8 }}
              >
                Medistock доторх байгууллагуудад зориулсан эмнэлгийн тоног
                төхөөрөмж, лабораторийн хэрэгсэл, баталгаажсан нийлүүлэгчдийн
                мэдээллийг үзээрэй.
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2.5,
                borderRadius: "0.75rem",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <FilterAltRoundedIcon />
                  <Typography variant="h6" fontWeight={800}>
                    Хайлт ба шүүлт
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(2, minmax(0, 1fr))",
                      xl: "repeat(4, minmax(0, 1fr))",
                    },
                    gap: 2,
                  }}
                >
                  <TextField
                    placeholder="Тоног төхөөрөмж, нийлүүлэгч эсвэл тайлбараар хайх"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    select
                    label="Ангилал"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <MenuItem value="">Бүх ангилал</MenuItem>
                    {SUPPLY_CATEGORIES.map((value) => (
                      <MenuItem key={value} value={value}>
                        {supplyCategoryLabelMap[value]}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Нийлүүлэгч"
                    value={supplierId}
                    onChange={(event) => setSupplierId(event.target.value)}
                  >
                    <MenuItem value="">Бүх нийлүүлэгч</MenuItem>
                    {suppliers.map((supplier) => (
                      <MenuItem key={supplier.id} value={supplier.id ?? ""}>
                        {supplier.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Бэлэн байдал"
                    value={availability}
                    onChange={(event) => setAvailability(event.target.value)}
                  >
                    <MenuItem value="">Бүх төлөв</MenuItem>
                    {SUPPLY_AVAILABILITY.map((value) => (
                      <MenuItem key={value} value={value}>
                        {supplyAvailabilityLabelMap[value]}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    type="number"
                    label="Доод үнэ"
                    value={minPrice}
                    onChange={(event) => setMinPrice(event.target.value)}
                  />
                  <TextField
                    type="number"
                    label="Дээд үнэ"
                    value={maxPrice}
                    onChange={(event) => setMaxPrice(event.target.value)}
                  />
                  <TextField
                    select
                    label="Эрэмбэлэх"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                  >
                    <MenuItem value="UPDATED_AT">Сүүлд шинэчлэгдсэн</MenuItem>
                    <MenuItem value="CREATED_AT">Сүүлд нэмэгдсэн</MenuItem>
                    <MenuItem value="PRICE">Үнэ</MenuItem>
                    <MenuItem value="NAME">Нэр</MenuItem>
                  </TextField>
                </Box>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h4" fontWeight={900} sx={{ mb: 2 }}>
                Хангамжийн каталог
              </Typography>
              {supplyItems.length === 0 ? (
                <StateView
                  title="Хангамжийн бүртгэл олдсонгүй"
                  description="Хайлтын үгээ өөрчлөх эсвэл идэвхтэй шүүлтүүрүүдээ цэвэрлээд дахин оролдоно уу."
                />
              ) : (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(2, minmax(0, 1fr))",
                      xl: "repeat(3, minmax(0, 1fr))",
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
            </Box>

            <Box>
              <Typography variant="h4" fontWeight={900} sx={{ mb: 2 }}>
                Онцлох нийлүүлэгчид
              </Typography>
              {featuredSuppliers.length === 0 ? (
                <StateView
                  title="Нийлүүлэгч алга"
                  description="Нийлүүлэгчийн бүртгэл нэмэгдэхэд энд автоматаар харагдана."
                />
              ) : (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      md: "repeat(2, minmax(0, 1fr))",
                      xl: "repeat(3, minmax(0, 1fr))",
                    },
                    gap: 3,
                  }}
                >
                  {featuredSuppliers.map((supplier) =>
                    supplier.id ? (
                      <SupplierCard
                        key={supplier.id}
                        supplier={supplier}
                        href={`/${rolePrefix}/suppliers/${supplier.id}`}
                      />
                    ) : null,
                  )}
                </Box>
              )}
            </Box>
          </Stack>
        </Container>
      )}
    </AbilityGuard>
  );
}
