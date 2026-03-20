import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockSalons } from "@/data/salons";
import { AREA_LABELS, JOB_TYPE_LABELS } from "@/types/salon";

export default async function SalonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const salon = mockSalons.find((s) => s.id === id);

  if (!salon) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <nav className="mb-6 text-sm text-[#3A3028]/60">
          <Link href="/salons" className="text-[#7A8C6E] hover:underline">
            サロン検索
          </Link>
          <span className="mx-2">/</span>
          <span>{salon.name}</span>
        </nav>

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {salon.photos.map((photo, index) => (
            <div
              key={index}
              className={`relative overflow-hidden ${
                index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <div
                className={`relative ${
                  index === 0 ? "aspect-[3/4] sm:aspect-[4/5]" : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={photo}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <p className="font-sans text-sm font-light text-[#3A3028]/60">
            {AREA_LABELS[salon.area]}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-light tracking-[0.1em] text-[#3A3028] sm:text-4xl">
            {salon.name}
          </h1>
          <p className="mt-4 font-sans text-sm font-light text-[#3A3028]/70">
            {salon.address}
          </p>
          {salon.spotsAvailable > 0 && (
            <span className="mt-4 inline-block font-sans text-xs font-light text-[#7A8C6E]">
              スポット可
            </span>
          )}
        </div>

        <div className="mb-8 border-t border-[#3A3028]/10 pt-6">
          <h2 className="mb-4 text-lg font-semibold text-[#3A3028]">
            サロンについて
          </h2>
          <p className="font-sans text-sm font-light leading-relaxed text-[#3A3028]/90">
            {salon.description}
          </p>
        </div>

        {salon.jobTypes.length > 0 && (
          <div className="mb-8 border-t border-[#3A3028]/10 pt-6">
            <p className="font-sans text-sm font-light text-[#3A3028]/70">
              {salon.jobTypes.map((jt) => JOB_TYPE_LABELS[jt]).join(" · ")}
            </p>
          </div>
        )}

        <div className="border-t border-[#3A3028]/10 pt-8">
          <Link
            href={
              salon.spotsAvailable > 0
                ? `/register/beautician?salon=${salon.id}`
                : "#"
            }
            className={`inline-flex items-center justify-center rounded-lg px-6 py-3.5 font-semibold text-white min-h-[44px] transition-colors ${
              salon.spotsAvailable > 0
                ? "bg-[#5A6E4E] hover:bg-[#4A5E3E]"
                : "cursor-not-allowed bg-[#3A3028]/30"
            }`}
            aria-disabled={salon.spotsAvailable === 0}
          >
            {salon.spotsAvailable > 0 ? "応募する" : "現在募集しておりません"}
          </Link>
        </div>
      </div>
    </div>
  );
}
