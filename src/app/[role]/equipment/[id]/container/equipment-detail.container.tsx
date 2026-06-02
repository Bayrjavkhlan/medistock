"use client";

import { useQuery } from "@apollo/client/react";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Alert, Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import DetailFactGrid from "@/components/detail/DetailFactGrid";
import DetailMetricCard from "@/components/detail/DetailMetricCard";
import DetailPageShell from "@/components/detail/DetailPageShell";
import DetailSectionCard from "@/components/detail/DetailSectionCard";
import {
  EquipmentDetailDocument,
  type EquipmentDetailQuery,
  type EquipmentDetailQueryVariables,
} from "@/generated/graphql";
import { getEquipmentSubjectForRole, getPortalRole } from "@/lib/casl";
import { formatDateTime, formatNullable } from "@/utils/detailFormatters";

type EquipmentDetailContainerProps = {
  id: string;
};

type EquipmentLog = NonNullable<
  NonNullable<
    NonNullable<EquipmentDetailQuery["equipmentDetail"]>["logs"]
  >[number]
>;

const formatDate = (value?: unknown) => {
  if (!value) return "Not registered";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return "Not registered";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const currentStatusTone = (state?: string | null) => {
  if (state === "AVAILABLE" || state === "ASSIGNED") return "success";
  if (state === "IN_MAINTENANCE") return "warning";
  if (state === "OUT_OF_ORDER" || state === "RETIRED") return "warning";
  return "default";
};

const logsByType = (logs: EquipmentLog[] | null | undefined, type: string) =>
  (logs ?? []).filter((log): log is EquipmentLog => !!log && log.type === type);

function HistoryList({
  logs,
  emptyText,
  showFaultFields = false,
}: {
  logs: EquipmentLog[];
  emptyText: string;
  showFaultFields?: boolean;
}) {
  if (!logs.length) {
    return (
      <Alert severity="info" sx={{ borderRadius: "0.75rem" }}>
        {emptyText}
      </Alert>
    );
  }

  return (
    <Stack spacing={1.5}>
      {logs.map((log) => (
        <Box
          key={log.id}
          sx={{
            p: 2,
            borderRadius: "0.75rem",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "rgba(248,250,252,0.95)",
          }}
        >
          <Stack spacing={1}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              justifyContent="space-between"
            >
              <Typography variant="subtitle2" fontWeight={800}>
                {formatNullable(log.description)}
              </Typography>
              <Chip
                size="small"
                label={log.status ?? log.type ?? "Log"}
                variant="outlined"
              />
            </Stack>
            <Typography variant="caption" color="text.secondary">
              {formatDateTime(log.createdAt)} by{" "}
              {log.performedBy?.name ?? "Unknown"}
            </Typography>
            {showFaultFields ? (
              <>
                <Divider />
                <DetailFactGrid
                  items={[
                    { label: "Fault Date", value: formatDate(log.faultDate) },
                    {
                      label: "Problem",
                      value: formatNullable(log.problem),
                    },
                    {
                      label: "Repair Action",
                      value: formatNullable(log.repairAction),
                    },
                    { label: "Status", value: formatNullable(log.status) },
                  ]}
                />
              </>
            ) : null}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

export default function EquipmentDetailContainer({
  id,
}: EquipmentDetailContainerProps) {
  const { data: session } = useSession();
  const portalRole = getPortalRole(session?.user ?? null, null);
  const subject = getEquipmentSubjectForRole(portalRole);

  const { data, loading, error } = useQuery<
    EquipmentDetailQuery,
    EquipmentDetailQueryVariables
  >(EquipmentDetailDocument, {
    variables: { equipmentDetailId: id },
    fetchPolicy: "no-cache",
  });

  const equipment = data?.equipmentDetail;
  const equipmentLogs = (equipment?.logs ?? []).filter(
    (log): log is EquipmentLog => !!log,
  );
  const maintenanceLogs = logsByType(equipmentLogs, "MAINTENANCE");
  const inspectionLogs = logsByType(equipmentLogs, "INSPECTION");
  const calibrationLogs = logsByType(equipmentLogs, "CALIBRATION");
  const faultLogs = logsByType(equipmentLogs, "FAULT");

  return (
    <AbilityGuard action="read" subject={subject}>
      {loading ? (
        <StateView title="Loading equipment details..." loading />
      ) : error ? (
        <StateView
          title="Unable to load equipment details"
          description={error.message}
        />
      ) : !equipment ? (
        <StateView
          title="Equipment not found"
          description="The requested equipment record does not exist or you do not have permission to view it."
        />
      ) : (
        <DetailPageShell
          title={equipment.name ?? "Equipment Detail"}
          subtitle="Current device information, documents, maintenance plan, history, breakdown records, and spare parts in one place."
          typeLabel={equipment.category ?? "Equipment"}
          meta={[
            `Serial: ${formatNullable(equipment.serialNo)}`,
            `Updated: ${formatDateTime(equipment.updatedAt)}`,
            `Created: ${formatDateTime(equipment.createdAt)}`,
          ]}
          aside={
            <>
              <DetailMetricCard
                label="Current State"
                value={equipment.state ?? "Unknown"}
                tone={currentStatusTone(equipment.state)}
              />
              <DetailMetricCard
                label="History Records"
                value={String(equipmentLogs.length)}
                tone="default"
              />
              <DetailSectionCard title="Quick Info" eyebrow="Overview">
                <Stack spacing={1.5}>
                  <Chip
                    icon={<LocalHospitalRoundedIcon />}
                    label={`Hospital: ${equipment.hospital?.name ?? "Not assigned"}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<PersonRoundedIcon />}
                    label={`Assigned: ${equipment.assignedTo?.name ?? "Not assigned"}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<BuildRoundedIcon />}
                    label={`Maintenance logs: ${maintenanceLogs.length}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<Inventory2RoundedIcon />}
                    label={`Spare parts: ${formatNullable(equipment.sparePartsStock)}`}
                    variant="outlined"
                  />
                </Stack>
              </DetailSectionCard>
            </>
          }
        >
          <DetailSectionCard title="Basic Info" eyebrow="Equipment">
            <DetailFactGrid
              items={[
                { label: "Brand", value: formatNullable(equipment.brand) },
                { label: "Model", value: formatNullable(equipment.model) },
                {
                  label: "Serial Number",
                  value: formatNullable(equipment.serialNo),
                },
                {
                  label: "Manufactured Year",
                  value: equipment.manufacturedYear
                    ? String(equipment.manufacturedYear)
                    : "Not registered",
                },
                {
                  label: "Commissioned Date",
                  value: formatDate(equipment.commissionedDate),
                },
                {
                  label: "End of Life Date",
                  value: formatDate(equipment.endOfLifeDate),
                },
              ]}
            />
          </DetailSectionCard>

          <DetailSectionCard title="Documents" eyebrow="Files">
            <DetailFactGrid
              items={[
                {
                  label: "Passport",
                  value: formatNullable(equipment.passportDocument),
                },
                {
                  label: "Usage Manual",
                  value: formatNullable(equipment.usageManualDocument),
                },
                {
                  label: "Calibration / Adjustment Instruction",
                  value: formatNullable(
                    equipment.calibrationInstructionDocument,
                  ),
                },
              ]}
            />
          </DetailSectionCard>

          <DetailSectionCard title="Maintenance" eyebrow="Plan & History">
            <Stack spacing={2}>
              <DetailFactGrid
                items={[
                  {
                    label: "Maintenance Plan",
                    value: formatNullable(equipment.maintenancePlan),
                  },
                ]}
              />
              <HistoryList
                logs={maintenanceLogs}
                emptyText="No maintenance history has been logged for this equipment yet."
              />
            </Stack>
          </DetailSectionCard>

          <DetailSectionCard
            title="Inspection & Calibration"
            eyebrow="Quality Control"
          >
            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight={800}>
                Inspection History
              </Typography>
              <HistoryList
                logs={inspectionLogs}
                emptyText="No inspection history has been logged for this equipment yet."
              />
              <Typography variant="subtitle2" fontWeight={800}>
                Calibration History
              </Typography>
              <HistoryList
                logs={calibrationLogs}
                emptyText="No calibration history has been logged for this equipment yet."
              />
            </Stack>
          </DetailSectionCard>

          <DetailSectionCard title="Breakdown / Fault History" eyebrow="Faults">
            <HistoryList
              logs={faultLogs}
              emptyText="No breakdown or fault history has been logged for this equipment yet."
              showFaultFields
            />
          </DetailSectionCard>

          <DetailSectionCard title="Spare Parts" eyebrow="Inventory">
            <DetailFactGrid
              items={[
                {
                  label: "Required Parts",
                  value: formatNullable(equipment.requiredParts),
                },
                {
                  label: "Used Parts",
                  value: formatNullable(equipment.usedParts),
                },
                {
                  label: "Stock / Availability",
                  value: formatNullable(equipment.sparePartsStock),
                },
              ]}
            />
          </DetailSectionCard>

          <DetailSectionCard title="Documents Note" eyebrow="Control">
            <Alert
              icon={<DescriptionRoundedIcon />}
              severity="info"
              sx={{ borderRadius: "0.75rem" }}
            >
              Document fields currently store document names or URLs. Upload
              storage can be added later without changing the detail page
              structure.
            </Alert>
          </DetailSectionCard>
        </DetailPageShell>
      )}
    </AbilityGuard>
  );
}
