"use client";

import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import { Alert, Grid, Stack } from "@mui/material";

import EntityLocationMap from "@/components/detail/EntityLocationMap";
import type { DashboardOverviewQuery } from "@/features/dashboard/graphql/queries.gql";

import DashboardActivityList from "./dashboard-activity-list";
import DashboardDonutChart from "./dashboard-donut-chart";
import DashboardHero from "./dashboard-hero";
import DashboardPanel from "./dashboard-panel";
import DashboardQuickActions from "./dashboard-quick-actions";
import DashboardSeriesChart from "./dashboard-series-chart";
import DashboardStatCard from "./dashboard-stat-card";

type PharmacyDashboardProps = {
  data: NonNullable<
    NonNullable<DashboardOverviewQuery["dashboardOverview"]>["pharmacy"]
  >;
};

const icons = [
  <MedicationRoundedIcon key="drugs" />,
  <Inventory2RoundedIcon key="in-stock" />,
  <ReportProblemRoundedIcon key="low" />,
  <SellRoundedIcon key="out" />,
  <GroupsRoundedIcon key="staff" />,
  <LocalPharmacyRoundedIcon key="updates" />,
];

export default function PharmacyDashboard({ data }: PharmacyDashboardProps) {
  return (
    <Stack spacing={3}>
      <DashboardHero
        eyebrow="Эмийн сангийн хяналтын самбар"
        title={`${data.profile.name} салбарын хяналтын самбар`}
        description="Эмийн бүртгэлүүдийн нөөцийн төлөв, эрсдэлтэй бараа, хамгийн их нөөцтэй эм, сүүлийн шинэчлэлт болон салбарын байршлыг нэгтгэнэ."
        chips={[
          data.profile.address,
          data.profile.phone ?? "Утас бүртгэгдээгүй",
          data.profile.email ?? "И-мэйл бүртгэгдээгүй",
        ]}
      />

      <Grid container spacing={2}>
        {data.stats.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, xl: 4 }} key={item.label}>
            <DashboardStatCard
              label={item.label}
              value={item.value}
              helper={item.helper}
              tone={item.tone}
              icon={icons[index]}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <DashboardPanel
            title="Нөөцийн хөдөлгөөний чиг хандлага"
            description="Сүүлийн 6 сарын бүртгэлийн шинэчлэлт болон эрсдэлтэй нөөцийн өөрчлөлтийн хандлага."
            action={
              <DashboardQuickActions
                items={[
                  { label: "Эм удирдах", href: "/pharmacy/medicine" },
                  { label: "Ажилтнууд", href: "/pharmacy/staff" },
                  {
                    label: "Салбарын мэдээлэл",
                    href: `/pharmacy/pharmacy/${data.profile.id}`,
                  },
                ]}
              />
            }
          >
            <DashboardSeriesChart series={data.activitySeries} />
          </DashboardPanel>
        </Grid>
        <Grid size={{ xs: 12, xl: 4 }}>
          <DashboardPanel
            title="Нөөцийн төлөвийн бүтэц"
            description="Эмийн бүртгэлүүдийг төлөвөөр ангилсан ерөнхий тархалт."
          >
            <DashboardDonutChart items={data.inventoryStatus} />
          </DashboardPanel>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <DashboardPanel
            title="Хамгийн их нөөцтэй эмүүд"
            description="Одоогоор хамгийн их үлдэгдэлтэй байгаа эмүүдийн жагсаалт."
          >
            <DashboardActivityList
              items={data.topDrugs}
              emptyTitle="Эмийн жагсаалт алга"
              emptyDescription="Нөөцийн мэдээлэл бүртгэгдэж эхэлмэгц энд харуулна."
            />
          </DashboardPanel>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <DashboardPanel
            title="Нөөц багатай эмүүд"
            description="Анхаарал шаардсан бүртгэлүүдийг хамгийн түрүүнд харуулна."
          >
            <DashboardActivityList
              items={data.lowStockItems}
              emptyTitle="Эрсдэлтэй нөөц алга"
              emptyDescription="Одоогоор нөөц багатай эсвэл дууссан эм алга байна."
            />
          </DashboardPanel>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <EntityLocationMap
            title="Эмийн сангийн байршил"
            entityLabel="Эмийн сан"
            entityName={data.profile.name}
            entityAddress={data.profile.address}
            latitude={data.profile.latitude}
            longitude={data.profile.longitude}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <DashboardPanel
            title="Сүүлийн шинэчлэлтүүд"
            description="Нөөц, үнэ, төлөв дээр хамгийн сүүлд орсон өөрчлөлтүүд."
          >
            <DashboardActivityList
              items={data.recentUpdates}
              emptyTitle="Шинэчлэлт алга"
              emptyDescription="Бүртгэл шинэчлэгдэж эхэлмэгц энд автоматаар харагдана."
            />
          </DashboardPanel>
        </Grid>
      </Grid>

      <DashboardPanel
        title="Анхаарах зүйлс"
        description="Эмийн сангийн өдөр тутмын ажиллагаанд шууд нөлөөлөх дохио, мэдээллүүд."
      >
        <Stack spacing={1.5}>
          {data.alerts.map((item) => (
            <Alert
              key={item.id}
              severity={
                item.severity === "success"
                  ? "success"
                  : item.severity === "warning"
                    ? "warning"
                    : "info"
              }
              sx={{ borderRadius: 3 }}
            >
              <strong>{item.title}</strong>
              <br />
              {item.description}
            </Alert>
          ))}
        </Stack>
      </DashboardPanel>
    </Stack>
  );
}
