"use client";

import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

type DetailSectionCardProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  eyebrow?: string;
  children: ReactNode;
};

export default function DetailSectionCard({
  title,
  description,
  action,
  eyebrow,
  children,
}: DetailSectionCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "0.75rem",
        border: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)",
        boxShadow: "0 18px 45px rgba(15, 23, 42, 0.06)",
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ mb: 2.5 }}
        >
          <Box>
            {eyebrow ? (
              <Chip
                size="small"
                label={eyebrow}
                sx={{
                  mb: 1,
                  bgcolor: "rgba(14, 116, 144, 0.1)",
                  color: "#0f766e",
                  fontWeight: 700,
                }}
              />
            ) : null}
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
        </Stack>
        {children}
      </CardContent>
    </Card>
  );
}
