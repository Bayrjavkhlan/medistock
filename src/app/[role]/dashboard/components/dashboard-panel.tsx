"use client";

import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

type DashboardPanelProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

export default function DashboardPanel({
  title,
  description,
  action,
  children,
}: DashboardPanelProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: "0.75rem",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        boxShadow: "0 14px 34px rgba(15,23,42,0.06)",
      }}
    >
      <Box
        sx={{
          mb: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          gap: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={800}>
            {title}
          </Typography>
          {description ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.75 }}
            >
              {description}
            </Typography>
          ) : null}
        </Box>
        {action}
      </Box>
      {children}
    </Paper>
  );
}
