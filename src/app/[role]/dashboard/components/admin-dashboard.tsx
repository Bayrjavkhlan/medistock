"use client";

import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import { Alert, Box, Grid, Stack } from "@mui/material";
import dynamic from "next/dynamic";

import type { DashboardOverviewQuery } from "@/features/dashboard/graphql/queries.gql";

import DashboardActivityList from "./dashboard-activity-list";
import DashboardDonutChart from "./dashboard-donut-chart";
import DashboardHero from "./dashboard-hero";
import DashboardPanel from "./dashboard-panel";
import DashboardQuickActions from "./dashboard-quick-actions";
import DashboardSeriesChart from "./dashboard-series-chart";
import DashboardStatCard from "./dashboard-stat-card";

const AdminLocationMap = dynamic(() => import("./admin-location-map"), {
  ssr: false,
});

type AdminDashboardProps = {
  data: NonNullable<
    NonNullable<DashboardOverviewQuery["dashboardOverview"]>["admin"]
  >;
};

const adminIcons = [
  <LocalHospitalRoundedIcon key="hospital" />,
  <LocalPharmacyRoundedIcon key="pharmacy" />,
  <BiotechRoundedIcon key="drug" />,
  <ApartmentRoundedIcon key="equipment" />,
  <GroupsRoundedIcon key="staff" />,
  <HistoryRoundedIcon key="logs" />,
];

export default function AdminDashboard({ data }: AdminDashboardProps) {
  return (
    <Stack spacing={3}>
      <DashboardHero
        eyebrow="Платформын хяналт"
        title="Нэгдсэн удирдлагын самбар"
        description="Эмнэлэг, эмийн сан, эмийн каталог, ажилтны эрх, нөөцийн эрсдэл болон байршлын мэдээллийг нэг дороос харах боломжтой төв самбар."
        chips={[
          `Эмнэлэг: ${data.stats[0]?.value ?? 0}`,
          `Эмийн сан: ${data.stats[1]?.value ?? 0}`,
          `Эм: ${data.stats[2]?.value ?? 0}`,
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
              icon={adminIcons[index]}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <DashboardPanel
            title="Сүүлийн 6 сарын өсөлтийн зураглал"
            description="Шинээр нэмэгдсэн байгууллага, эм болон логийн бүртгэлийн урсгалыг сараар нь харуулна."
            action={
              <DashboardQuickActions
                items={[
                  { label: "Эмнэлэг удирдах", href: "/admin/hospital" },
                  { label: "Эмийн сан удирдах", href: "/admin/pharmacy" },
                  { label: "Эм удирдах", href: "/admin/medicine" },
                  { label: "Ажилтнууд", href: "/admin/staff" },
                ]}
              />
            }
          >
            <DashboardSeriesChart series={data.growthSeries} />
          </DashboardPanel>
        </Grid>
        <Grid size={{ xs: 12, xl: 4 }}>
          <DashboardPanel
            title="Нөөцийн төлөвийн хуваарилалт"
            description="Эмийн бүртгэлүүдийн одоогийн төлөв байдлын ерөнхий бүтэц."
          >
            <DashboardDonutChart items={data.inventoryStatus} />
          </DashboardPanel>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <DashboardPanel
            title="Сүүлийн нэмэгдсэн өгөгдлүүд"
            description="Системд хамгийн сүүлд бүртгэгдсэн эмнэлэг, эмийн сан, эм, логийн хөдөлгөөн."
          >
            <DashboardActivityList
              items={data.recentItems}
              emptyTitle="Сүүлийн өөрчлөлт алга"
              emptyDescription="Шинэ бүртгэл эсвэл өөрчлөлт орсон үед энд автоматаар харагдана."
            />
          </DashboardPanel>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <DashboardPanel
            title="Анхаарах дохио"
            description="Платформын хэмжээнд хяналт шаардсан байдал, мэдээллийн цоорхойнууд."
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
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <DashboardPanel
            title="Идэвхтэй эмнэлгүүд"
            description="Төхөөрөмж болон захиалгын идэвхээр харахад илүү ачаалалтай эмнэлгүүд."
          >
            <DashboardActivityList
              items={data.topHospitals.map((item, index) => ({
                id: `hospital-rank-${index}`,
                title: item.label,
                subtitle: `${item.value} төхөөрөмж`,
                meta: item.helper ?? undefined,
                href: undefined,
                createdAt: undefined,
              }))}
              emptyTitle="Эмнэлгийн жагсаалт хоосон байна"
              emptyDescription="Эмнэлгийн идэвхтэй өгөгдөл нэмэгдэх үед энэ жагсаалт дүүрнэ."
            />
          </DashboardPanel>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <DashboardPanel
            title="Нөөц ихтэй эмийн сангууд"
            description="Эмийн нөөцийн бүртгэлийн тоогоор тэргүүлж буй салбарууд."
          >
            <DashboardActivityList
              items={data.topPharmacies.map((item, index) => ({
                id: `pharmacy-rank-${index}`,
                title: item.label,
                subtitle: `${item.value} бүртгэл`,
                meta: item.helper ?? undefined,
                href: undefined,
                createdAt: undefined,
              }))}
              emptyTitle="Эмийн сангийн жагсаалт хоосон байна"
              emptyDescription="Нөөцийн өгөгдөл бүртгэгдэх үед энэ жагсаалт шинэчлэгдэнэ."
            />
          </DashboardPanel>
        </Grid>
      </Grid>

      <Box>
        <AdminLocationMap
          hospitals={data.map.hospitals}
          drugstores={data.map.drugstores}
        />
      </Box>
    </Stack>
  );
}
