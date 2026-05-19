"use client";

import { Box, Chip, Stack, Typography } from "@mui/material";

type DashboardHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  chips?: string[];
};

export default function DashboardHero({
  eyebrow,
  title,
  description,
  chips = [],
}: DashboardHeroProps) {
  return (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: "0.75rem",
        color: "#e2e8f0",
        background:
          "linear-gradient(135deg, #0f172a 0%, #164e63 45%, #0f766e 100%)",
        boxShadow: "0 24px 48px rgba(15,23,42,0.24)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: "auto -80px -80px auto",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          filter: "blur(4px)",
        }}
      />
      <Stack spacing={2} sx={{ position: "relative" }}>
        <Chip
          label={eyebrow}
          sx={{
            alignSelf: "flex-start",
            bgcolor: "rgba(255,255,255,0.12)",
            color: "#f8fafc",
            fontWeight: 700,
          }}
        />
        <Box>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ letterSpacing: "-0.03em" }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              mt: 1.25,
              maxWidth: 860,
              color: "rgba(226,232,240,0.88)",
              lineHeight: 1.75,
            }}
          >
            {description}
          </Typography>
        </Box>
        {chips.length > 0 ? (
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {chips.map((chip) => (
              <Chip
                key={chip}
                label={chip}
                sx={{
                  bgcolor: "rgba(255,255,255,0.14)",
                  color: "#f8fafc",
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </Box>
  );
}
