"use client";

import { Card, CardContent, Typography } from "@mui/material";

type DetailMetricCardProps = {
  label: string;
  value: string;
  tone?: "default" | "success" | "warning";
};

const toneMap = {
  default: {
    background:
      "linear-gradient(135deg, rgba(239,246,255,0.92) 0%, rgba(248,250,252,0.95) 100%)",
    color: "#0f172a",
  },
  success: {
    background:
      "linear-gradient(135deg, rgba(236,253,245,0.95) 0%, rgba(240,253,250,0.98) 100%)",
    color: "#065f46",
  },
  warning: {
    background:
      "linear-gradient(135deg, rgba(255,251,235,0.98) 0%, rgba(255,247,237,0.98) 100%)",
    color: "#9a3412",
  },
} as const;

export default function DetailMetricCard({
  label,
  value,
  tone = "default",
}: DetailMetricCardProps) {
  const colors = toneMap[tone];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "0.75rem",
        border: "1px solid",
        borderColor: "divider",
        background: colors.background,
      }}
    >
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {label}
        </Typography>
        <Typography variant="h5" fontWeight={900} sx={{ color: colors.color }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
