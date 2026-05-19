"use client";

import { Grid, Paper, Typography } from "@mui/material";

type MetricItem = {
  label: string;
  value: number | string;
  helper?: string;
};

type MetricsGridProps = {
  items: MetricItem[];
};

export default function MetricsGrid({ items }: MetricsGridProps) {
  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={item.label}>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "0.75rem",
              p: 2.5,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {item.label}
            </Typography>
            <Typography variant="h4" sx={{ mt: 1 }}>
              {item.value}
            </Typography>
            {item.helper ? (
              <Typography variant="caption" color="text.secondary">
                {item.helper}
              </Typography>
            ) : null}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
