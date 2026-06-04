"use client";

import { useQuery } from "@apollo/client/react";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import type { ElementType, ReactNode } from "react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import StateView from "@/components/core/StateView";
import {
  ImagingDeviceAnalyticsDocument,
  type ImagingDeviceAnalyticsQuery,
  type ImagingDeviceAnalyticsQueryVariables,
} from "@/generated/graphql";

type ImagingAnalyticsDashboardProps = {
  deviceSlug: "definium-656" | "magnetom-aera";
};

const periodOptions = [
  { label: "Өдөр", value: "DAILY" },
  { label: "7 хоног", value: "WEEKLY" },
  { label: "Сар", value: "MONTHLY" },
] as const;

const healthLabel: Record<string, string> = {
  NORMAL: "Хэвийн",
  WARNING: "Анхаарах",
  CRITICAL: "Ноцтой",
};

const riskLabel: Record<string, string> = {
  LOW: "Бага",
  MEDIUM: "Дунд",
  HIGH: "Өндөр",
};

const toneClass = (value?: string | null) => {
  if (value === "CRITICAL" || value === "HIGH") {
    return "border-red-200 bg-red-50 text-red-700";
  }
  if (value === "WARNING" || value === "MEDIUM") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }
  return "border-emerald-200 bg-emerald-50 text-emerald-700";
};

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: ElementType;
}) {
  return (
    <div className="shadow-sm rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
        </div>
        <div className="rounded-xl bg-teal-50 p-2 text-teal-700">
          <Icon fontSize="small" />
        </div>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="shadow-sm rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <div className="mt-4 h-72">{children}</div>
    </div>
  );
}

export default function ImagingAnalyticsDashboard({
  deviceSlug,
}: ImagingAnalyticsDashboardProps) {
  const [period, setPeriod] = useState<"DAILY" | "WEEKLY" | "MONTHLY">(
    "MONTHLY",
  );
  const { data, loading, error } = useQuery<
    ImagingDeviceAnalyticsQuery,
    ImagingDeviceAnalyticsQueryVariables
  >(ImagingDeviceAnalyticsDocument, {
    variables: { deviceSlug, period },
    fetchPolicy: "no-cache",
  });

  const analytics = data?.imagingDeviceAnalytics;

  if (loading)
    return <StateView title="Аналитик мэдээлэл уншиж байна..." loading />;
  if (error) {
    return (
      <StateView
        title="Аналитик мэдээлэл ачаалахад алдаа гарлаа"
        description={error.message}
      />
    );
  }
  if (!analytics) {
    return (
      <StateView
        title="Аналитик мэдээлэл олдсонгүй"
        description="Энэ модуль зөвхөн Definium 656 болон MAGNETOM Aera төхөөрөмжид идэвхтэй."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="shadow-sm rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-teal-700">
              Дүрс оношилгооны аналитик
            </p>
            <h1 className="mt-1 text-3xl font-black text-slate-950">
              {analytics.deviceName}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {analytics.hospital} / {analytics.department}
            </p>
          </div>
          <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
            {periodOptions.map((option) => (
              <button
                key={option.value}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-150 ${
                  period === option.value
                    ? "shadow-sm bg-white text-teal-700 hover:bg-teal-50 active:bg-teal-100"
                    : "text-slate-500 hover:bg-white hover:text-slate-700 active:bg-slate-100"
                }`}
                onClick={() => setPeriod(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Нийт зураг / скан"
          value={analytics.stats.totalImages}
          icon={ImageRoundedIcon}
        />
        <StatCard
          label="Тооцоолсон ажилласан цаг"
          value={`${analytics.stats.estimatedOperatingHours} цаг`}
          icon={AccessTimeRoundedIcon}
        />
        <StatCard
          label="Ашиглалтын хувь"
          value={`${analytics.stats.utilizationPercentage}%`}
          icon={SpeedRoundedIcon}
        />
        <StatCard
          label="Нэг өвчтөнд ногдох судалгаа"
          value={analytics.stats.averageStudiesPerPatient}
          icon={AssessmentRoundedIcon}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div
          className={`rounded-xl border p-4 ${toneClass(analytics.health.level)}`}
        >
          <div className="flex items-center gap-2">
            <WarningAmberRoundedIcon fontSize="small" />
            <h2 className="text-lg font-bold">Төхөөрөмжийн эрүүл мэнд</h2>
          </div>
          <p className="mt-3 text-3xl font-black">
            {healthLabel[analytics.health.level] ?? analytics.health.level}
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {analytics.health.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
        <div className="shadow-sm rounded-xl border border-slate-200 bg-white p-4 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900">
            Ачааллын онцлох үзүүлэлт
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <StatCard
              label="Хамгийн ачаалалтай цаг"
              value={analytics.workload.busiestHour}
              icon={AssessmentRoundedIcon}
            />
            <StatCard
              label="Хамгийн ачаалалтай өдөр"
              value={analytics.workload.busiestDay}
              icon={AccessTimeRoundedIcon}
            />
            <StatCard
              label="Бага ашиглалттай үе"
              value={analytics.workload.underutilizedPeriods.join(", ") || "-"}
              icon={SpeedRoundedIcon}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ChartCard title="Цагийн ачааллын тархалт">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.workload.hourly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0f766e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Өдрийн ачааллын чиг хандлага">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.workload.daily}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0284c7"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="7 хоногийн ачааллын чиг хандлага">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.workload.weekly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#7c3aed"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Сарын түүхэн чиг хандлага">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.workload.monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="shadow-sm rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2">
          <AutoFixHighRoundedIcon className="text-teal-700" fontSize="small" />
          <h2 className="text-lg font-bold text-slate-900">
            AI эрсдэлийн шинжилгээ ба засварын зөвлөмж
          </h2>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {analytics.predictions.map((prediction) => (
            <div
              key={prediction.label}
              className={`rounded-xl border p-4 ${toneClass(prediction.riskLevel)}`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold">{prediction.label}</h3>
                <span className="rounded-full bg-white px-2 py-1 text-sm font-black">
                  {prediction.riskScore}%
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold">
                {riskLabel[prediction.riskLevel] ?? prediction.riskLevel}
              </p>
              <p className="mt-3 text-sm">{prediction.recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
