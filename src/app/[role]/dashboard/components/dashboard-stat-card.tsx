"use client";

import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

type DashboardStatCardProps = {
  label: string;
  value: number | string;
  helper?: string | null;
  icon?: ReactNode;
  tone?: string | null;
};

const toneMap: Record<string, { accent: string; soft: string }> = {
  teal: { accent: "#0f766e", soft: "rgba(15,118,110,0.10)" },
  blue: { accent: "#0284c7", soft: "rgba(2,132,199,0.10)" },
  violet: { accent: "#7c3aed", soft: "rgba(124,58,237,0.10)" },
  amber: { accent: "#d97706", soft: "rgba(217,119,6,0.10)" },
  rose: { accent: "#e11d48", soft: "rgba(225,29,72,0.10)" },
  slate: { accent: "#334155", soft: "rgba(51,65,85,0.10)" },
  success: { accent: "#15803d", soft: "rgba(21,128,61,0.10)" },
  warning: { accent: "#d97706", soft: "rgba(217,119,6,0.10)" },
  danger: { accent: "#dc2626", soft: "rgba(220,38,38,0.10)" },
  neutral: { accent: "#64748b", soft: "rgba(100,116,139,0.10)" },
};

export default function DashboardStatCard({
  label,
  value,
  helper,
  icon,
  tone = "teal",
}: DashboardStatCardProps) {
  const palette = toneMap[tone ?? "teal"] ?? toneMap.teal;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        height: "100%",
        borderRadius: "0.75rem",
        border: "1px solid",
        borderColor: "divider",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 14px 30px rgba(15,23,42,0.05)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          bgcolor: palette.accent,
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ mt: 1.25, letterSpacing: "-0.03em" }}
          >
            {value}
          </Typography>
          {helper ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1.25 }}
            >
              {helper}
            </Typography>
          ) : null}
        </Box>
        {icon ? (
          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: "0.75rem",
              display: "grid",
              placeItems: "center",
              bgcolor: palette.soft,
              color: palette.accent,
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        ) : null}
      </Box>
    </Paper>
  );
}
