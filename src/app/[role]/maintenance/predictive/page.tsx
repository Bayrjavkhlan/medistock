"use client";

import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { useParams } from "next/navigation";

import StateView from "@/components/core/StateView";
import {
  PredictiveMaintenanceDocument,
  type PredictiveMaintenanceQuery,
} from "@/generated/graphql";

const riskLabel: Record<string, string> = {
  LOW: "Бага",
  MEDIUM: "Дунд",
  HIGH: "Өндөр",
};

const toneClass = (level?: string | null) => {
  if (level === "CRITICAL" || level === "HIGH") {
    return "border-red-200 bg-red-50 text-red-700";
  }
  if (level === "WARNING" || level === "MEDIUM") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }
  return "border-emerald-200 bg-emerald-50 text-emerald-700";
};

export default function PredictiveMaintenancePage() {
  const params = useParams<{ role: string }>();
  const { data, loading, error } = useQuery<PredictiveMaintenanceQuery>(
    PredictiveMaintenanceDocument,
    { fetchPolicy: "no-cache" },
  );

  if (loading)
    return (
      <StateView title="Урьдчилсан засварын мэдээлэл уншиж байна..." loading />
    );
  if (error) {
    return (
      <StateView
        title="Урьдчилсан засварын мэдээлэл ачаалахад алдаа гарлаа"
        description={error.message}
      />
    );
  }

  const devices = data?.predictiveMaintenance?.devices ?? [];

  return (
    <div className="space-y-6">
      <div className="shadow-sm rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase text-teal-700">
          Predictive Maintenance
        </p>
        <h1 className="mt-1 text-3xl font-black text-slate-950">
          Урьдчилан таамаглах засвар үйлчилгээ
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Энэ самбар зөвхөн Definium 656 болон MAGNETOM Aera төхөөрөмжийн
          ачаалал, ашиглалт, засварын түүх дээр үндэслэн эрсдэлийг тооцно.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {devices.map((device) => (
          <div
            key={device.deviceSlug}
            className="shadow-sm rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  {device.deviceName}
                </h2>
                <p className="text-sm text-slate-600">
                  {device.hospital} / {device.department}
                </p>
              </div>
              <span
                className={`rounded-full border px-3 py-1 text-sm font-bold ${toneClass(device.health.level)}`}
              >
                {device.health.level}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Нийт зураг / скан</p>
                <p className="text-xl font-bold">{device.stats.totalImages}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Ажилласан цаг</p>
                <p className="text-xl font-bold">
                  {device.stats.estimatedOperatingHours}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Ашиглалт</p>
                <p className="text-xl font-bold">
                  {device.stats.utilizationPercentage}%
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {device.predictions.map((prediction) => (
                <div
                  key={prediction.label}
                  className={`rounded-xl border p-3 ${toneClass(prediction.riskLevel)}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold">{prediction.label}</p>
                    <p className="text-lg font-black">
                      {prediction.riskScore}%
                    </p>
                  </div>
                  <p className="text-sm font-semibold">
                    Эрсдэл:{" "}
                    {riskLabel[prediction.riskLevel] ?? prediction.riskLevel}
                  </p>
                  <p className="mt-2 text-sm">{prediction.recommendation}</p>
                </div>
              ))}
            </div>

            <Link
              className="mt-4 inline-flex rounded-xl bg-teal-700 px-4 py-2 text-sm font-bold text-white transition-colors duration-150 hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 active:bg-teal-900"
              href={
                device.deviceSlug === "definium-656"
                  ? `/${params.role}/analytics/definium-656`
                  : `/${params.role}/analytics/magnetom-aera`
              }
            >
              Дэлгэрэнгүй аналитик харах
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
