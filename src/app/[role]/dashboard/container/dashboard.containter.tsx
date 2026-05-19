"use client";

import { useQuery } from "@apollo/client/react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useSession } from "next-auth/react";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import {
  DASHBOARD_OVERVIEW,
  type DashboardOverviewQuery,
} from "@/features/dashboard/graphql/queries.gql";
import { useEquipmentLogsQuery, useEquipmentsQuery } from "@/generated/hooks";
import { useActiveOrganization } from "@/hooks/useActiveOrganization";
import { getDashboardSubjectForRole, getPortalRole } from "@/lib/casl";
import { useAbility } from "@/lib/casl/useAbility";

import AdminDashboard from "../components/admin-dashboard";
import HospitalDashboard from "../components/hospital-dashboard";
import PharmacyDashboard from "../components/pharmacy-dashboard";
import UserDashboard from "../components/user-dashboard";

export default function DashboardContainer() {
  const { data: session } = useSession();
  const { activeOrganization } = useActiveOrganization();
  const portalRole = getPortalRole(
    session?.user ?? null,
    activeOrganization ?? null,
  );
  const subject = getDashboardSubjectForRole(portalRole);

  const ability = useAbility();
  const canRead = ability.can("read", subject);
  const role =
    portalRole === "ADMIN"
      ? "admin"
      : portalRole?.startsWith("HOSPITAL_")
        ? "hospital"
        : portalRole?.startsWith("PHARMACY_")
          ? "pharmacy"
          : portalRole?.startsWith("SUPPLIER_")
            ? "supplier"
            : "user";
  const organizationName =
    activeOrganization?.organization?.name ?? "Таны байгууллага";

  const overviewQuery = useQuery<DashboardOverviewQuery>(DASHBOARD_OVERVIEW, {
    fetchPolicy: "no-cache",
    skip: !canRead || role === "user" || role === "supplier",
  });

  const userEquipmentsQuery = useEquipmentsQuery({
    variables: { take: 1, skip: 0, where: undefined },
    fetchPolicy: "no-cache",
    skip: !canRead || role !== "user",
  });

  const userLogsQuery = useEquipmentLogsQuery({
    variables: { take: 1, skip: 0, where: undefined },
    fetchPolicy: "no-cache",
    skip: !canRead || role !== "user",
  });

  const loading =
    role === "user"
      ? userEquipmentsQuery.loading || userLogsQuery.loading
      : overviewQuery.loading;

  const error =
    role === "user"
      ? userEquipmentsQuery.error || userLogsQuery.error
      : overviewQuery.error;

  const overview = overviewQuery.data?.dashboardOverview;
  const equipmentCount = userEquipmentsQuery.data?.equipments?.count ?? 0;
  const logCount = userLogsQuery.data?.equipmentLogs?.count ?? 0;

  return (
    <AbilityGuard action="read" subject={subject}>
      {loading ? (
        <StateView title="Уншиж байна..." loading />
      ) : error ? (
        <StateView title="Алдаа гарлаа" description={error.message} />
      ) : role === "admin" && overview?.admin ? (
        <AdminDashboard data={overview.admin} />
      ) : role === "hospital" && overview?.hospital ? (
        <HospitalDashboard data={overview.hospital} />
      ) : role === "pharmacy" && overview?.pharmacy ? (
        <PharmacyDashboard data={overview.pharmacy} />
      ) : role === "user" ? (
        <UserDashboard
          organizationName={organizationName}
          equipmentCount={equipmentCount}
          logCount={logCount}
        />
      ) : role === "supplier" ? (
        <Box
          sx={{
            borderRadius: "0.75rem",
            border: "1px solid",
            borderColor: "divider",
            p: 4,
            background:
              "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 45%, #fefce8 100%)",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight={900}>
              Нийлүүлэгчийн ажлын хэсэг
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 720 }}>
              Эмнэлэг, лабораторийн тоног төхөөрөмжийн бүртгэлээ удирдаж,
              нийлүүлэгчийн мэдээллээ шинэчилж, шинэ хангамжийг нийлүүлэгчийн
              цэснээс нийтлээрэй.
            </Typography>
            <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
              <Button
                component={Link}
                href="/supplier/supply-management"
                variant="contained"
              >
                Бүртгэл удирдах
              </Button>
              <Button
                component={Link}
                href="/supplier/supplier-management"
                variant="outlined"
              >
                Нийлүүлэгчийн мэдээлэл засах
              </Button>
            </Stack>
          </Stack>
        </Box>
      ) : (
        <StateView
          title="Самбарын мэдээлэл олдсонгүй"
          description="Таны үүрэгт зориулсан хяналтын самбарын мэдээлэл бэлэн биш байна."
        />
      )}
    </AbilityGuard>
  );
}
