"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#F7F3EE]/95 backdrop-blur-sm border-b border-[#3A3028]/5">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-lg font-extralight tracking-[0.2em] text-[#3A3028] hover:text-[#7A8C6E] transition-colors"
        >
          COIL
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
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
            href="/salon"
            className="font-serif text-sm font-extralight tracking-[0.15em] text-[#3A3028]/60 hover:text-[#7A8C6E] transition-colors"
          >
            サロン掲載はこちら
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden font-serif text-sm font-extralight tracking-widest text-[#3A3028]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー"
        >
          {menuOpen ? "閉じる" : "Menu"}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-[#3A3028]/5 bg-[#F7F3EE] px-4 py-4">
          <div className="flex flex-col gap-4">
            <Link
              href="/salons"
              className="font-serif text-sm font-extralight tracking-[0.15em] text-[#3A3028] hover:text-[#7A8C6E]"
              onClick={() => setMenuOpen(false)}
            >
              サロン検索
            </Link>
            <Link
              href="/register/beautician"
              className="font-serif text-sm font-extralight tracking-[0.15em] text-[#3A3028] hover:text-[#7A8C6E]"
              onClick={() => setMenuOpen(false)}
            >
              美容師登録
            </Link>
            <Link
              href="/salon"
              className="font-serif text-sm font-extralight tracking-[0.15em] text-[#3A3028]/60 hover:text-[#7A8C6E]"
              onClick={() => setMenuOpen(false)}
            >
              サロン掲載はこちら
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
