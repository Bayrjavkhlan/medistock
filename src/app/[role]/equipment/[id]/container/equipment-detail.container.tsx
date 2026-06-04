"use client";

import { useQuery } from "@apollo/client/react";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Alert, Box, Chip, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

import AbilityGuard from "@/components/AbilityGuard";
import StateView from "@/components/core/StateView";
import DetailFactGrid from "@/components/detail/DetailFactGrid";
import DetailMetricCard from "@/components/detail/DetailMetricCard";
import DetailPageShell from "@/components/detail/DetailPageShell";
import DetailSectionCard from "@/components/detail/DetailSectionCard";
import {
  formatEquipmentCategory,
  formatEquipmentLogStatus,
  formatEquipmentLogType,
  formatEquipmentState,
} from "@/features/equipment/display";
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
  if (!value) return "Бүртгэгдээгүй";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return "Бүртгэгдээгүй";

  return new Intl.DateTimeFormat("mn-MN", {
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

const analyticsSlugByModel: Record<string, "definium-656" | "magnetom-aera"> = {
  "Definium 656": "definium-656",
  "MAGNETOM Aera": "magnetom-aera",
};

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
                label={
                  log.status
                    ? formatEquipmentLogStatus(log.status)
                    : formatEquipmentLogType(log.type)
                }
                variant="outlined"
              />
            </Stack>
            <Typography variant="caption" color="text.secondary">
              {formatDateTime(log.createdAt)} -{" "}
              {log.performedBy?.name ?? "Тодорхойгүй"}
            </Typography>
            {showFaultFields ? (
              <>
                <Divider />
                <DetailFactGrid
                  items={[
                    {
                      label: "Гэмтэл гарсан огноо",
                      value: formatDate(log.faultDate),
                    },
                    {
                      label: "Асуудал",
                      value: formatNullable(log.problem),
                    },
                    {
                      label: "Засварын арга хэмжээ",
                      value: formatNullable(log.repairAction),
                    },
                    { label: "Төлөв", value: formatNullable(log.status) },
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
  const params = useParams<{ role: string }>();
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
  const analyticsSlug = equipment?.model
    ? analyticsSlugByModel[equipment.model]
    : null;

  return (
    <AbilityGuard action="read" subject={subject}>
      {loading ? (
        <StateView title="Тоног төхөөрөмжийн мэдээлэл уншиж байна..." loading />
      ) : error ? (
        <StateView
          title="Тоног төхөөрөмжийн мэдээлэл ачаалахад алдаа гарлаа"
          description={error.message}
        />
      ) : !equipment ? (
        <StateView
          title="Тоног төхөөрөмж олдсонгүй"
          description="Хүссэн тоног төхөөрөмж байхгүй эсвэл харах эрх хүрэлцэхгүй байна."
        />
      ) : (
        <DetailPageShell
          title={equipment.name ?? "Тоног төхөөрөмжийн дэлгэрэнгүй"}
          subtitle="Төхөөрөмжийн үндсэн мэдээлэл, баримт бичиг, засвар үйлчилгээ, үзлэг тохируулга, гэмтлийн түүх болон сэлбэгийн мэдээллийг нэг дор харуулна."
          typeLabel={formatEquipmentCategory(equipment.category)}
          meta={[
            `Сериал: ${formatNullable(equipment.serialNo)}`,
            `Шинэчлэгдсэн: ${formatDateTime(equipment.updatedAt)}`,
            `Бүртгэсэн: ${formatDateTime(equipment.createdAt)}`,
          ]}
          aside={
            <>
              <DetailMetricCard
                label="Одоогийн төлөв"
                value={formatEquipmentState(equipment.state)}
                tone={currentStatusTone(equipment.state)}
              />
              <DetailMetricCard
                label="Түүхийн бичлэг"
                value={String(equipmentLogs.length)}
                tone="default"
              />
              <DetailSectionCard title="Товч мэдээлэл" eyebrow="Тойм">
                <Stack spacing={1.5}>
                  <Chip
                    icon={<LocalHospitalRoundedIcon />}
                    label={`Эмнэлэг: ${equipment.hospital?.name ?? "Томилоогүй"}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<PersonRoundedIcon />}
                    label={`Хариуцагч: ${equipment.assignedTo?.name ?? "Томилоогүй"}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<BuildRoundedIcon />}
                    label={`Засварын түүх: ${maintenanceLogs.length}`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<Inventory2RoundedIcon />}
                    label={`Сэлбэг: ${formatNullable(equipment.sparePartsStock)}`}
                    variant="outlined"
                  />
                </Stack>
              </DetailSectionCard>
            </>
          }
        >
          <DetailSectionCard title="Үндсэн мэдээлэл" eyebrow="Тоног төхөөрөмж">
            <DetailFactGrid
              items={[
                { label: "Брэнд", value: formatNullable(equipment.brand) },
                { label: "Модель", value: formatNullable(equipment.model) },
                {
                  label: "Сериал дугаар",
                  value: formatNullable(equipment.serialNo),
                },
                {
                  label: "Үйлдвэрлэсэн он",
                  value: equipment.manufacturedYear
                    ? String(equipment.manufacturedYear)
                    : "Бүртгэгдээгүй",
                },
                {
                  label: "Ашиглалтад орсон огноо",
                  value: formatDate(equipment.commissionedDate),
                },
                {
                  label: "Ашиглалтын дуусах огноо",
                  value: formatDate(equipment.endOfLifeDate),
                },
              ]}
            />
          </DetailSectionCard>

          {analyticsSlug ? (
            <DetailSectionCard
              title="Аналитик ба урьдчилсан засвар"
              eyebrow="AI"
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                  gap: 2,
                }}
              >
                <Link
                  className="rounded-lg border border-teal-200 bg-teal-50 p-4 font-bold text-teal-800"
                  href={`/${params.role}/analytics/${analyticsSlug}`}
                >
                  Ачаалал ба ашиглалтын аналитик
                </Link>
                <Link
                  className="rounded-lg border border-amber-200 bg-amber-50 p-4 font-bold text-amber-800"
                  href={`/${params.role}/maintenance/predictive`}
                >
                  Урьдчилан таамаглах засвар
                </Link>
                <Link
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 font-bold text-slate-800"
                  href={`/${params.role}/reports`}
                >
                  PDF тайлан үүсгэх
                </Link>
              </Box>
            </DetailSectionCard>
          ) : null}

          <DetailSectionCard title="Баримт бичиг" eyebrow="Файл">
            <DetailFactGrid
              items={[
                {
                  label: "Паспорт",
                  value: formatNullable(equipment.passportDocument),
                },
                {
                  label: "Ашиглалтын заавар",
                  value: formatNullable(equipment.usageManualDocument),
                },
                {
                  label: "Тохируулга / калибровкын заавар",
                  value: formatNullable(
                    equipment.calibrationInstructionDocument,
                  ),
                },
              ]}
            />
          </DetailSectionCard>

          <DetailSectionCard
            title="Засвар үйлчилгээ"
            eyebrow="Төлөвлөгөө ба түүх"
          >
            <Stack spacing={2}>
              <DetailFactGrid
                items={[
                  {
                    label: "Засвар үйлчилгээний төлөвлөгөө",
                    value: formatNullable(equipment.maintenancePlan),
                  },
                ]}
              />
              <HistoryList
                logs={maintenanceLogs}
                emptyText="Энэ тоног төхөөрөмжид засвар үйлчилгээний түүх бүртгэгдээгүй байна."
              />
            </Stack>
          </DetailSectionCard>

          <DetailSectionCard
            title="Үзлэг ба тохируулга"
            eyebrow="Чанарын хяналт"
          >
            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight={800}>
                Үзлэгийн түүх
              </Typography>
              <HistoryList
                logs={inspectionLogs}
                emptyText="Энэ тоног төхөөрөмжид үзлэгийн түүх бүртгэгдээгүй байна."
              />
              <Typography variant="subtitle2" fontWeight={800}>
                Тохируулгын түүх
              </Typography>
              <HistoryList
                logs={calibrationLogs}
                emptyText="Энэ тоног төхөөрөмжид тохируулгын түүх бүртгэгдээгүй байна."
              />
            </Stack>
          </DetailSectionCard>

          <DetailSectionCard title="Эвдрэл / гэмтлийн түүх" eyebrow="Гэмтэл">
            <HistoryList
              logs={faultLogs}
              emptyText="Энэ тоног төхөөрөмжид эвдрэл эсвэл гэмтлийн түүх бүртгэгдээгүй байна."
              showFaultFields
            />
          </DetailSectionCard>

          <DetailSectionCard title="Сэлбэг хэрэгсэл" eyebrow="Агуулах">
            <DetailFactGrid
              items={[
                {
                  label: "Шаардлагатай сэлбэг",
                  value: formatNullable(equipment.requiredParts),
                },
                {
                  label: "Ашигласан сэлбэг",
                  value: formatNullable(equipment.usedParts),
                },
                {
                  label: "Үлдэгдэл / бэлэн байдал",
                  value: formatNullable(equipment.sparePartsStock),
                },
              ]}
            />
          </DetailSectionCard>

          <DetailSectionCard title="Баримтын тайлбар" eyebrow="Хяналт">
            <Alert
              icon={<DescriptionRoundedIcon />}
              severity="info"
              sx={{ borderRadius: "0.75rem" }}
            >
              Баримтын талбарууд одоогоор файлын нэр эсвэл холбоос хадгална.
              Дараа нь файл upload хийх хадгалалтыг энэ дэлгэцийн бүтцийг
              өөрчлөхгүйгээр нэмж болно.
            </Alert>
          </DetailSectionCard>
        </DetailPageShell>
      )}
    </AbilityGuard>
  );
}
