import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#3A3028]/5 bg-[#F7F3EE]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/"
              className="font-serif text-lg font-extralight tracking-[0.2em] text-[#3A3028] hover:text-[#7A8C6E] transition-colors"
            >
              COIL
            </Link>
            <p className="mt-4 font-sans text-sm font-light text-[#3A3028]/60 max-w-xs">
              つながりは、現場から生まれる。
            </p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
            <Link
              href="/salons"
              className="font-serif text-sm font-extralight tracking-[0.15em] text-[#3A3028] hover:text-[#7A8C6E] transition-colors"
            >
              サロン検索
            </Link>
            <Link
              href="/register/beautician"
              className="font-serif text-sm font-extralight tracking-[0.15em] text-[#3A3028] hover:text-[#7A8C6E] transition-colors"
            >
              美容師登録
            </Link>
            <Link
              href="/register/salon"
              className="font-serif text-sm font-extralight tracking-[0.15em] text-[#3A3028]/60 hover:text-[#7A8C6E] transition-colors"
            >
              サロン掲載
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[#3A3028]/5">
          <p className="font-sans text-xs font-light text-[#3A3028]/40">
            © {new Date().getFullYear()} COIL
          </p>
        </div>
      </div>
    </footer>
  );
}
