"use client";

import { useMutation } from "@apollo/client/react";
import { useState } from "react";

import StateView from "@/components/core/StateView";
import {
  GenerateAnalyticsReportDocument,
  type GenerateAnalyticsReportMutation,
  type GenerateAnalyticsReportMutationVariables,
} from "@/generated/graphql";

const devices = [
  { label: "Definium 656 X-Ray System", value: "definium-656" },
  { label: "MAGNETOM Aera MRI System", value: "magnetom-aera" },
] as const;

const periods = [
  { label: "Өдрийн тайлан", value: "DAILY" },
  { label: "7 хоногийн тайлан", value: "WEEKLY" },
  { label: "Сарын тайлан", value: "MONTHLY" },
] as const;

const downloadPdf = (fileName: string, pdfBase64: string) => {
  const link = document.createElement("a");
  link.href = `data:application/pdf;base64,${pdfBase64}`;
  link.download = fileName;
  link.click();
};

export default function ReportsPage() {
  const [deviceSlug, setDeviceSlug] =
    useState<(typeof devices)[number]["value"]>("definium-656");
  const [period, setPeriod] =
    useState<(typeof periods)[number]["value"]>("MONTHLY");
  const [lastReport, setLastReport] =
    useState<GenerateAnalyticsReportMutation["generateAnalyticsReport"]>();
  const [generateReport, { loading, error }] = useMutation<
    GenerateAnalyticsReportMutation,
    GenerateAnalyticsReportMutationVariables
  >(GenerateAnalyticsReportDocument);

  const handleGenerate = async () => {
    const result = await generateReport({
      variables: { deviceSlug, period },
    });
    const report = result.data?.generateAnalyticsReport;
    if (!report) return;
    setLastReport(report);
    downloadPdf(report.fileName, report.pdfBase64);
  };

  return (
    <div className="space-y-6">
      <div className="shadow-sm rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase text-teal-700">Reports</p>
        <h1 className="mt-1 text-3xl font-black text-slate-950">
          Тайлан үүсгэх
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Тайлан нь төхөөрөмжийн ашиглалт, пик цаг, засварын зөвлөмж, AI
          эрсдэлийн таамаглал болон түүхэн чиг хандлагыг PDF хэлбэрээр үүсгэнэ.
        </p>
      </div>

      <div className="shadow-sm rounded-xl border border-slate-200 bg-white p-5">
        {error ? (
          <StateView
            title="Тайлан үүсгэхэд алдаа гарлаа"
            description={error.message}
          />
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-bold text-slate-700">Төхөөрөмж</span>
            <select
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
              value={deviceSlug}
              onChange={(event) =>
                setDeviceSlug(event.target.value as typeof deviceSlug)
              }
            >
              {devices.map((device) => (
                <option key={device.value} value={device.value}>
                  {device.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-bold text-slate-700">
              Тайлангийн төрөл
            </span>
            <select
              className="w-full rounded-xl border border-slate-300 px-3 py-2"
              value={period}
              onChange={(event) =>
                setPeriod(event.target.value as typeof period)
              }
            >
              {periods.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          className="mt-5 rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-150 hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 active:bg-teal-900 disabled:opacity-60 disabled:hover:bg-teal-700"
          disabled={loading}
          onClick={handleGenerate}
          type="button"
        >
          {loading ? "Үүсгэж байна..." : "PDF тайлан үүсгэх"}
        </button>
      </div>

      {lastReport ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          <p className="font-bold">Сүүлд үүсгэсэн тайлан</p>
          <p className="mt-1 text-sm">
            {lastReport.deviceName} / {lastReport.period} /{" "}
            {lastReport.fileName}
          </p>
          <button
            className="mt-3 rounded-xl bg-white px-4 py-2 text-sm font-bold text-emerald-800 transition-colors duration-150 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:bg-emerald-200"
            onClick={() =>
              downloadPdf(lastReport.fileName, lastReport.pdfBase64)
            }
            type="button"
          >
            Дахин татах
          </button>
        </div>
      ) : null}
    </div>
  );
}
