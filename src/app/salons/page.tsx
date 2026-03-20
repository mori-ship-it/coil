"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useMemo, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockSalons } from "@/data/salons";
import { AREA_LABELS, JOB_TYPE_LABELS } from "@/types/salon";
import type { Area, JobType } from "@/types/salon";

const QUICK_FILTERS = [
  { key: "spots", label: "スポット可" },
  { key: "sameDay", label: "即日可" },
  { key: "weekly", label: "週1〜可" },
  { key: "fullTime", label: "正社員" },
  { key: "contract", label: "業務委託" },
] as const;

const jobTypePillClass: Record<JobType, string> = {
  stylist:
    "border border-[#7A8C6E]/25 bg-[#7A8C6E]/15 text-[#3A3028]",
  colorist:
    "border border-[#9BA88F]/25 bg-[#9BA88F]/20 text-[#3A3028]",
  assistant:
    "border border-[#5C6B52]/25 bg-[#5C6B52]/15 text-[#3A3028]",
  nail:
    "border border-[#E7DDB0]/35 bg-[#F6F0D8] text-[#3A3028]",
  esthetician:
    "border border-[#CFE6EE]/45 bg-[#DDF2F7] text-[#3A3028]",
  manager:
    "border border-[#3A3028]/15 bg-[#3A3028]/5 text-[#3A3028]",
  other:
    "border border-[#3A3028]/15 bg-[#F7F3EE] text-[#3A3028]",
};

const clampStyle: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      aria-hidden="true"
    >
      <path
        stroke={filled ? "none" : "currentColor"}
        strokeWidth={filled ? 0 : 1.8}
        d="M6 2h12a2 2 0 0 1 2 2v18l-8-5-8 5V4a2 2 0 0 1 2-2z"
      />
    </svg>
  );
}

function SalonSearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const area = searchParams.get("area") as Area | null;
  const jobType = searchParams.get("jobType") as JobType | null;

  const spotsOnly = searchParams.get("spots") === "1";
  const sameDayOnly = searchParams.get("sameDay") === "1";
  const weeklyOnly = searchParams.get("weekly") === "1";
  const fullTimeOnly = searchParams.get("fullTime") === "1";
  const contractOnly = searchParams.get("contract") === "1";
  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/salons?${params.toString()}`);
  };

  const toggleQuickFilter = (key: string) => {
    const current = searchParams.get(key) === "1";
    updateFilter(key, current ? null : "1");
  };

  const matchedSalons = useMemo(() => {
    const filtered = mockSalons.filter((salon) => {
      if (area && salon.area !== area) return false;
      if (jobType && !salon.jobTypes.includes(jobType)) return false;
      if (spotsOnly && salon.spotsAvailable === 0) return false;
      if (sameDayOnly && !salon.sameDayOk) return false;
      if (weeklyOnly && !salon.weeklyOk) return false;
      if (fullTimeOnly && !salon.fullTimeOk) return false;
      if (contractOnly && !salon.contractOk) return false;
      return true;
    });

    // PR first, then more open spots, then latest
    return filtered.sort((a, b) => {
      const pr = Number(!!b.featured) - Number(!!a.featured);
      if (pr !== 0) return pr;
      const spots = b.spotsAvailable - a.spotsAvailable;
      if (spots !== 0) return spots;
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [
    area,
    jobType,
    spotsOnly,
    sameDayOnly,
    weeklyOnly,
    fullTimeOnly,
    contractOnly,
  ]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="mb-3 text-lg font-bold text-[#3A3028] sm:text-xl">
          サロン検索
        </h1>

        {/* Main search bar */}
        <div className="mb-3 rounded-lg bg-white p-3 shadow-sm sm:flex sm:items-end sm:gap-4">
          <div className="flex-1">
            <label
              htmlFor="filter-area"
              className="mb-1 block text-xs font-medium text-[#3A3028]/70"
            >
              エリア
            </label>
            <select
              id="filter-area"
              value={area || ""}
              onChange={(e) =>
                updateFilter("area", e.target.value || null)
              }
              className="w-full rounded-md border border-[#3A3028]/15 bg-[#F7F3EE] px-3 py-2 text-sm text-[#3A3028] focus:border-[#5A6E4E] focus:outline-none"
            >
              <option value="">すべて</option>
              {(Object.keys(AREA_LABELS) as Area[]).map((key) => (
                <option key={key} value={key}>
                  {AREA_LABELS[key]}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="filter-job"
              className="mb-1 block text-xs font-medium text-[#3A3028]/70"
            >
              職種
            </label>
            <select
              id="filter-job"
              value={jobType || ""}
              onChange={(e) =>
                updateFilter("jobType", e.target.value || null)
              }
              className="w-full rounded-md border border-[#3A3028]/15 bg-[#F7F3EE] px-3 py-2 text-sm text-[#3A3028] focus:border-[#5A6E4E] focus:outline-none"
            >
              <option value="">すべて</option>
              {(Object.keys(JOB_TYPE_LABELS) as JobType[]).map(
                (key) => (
                  <option key={key} value={key}>
                    {JOB_TYPE_LABELS[key]}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Quick filter chips (horizontal scroll) */}
        <div className="mb-3 overflow-x-auto">
          <div className="flex min-w-max gap-2 pb-1">
            {QUICK_FILTERS.map(({ key, label }) => {
              const isActive = searchParams.get(key) === "1";
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleQuickFilter(key)}
                  className={`flex-none rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#5A6E4E] text-white"
                      : "bg-[#F7F3EE] text-[#3A3028] border border-[#3A3028]/10 hover:bg-[#F7F3EE]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mb-3 text-sm text-[#3A3028]/70">
          {matchedSalons.length}件の求人が見つかりました
        </p>

        {matchedSalons.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-[#3A3028]/70">
              条件に一致する求人が見つかりませんでした
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#3A3028]/10 overflow-hidden rounded-xl border border-[#3A3028]/10 bg-white">
            {matchedSalons.map((salon) => {
              const isSaved = !!saved[salon.id];
              const canApply = salon.spotsAvailable > 0;
              const applyHref = canApply
                ? `/register/beautician?salon=${salon.id}`
                : "#";

              return (
                <div
                  key={salon.id}
                  className="relative flex gap-3 px-3 py-3 sm:px-4 sm:py-4"
                >
                  {/* Photo */}
                  <Link
                    href={`/salons/${salon.id}`}
                    className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-lg"
                    aria-label={`${salon.name}の詳細`}
                  >
                    <Image
                      src={salon.photos[0]}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </Link>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <div className="min-w-0">
                        <Link
                          href={`/salons/${salon.id}`}
                          className="block truncate font-bold text-[#3A3028] sm:text-[15px]"
                        >
                          {salon.name}
                        </Link>
                        {salon.featured && (
                          <span className="mt-1 inline-flex items-center rounded bg-[#F5D76E] px-2 py-0.5 text-[10px] font-bold text-[#3A3028]">
                            PR
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mt-1 text-xs text-[#3A3028]/60">
                      {AREA_LABELS[salon.area]}・{salon.nearestStation}
                    </p>

                    {/* Job type pills */}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {salon.jobTypes.map((jt) => (
                        <span
                          key={jt}
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${jobTypePillClass[jt]}`}
                        >
                          {JOB_TYPE_LABELS[jt]}
                        </span>
                      ))}
                    </div>

                    {/* Employment badges */}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {salon.spotsAvailable > 0 && (
                        <span className="rounded-full bg-[#5A6E4E] px-2 py-0.5 text-[11px] font-bold text-white">
                          スポット可 {salon.spotsAvailable}名
                        </span>
                      )}
                      {salon.sameDayOk && (
                        <span className="rounded-full bg-[#3A3028]/90 px-2 py-0.5 text-[11px] font-bold text-white">
                          即日可
                        </span>
                      )}
                      {salon.weeklyOk && (
                        <span className="rounded-full border border-[#7A8C6E]/30 bg-[#7A8C6E]/15 px-2 py-0.5 text-[11px] font-semibold text-[#3A3028]">
                          週1〜可
                        </span>
                      )}
                      {salon.fullTimeOk && (
                        <span className="rounded-full bg-[#3A3028] px-2 py-0.5 text-[11px] font-bold text-white">
                          正社員
                        </span>
                      )}
                      {salon.contractOk && (
                        <span className="rounded-full border border-[#7A8C6E]/30 bg-[#7A8C6E]/15 px-2 py-0.5 text-[11px] font-semibold text-[#3A3028]">
                          業務委託
                        </span>
                      )}
                    </div>

                    {/* Salary */}
                    <p className="mt-2 text-xs font-semibold text-[#3A3028]/80">
                      {salon.compensationLabel}
                    </p>

                    {/* Description (2 lines) */}
                    <p className="mt-1 text-xs text-[#3A3028]/70" style={clampStyle}>
                      {salon.description}
                    </p>
                  </div>

                  {/* Right actions */}
                  <div className="flex w-[120px] shrink-0 flex-col items-end justify-between gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSaved((prev) => ({
                          ...prev,
                          [salon.id]: !prev[salon.id],
                        }))
                      }
                      aria-pressed={isSaved}
                      className={`flex w-full items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                        isSaved
                          ? "border-[#5A6E4E] bg-[#5A6E4E] text-white"
                          : "border-[#3A3028]/20 bg-white text-[#3A3028] hover:bg-[#F7F3EE]"
                      }`}
                    >
                      <BookmarkIcon filled={isSaved} />
                      キープ
                    </button>

                    <Link
                      href={applyHref}
                      onClick={(e) => {
                        if (!canApply) e.preventDefault();
                      }}
                      className={`w-full rounded-lg px-3 py-2.5 text-center text-sm font-bold text-white min-h-[44px] ${
                        canApply
                          ? "bg-[#5A6E4E] hover:bg-[#4A5E3E]"
                          : "bg-[#3A3028]/20 text-[#3A3028]/50 cursor-not-allowed"
                      }`}
                      aria-disabled={!canApply}
                    >
                      応募する
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SalonSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#5A6E4E] border-t-transparent" />
        </div>
      }
    >
      <SalonSearchContent />
    </Suspense>
  );
}
