"use client";

import { useState } from "react";
import Link from "next/link";

const inputBase =
  "w-full rounded-lg border border-[#3A3028]/20 bg-white py-3 px-4 text-sm text-[#3A3028] focus:border-[#5A6E4E] focus:outline-none focus:ring-2 focus:ring-[#5A6E4E]/20";
const inputError = "border-red-500/60 focus:border-red-500 focus:ring-red-500/20";

function LineIcon() {
  return (
    <svg
      className="h-6 w-6 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.349 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

export default function BeauticianRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "お名前を入力してください";
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-12">
        <h2 className="text-2xl font-bold text-[#3A3028] sm:text-3xl">
          登録ありがとうございます！
        </h2>

        <p className="mt-6 max-w-sm text-center text-sm text-[#3A3028]/80">
          LINEでサロンからのスカウトや求人情報をいち早くお届けします
        </p>

        <a
          href="https://line.me/R/ti/p/@example"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex w-full max-w-sm items-center justify-center gap-3 rounded-lg bg-[#06C755] px-6 py-4 font-bold text-white transition-colors hover:bg-[#05b04c]"
        >
          <LineIcon />
          LINEで友だち追加する
        </a>

        <Link
          href="/salons"
          className="mt-6 text-sm text-[#3A3028]/60 hover:underline"
        >
          後で登録する
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <Link
          href="/"
          className="text-sm text-[#7A8C6E] hover:underline"
        >
          トップへ戻る
        </Link>

        <h1 className="mt-8 text-xl font-bold text-[#3A3028] sm:text-2xl">
          美容師登録
        </h1>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#3A3028]"
              >
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`${inputBase} mt-2 ${errors.name ? inputError : ""}`}
                placeholder="山田 花子"
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#3A3028]"
              >
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`${inputBase} mt-2 ${errors.email ? inputError : ""}`}
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-[#5A6E4E] py-4 text-base font-bold text-white transition-colors hover:bg-[#4A5E3E]"
          >
            無料で登録する
          </button>

          <p className="mt-4 text-center text-xs text-[#3A3028]/60">
            登録後、LINEでより詳しいご案内をお送りします
          </p>
        </form>
      </div>
    </div>
  );
}
