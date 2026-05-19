"use client";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type DetailPageShellProps = {
  title: string;
  subtitle: string;
  typeLabel: string;
  meta?: string[];
  aside: ReactNode;
  children: ReactNode;
};

export default function DetailPageShell({
  title,
  subtitle,
  typeLabel,
  meta = [],
  aside,
  children,
}: DetailPageShellProps) {
  const router = useRouter();

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack spacing={3}>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "0.75rem",
            border: "1px solid",
            borderColor: "divider",
            background:
              "linear-gradient(135deg, #f8fafc 0%, #eff6ff 45%, #ecfeff 100%)",
            boxShadow: "0 24px 60px rgba(15, 23, 42, 0.08)",
            px: { xs: 2.5, md: 4 },
            py: { xs: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: "auto -8% -40% auto",
              width: 260,
              height: 260,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(14,165,233,0) 72%)",
            }}
          />
          <Stack spacing={2.5}>
            <Button
              onClick={() => router.back()}
              startIcon={<ArrowBackRoundedIcon />}
              sx={{
                alignSelf: "flex-start",
                borderRadius: 999,
                px: 2,
                textTransform: "none",
                bgcolor: "rgba(255,255,255,0.72)",
              }}
            >
              Буцах
            </Button>
            <Stack spacing={2}>
              <Chip
                label={typeLabel}
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: "rgba(14, 116, 144, 0.1)",
                  color: "#0f766e",
                  fontWeight: 700,
                }}
              />
              <Box>
                <Typography
                  variant="h3"
                  fontWeight={900}
                  sx={{ letterSpacing: "-0.03em" }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 1.25, maxWidth: 760, lineHeight: 1.75 }}
                >
                  {subtitle}
                </Typography>
              </Box>
              {meta.length > 0 ? (
                <>
                  <Divider
                    flexItem
                    sx={{ borderColor: "rgba(15, 23, 42, 0.08)" }}
                  />
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {meta.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        variant="outlined"
                        sx={{ bgcolor: "rgba(255,255,255,0.55)" }}
                      />
                    ))}
                  </Stack>
                </>
              ) : null}
            </Stack>
          </Stack>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "minmax(0, 1.6fr) minmax(320px, 0.9fr)",
            },
            gap: 3,
            alignItems: "start",
          }}
        >
          <Stack spacing={3}>{children}</Stack>
          <Stack spacing={3}>{aside}</Stack>
        </Box>
      </Stack>
    </Container>
  );
}
