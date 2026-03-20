import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <p className="font-sans text-sm font-light text-[#3A3028]/60">404</p>
      <p className="mt-4 font-sans text-sm font-light text-[#3A3028]/60">
        お探しのページが見つかりませんでした
      </p>
      <Link
        href="/"
        className="mt-12 font-serif text-sm font-extralight tracking-[0.2em] text-[#7A8C6E] hover:underline"
      >
        トップへ戻る
      </Link>
    </div>
  );
}
