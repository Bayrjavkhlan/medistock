"use client";

import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Box, Button, Card, Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";

import { supplierStatusLabelMap } from "@/features/supply/constants";
import type { SupplierSummary } from "@/features/supply/graphql/queries.gql";
import { formatAddress, formatNullable } from "@/utils/detailFormatters";

type SupplierCardProps = {
  supplier: SupplierSummary;
  href: string;
};

export default function SupplierCard({ supplier, href }: SupplierCardProps) {
  const address = formatAddress([
    supplier.address?.address1,
    supplier.address?.address2,
    supplier.address?.province,
  ]);

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "0.75rem",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 16px 36px rgba(15, 23, 42, 0.08)",
        p: 2.5,
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: "0.75rem",
              background:
                supplier.logoUrl != null
                  ? `center / cover no-repeat url(${supplier.logoUrl})`
                  : "linear-gradient(135deg, #dbeafe 0%, #dcfce7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {!supplier.logoUrl ? <ApartmentRoundedIcon /> : null}
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={800}>
              {supplier.name}
            </Typography>
            <Chip
              size="small"
              label={
                supplierStatusLabelMap[
                  supplier.status as keyof typeof supplierStatusLabelMap
                ] ?? supplier.status
              }
              sx={{ mt: 0.75, fontWeight: 700 }}
            />
          </Box>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {supplier.description || "Нийлүүлэгчийн тайлбар алга."}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Байршил: {address || "Оруулаагүй"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Холбоо барих: {formatNullable(supplier.phone)} /{" "}
          {formatNullable(supplier.email)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Идэвхтэй бүртгэл: {supplier.supplyItemCount}
        </Typography>
        <Button
          component={Link}
          href={href}
          variant="outlined"
          endIcon={<OpenInNewRoundedIcon />}
          sx={{
            alignSelf: "flex-start",
            borderRadius: 999,
            textTransform: "none",
          }}
        >
          Нийлүүлэгчийг үзэх
        </Button>
      </Stack>
    </Card>
  );
}
