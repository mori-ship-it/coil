import Link from "next/link";

export default function SalonPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-xl font-bold text-[#3A3028] sm:text-2xl">
          サロン掲載について
        </h1>
        <p className="mt-8 font-sans text-sm font-light leading-relaxed text-[#3A3028]/80">
          COILでは、意欲的な美容師が集まるプラットフォームでサロンを掲載いただけます。
          優秀なスタッフを効率的に募集し、採用コストを抑えながら、採用までの時間を短縮できます。
        </p>
        <Link
          href="/register/salon"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#5A6E4E] px-8 py-3.5 font-semibold text-white transition-colors hover:bg-[#4A5E3E] min-h-[44px]"
        >
          サロン登録をする
        </Link>
      </div>
    </div>
  );
}
