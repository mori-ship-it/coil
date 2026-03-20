"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockSalons } from "@/data/salons";
import { AREA_LABELS, JOB_TYPE_LABELS } from "@/types/salon";
import type { Area, JobType } from "@/types/salon";

const pickupSalons = mockSalons.filter((s) => s.spotsAvailable > 0).slice(0, 6);

export default function Home() {
  const router = useRouter();
  const [area, setArea] = useState<Area | "">("");
  const [jobType, setJobType] = useState<JobType | "">("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (area) params.set("area", area);
    if (jobType) params.set("jobType", jobType);
    router.push(`/salons?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero - compact */}
      <section className="relative h-[50vh] min-h-[400px] w-full sm:h-[55vh]">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#3A3028]/80 via-[#3A3028]/40 to-[#3A3028]/20"
          aria-hidden
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl font-bold tracking-wide text-white sm:text-5xl md:text-6xl">
            COIL
          </h1>
          <p className="mt-4 text-base text-white/95 sm:text-lg">
            つながりは、現場から生まれる。
          </p>

          <form onSubmit={handleSearch} className="mt-8 w-full max-w-2xl">
            <div className="flex flex-col gap-3 rounded-lg bg-white/95 p-4 sm:flex-row sm:gap-4">
              <select
                value={area}
                onChange={(e) => setArea(e.target.value as Area | "")}
                className="flex-1 rounded-md border border-[#3A3028]/20 bg-white px-4 py-3 text-sm text-[#3A3028]"
                aria-label="エリア"
              >
                <option value="">エリア</option>
                {(Object.keys(AREA_LABELS) as Area[]).map((key) => (
                  <option key={key} value={key} className="text-[#3A3028]">
                    {AREA_LABELS[key]}
                  </option>
                ))}
              </select>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType | "")}
                className="flex-1 rounded-md border border-[#3A3028]/20 bg-white px-4 py-3 text-sm text-[#3A3028]"
                aria-label="職種"
              >
                <option value="">職種</option>
                {(Object.keys(JOB_TYPE_LABELS) as JobType[]).map((key) => (
                  <option key={key} value={key} className="text-[#3A3028]">
                    {JOB_TYPE_LABELS[key]}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-lg bg-[#5A6E4E] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#4A5E3E] min-h-[44px]"
              >
                検索
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Pickup Salons - horizontal cards */}
      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#3A3028] sm:text-xl">
              ピックアップサロン
            </h2>
            <Link
              href="/salon"
              className="text-sm font-medium text-[#5A6E4E] hover:underline"
            >
              サロン掲載はこちら
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pickupSalons.map((salon) => (
              <Link
                key={salon.id}
                href={`/salons/${salon.id}`}
                className="flex overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                  <Image
                    src={salon.photos[0]}
                    alt={salon.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                  <span className="absolute right-1 top-1 rounded bg-[#5A6E4E] px-1.5 py-0.5 text-[10px] font-medium text-white">
                    PR
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center p-3 sm:p-4">
                  <h3 className="truncate font-bold text-[#3A3028] text-sm sm:text-base">
                    {salon.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#3A3028]/70">
                    {AREA_LABELS[salon.area]}
                  </p>
                  <p className="mt-1 text-xs text-[#3A3028]/70">
                    {salon.jobTypes.map((jt) => JOB_TYPE_LABELS[jt]).join("・")}
                  </p>
                  {salon.spotsAvailable > 0 && (
                    <span className="mt-2 inline-flex w-fit rounded bg-[#5A6E4E] px-2 py-0.5 text-xs font-medium text-white">
                      スポット可 採用枠{salon.spotsAvailable}名
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#3A3028]/10 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm text-[#3A3028]/80">
            プロフィールを登録して、理想のサロンからのオファーをお待ちください
          </p>
          <Link
            href="/register/beautician"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#5A6E4E] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#4A5E3E] min-h-[44px]"
          >
            美容師登録をする
          </Link>
        </div>
      </section>
    </div>
  );
}
