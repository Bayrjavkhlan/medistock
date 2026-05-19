"use client";

import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
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

type HospitalDashboardProps = {
  data: NonNullable<
    NonNullable<DashboardOverviewQuery["dashboardOverview"]>["hospital"]
  >;
};

const icons = [
  <GroupsRoundedIcon key="staff" />,
  <PrecisionManufacturingRoundedIcon key="equipment" />,
  <CalendarMonthRoundedIcon key="bookings" />,
  <PlaylistAddCheckRoundedIcon key="pending" />,
  <MedicalServicesRoundedIcon key="logs" />,
  <LocalPharmacyRoundedIcon key="nearby" />,
];

export default function HospitalDashboard({ data }: HospitalDashboardProps) {
  return (
    <Stack spacing={3}>
      <DashboardHero
        eyebrow="Эмнэлгийн хяналтын самбар"
        title={`${data.profile.name} байгууллагын хяналтын самбар`}
        description="Эмнэлгийн тоног төхөөрөмж, захиалга, ажилтны эрх, сүүлийн лог болон ойролцоох эмийн сангуудын мэдээллийг нэг дороос харуулна."
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
            title="Үйл ажиллагааны хандлага"
            description="Сүүлийн 6 сарын туршид төхөөрөмж, захиалга, логийн өөрчлөлт хэрхэн нэмэгдсэнийг харуулна."
            action={
              <DashboardQuickActions
                items={[
                  { label: "Төхөөрөмж", href: "/hospital/equipment" },
                  { label: "Ажилтнууд", href: "/hospital/staff" },
                  { label: "Логууд", href: "/hospital/equipment/log" },
                ]}
              />
            }
          >
            <DashboardSeriesChart series={data.activitySeries} />
          </DashboardPanel>
        </Grid>
        <Grid size={{ xs: 12, xl: 4 }}>
          <DashboardPanel
            title="Төхөөрөмжийн төлөв"
            description="Төхөөрөмжүүдийн одоогийн ашиглалт, засвар, эвдрэлийн бүтэц."
          >
            <DashboardDonutChart items={data.equipmentStates} />
          </DashboardPanel>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <DashboardPanel
            title="Сүүлийн логийн хөдөлгөөн"
            description="Хамгийн сүүлд бүртгэгдсэн тоног төхөөрөмжийн логийн мэдээлэл."
          >
            <DashboardActivityList
              items={data.recentLogs}
              emptyTitle="Логийн мэдээлэл алга"
              emptyDescription="Төхөөрөмжийн лог бүртгэгдэж эхэлмэгц энд харагдана."
            />
          </DashboardPanel>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <DashboardPanel
            title="Ойрын захиалгууд"
            description="Хугацааны хувьд хамгийн ойрхон байгаа үзлэгийн захиалгууд."
          >
            <DashboardActivityList
              items={data.upcomingBookings}
              emptyTitle="Ойрын захиалга алга"
              emptyDescription="Ирэх захиалга байхгүй үед энэ хэсэг хоосон харагдана."
            />
          </DashboardPanel>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <EntityLocationMap
            title="Эмнэлгийн байршил"
            entityLabel="Эмнэлэг"
            entityName={data.profile.name}
            entityAddress={data.profile.address}
            latitude={data.profile.latitude}
            longitude={data.profile.longitude}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <DashboardPanel
            title="Ойролцоох эмийн сангууд"
            description="Ижил бүсэд байрлах эсвэл координатаар ойр байгаа эмийн сангууд."
          >
            <DashboardActivityList
              items={data.nearbyPharmacies}
              emptyTitle="Ойролцоох эмийн сан олдсонгүй"
              emptyDescription="Байршлын мэдээлэл дутуу бол энэ хэсэг хязгаарлагдмал харагдаж болно."
            />
          </DashboardPanel>
        </Grid>
      </Grid>

      <DashboardPanel
        title="Анхаарах зүйлс"
        description="Эмнэлгийн өдөр тутмын үйл ажиллагаанд хяналт шаардсан төлөвүүд."
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
              sx={{ borderRadius: "0.75rem" }}
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
