"use client";

import { Box, Stack, Typography } from "@mui/material";

type DetailFact = {
  label: string;
  value: string;
};

type DetailFactGridProps = {
  items: DetailFact[];
};

export default function DetailFactGrid({ items }: DetailFactGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
        gap: 2,
      }}
    >
      {items.map((item) => (
        <Stack
          key={item.label}
          spacing={0.75}
          sx={{
            p: 2,
            borderRadius: "0.75rem",
            bgcolor: "rgba(248,250,252,0.95)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {item.label}
          </Typography>
          <Typography variant="body1" fontWeight={700}>
            {item.value}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
}
