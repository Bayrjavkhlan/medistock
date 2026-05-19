"use client";

import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Box, Button, Card, Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";

import {
  supplyAvailabilityLabelMap,
  supplyCategoryLabelMap,
} from "@/features/supply/constants";
import type { SupplyItemSummary } from "@/features/supply/graphql/queries.gql";
import { formatPrice } from "@/utils/detailFormatters";

type SupplyItemCardProps = {
  item: SupplyItemSummary;
  href: string;
};

export default function SupplyItemCard({ item, href }: SupplyItemCardProps) {
  const imageUrl = item.imageUrls[0] ?? null;

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "0.75rem",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: 220,
          background:
            imageUrl != null
              ? `center / cover no-repeat url(${imageUrl})`
              : "linear-gradient(135deg, #e0f2fe 0%, #ecfccb 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!imageUrl ? (
          <ImageOutlinedIcon sx={{ fontSize: 52, opacity: 0.65 }} />
        ) : null}
      </Box>
      <Stack spacing={1.5} sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip
            size="small"
            label={
              supplyCategoryLabelMap[
                item.category as keyof typeof supplyCategoryLabelMap
              ] ?? item.category
            }
            sx={{ fontWeight: 700 }}
          />
          <Chip
            size="small"
            label={
              supplyAvailabilityLabelMap[
                item.availability as keyof typeof supplyAvailabilityLabelMap
              ] ?? item.availability
            }
            sx={{
              fontWeight: 700,
              bgcolor:
                item.availability === "AVAILABLE"
                  ? "rgba(34,197,94,0.12)"
                  : item.availability === "LIMITED"
                    ? "rgba(249,115,22,0.12)"
                    : "rgba(148,163,184,0.14)",
            }}
          />
        </Stack>
        <Box>
          <Typography variant="h6" fontWeight={800}>
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
            {item.shortDescription || item.description || "Тайлбар алга."}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Нийлүүлэгч: {item.supplier.name}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="h6" fontWeight={900}>
            {item.price != null
              ? `${formatPrice(item.price)} ${item.currency ?? ""}`.trim()
              : "Үнийг лавлана уу"}
          </Typography>
          {item.id ? (
            <Button
              component={Link}
              href={href}
              variant="contained"
              endIcon={<OpenInNewRoundedIcon />}
              sx={{ borderRadius: 999, textTransform: "none" }}
            >
              Дэлгэрэнгүй
            </Button>
          ) : null}
        </Stack>
      </Stack>
    </Card>
  );
}
