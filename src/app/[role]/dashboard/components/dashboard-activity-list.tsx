"use client";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

import type { DashboardActivityItem } from "@/features/dashboard/graphql/queries.gql";

type DashboardActivityListProps = {
  items: DashboardActivityItem[];
  emptyTitle: string;
  emptyDescription: string;
};

const formatDate = (value?: string | null) => {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("mn-MN", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export default function DashboardActivityList({
  items,
  emptyTitle,
  emptyDescription,
}: DashboardActivityListProps) {
  if (items.length === 0) {
    return (
      <Box
        sx={{
          borderRadius: "0.75rem",
          border: "1px dashed",
          borderColor: "divider",
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography fontWeight={700}>{emptyTitle}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {emptyDescription}
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={1.5}>
      {items.map((item) => {
        const createdAt = formatDate(item.createdAt);

        return (
          <Box
            key={item.id}
            sx={{
              p: 2,
              borderRadius: "0.75rem",
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "rgba(248,250,252,0.7)",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              justifyContent="space-between"
            >
              <Box>
                <Typography fontWeight={700}>{item.title}</Typography>
                {item.subtitle ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {item.subtitle}
                  </Typography>
                ) : null}
                {item.meta ? (
                  <Typography variant="body2" sx={{ mt: 0.75 }}>
                    {item.meta}
                  </Typography>
                ) : null}
              </Box>
              <Stack
                alignItems={{ xs: "flex-start", md: "flex-end" }}
                spacing={1}
              >
                {createdAt ? (
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <AccessTimeRoundedIcon
                      sx={{ fontSize: 16, color: "text.secondary" }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {createdAt}
                    </Typography>
                  </Stack>
                ) : null}
                {item.href ? (
                  <Button
                    component={Link}
                    href={item.href}
                    size="small"
                    endIcon={<OpenInNewRoundedIcon />}
                  >
                    Харах
                  </Button>
                ) : null}
              </Stack>
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
}
