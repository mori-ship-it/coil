"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AREA_LABELS, JOB_TYPE_LABELS } from "@/types/salon";
import type { Area, JobType } from "@/types/salon";

const inputBase =
  "w-full rounded-md border border-[#3A3028]/20 bg-white py-2.5 px-3 font-sans text-sm text-[#3A3028] focus:border-[#5A6E4E] focus:outline-none";
const inputError = "border-red-500/60";

export default function SalonRegistrationPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    salonName: "",
    ownerName: "",
    area: "" as Area | "",
    address: "",
    jobTypes: [] as JobType[],
    description: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleJobType = (jobType: JobType) => {
    setFormData((prev) => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(jobType)
        ? prev.jobTypes.filter((jt) => jt !== jobType)
        : [...prev.jobTypes, jobType],
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.salonName.trim()) newErrors.salonName = "サロン名を入力してください";
    if (!formData.ownerName.trim()) newErrors.ownerName = "オーナー名を入力してください";
    if (!formData.area) newErrors.area = "エリアを選択してください";
    if (!formData.address.trim()) newErrors.address = "住所を入力してください";
    if (formData.jobTypes.length === 0) newErrors.jobTypes = "募集職種を1つ以上選択してください";
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }
    if (!formData.phone.trim()) newErrors.phone = "電話番号を入力してください";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => router.push("/salons"), 2000);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
        <p className="font-serif text-lg font-light tracking-[0.15em] text-[#3A3028]">
          登録が完了しました
        </p>
        <p className="mt-4 font-sans text-sm font-light text-[#3A3028]/60">
          サロン検索ページに移動します…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <Link href="/" className="font-sans text-sm font-light text-[#7A8C6E] hover:underline">
          トップへ戻る
        </Link>
        <h1 className="mt-8 text-xl font-bold text-[#3A3028]">
          サロン登録
        </h1>
        <p className="mt-4 font-sans text-sm font-light text-[#3A3028]/70">
          サロン情報を登録して、優秀なスタッフを募集しましょう
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-6">
            {[
              { id: "salonName", label: "サロン名", value: formData.salonName, onChange: (v: string) => setFormData({ ...formData, salonName: v }), error: errors.salonName, required: true },
              { id: "ownerName", label: "オーナー名", value: formData.ownerName, onChange: (v: string) => setFormData({ ...formData, ownerName: v }), error: errors.ownerName, required: true },
            ].map(({ id, label, value, onChange, error, required }) => (
              <div key={id}>
                <label className="block font-sans text-sm font-light text-[#3A3028]">
                  {label} {required && <span className="text-[#7A8C6E]">*</span>}
                </label>
                <input
                  type="text"
                  id={id}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className={`${inputBase} mt-2 ${error ? inputError : ""}`}
                />
                {error && <p className="mt-2 font-sans text-xs font-light text-red-500/80">{error}</p>}
              </div>
            ))}

            <div>
              <label className="block font-sans text-sm font-light text-[#3A3028]">
                エリア <span className="text-[#7A8C6E]">*</span>
              </label>
              <select
                id="area"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value as Area | "" })}
                className={`${inputBase} mt-2 ${errors.area ? inputError : ""}`}
              >
                <option value="">選択してください</option>
                {(Object.keys(AREA_LABELS) as Area[]).map((key) => (
                  <option key={key} value={key}>{AREA_LABELS[key]}</option>
                ))}
              </select>
              {errors.area && <p className="mt-2 font-sans text-xs font-light text-red-500/80">{errors.area}</p>}
            </div>

            <div>
              <label className="block font-sans text-sm font-light text-[#3A3028]">
                住所 <span className="text-[#7A8C6E]">*</span>
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={`${inputBase} mt-2 ${errors.address ? inputError : ""}`}
                placeholder="東京都渋谷区神宮前3-12-5"
              />
              {errors.address && <p className="mt-2 font-sans text-xs font-light text-red-500/80">{errors.address}</p>}
            </div>

            <div>
              <span className="block font-sans text-sm font-light text-[#3A3028]">
                募集職種 <span className="text-[#7A8C6E]">*</span>
              </span>
              <div className="mt-3 flex flex-wrap gap-3">
                {(Object.keys(JOB_TYPE_LABELS) as JobType[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleJobType(key)}
                    className={`border-b-2 py-2 font-sans text-sm font-light transition-colors ${
                      formData.jobTypes.includes(key)
                        ? "border-[#7A8C6E] text-[#7A8C6E]"
                        : "border-transparent text-[#3A3028]/60 hover:text-[#3A3028]"
                    }`}
                  >
                    {JOB_TYPE_LABELS[key]}
                  </button>
                ))}
              </div>
              {errors.jobTypes && <p className="mt-2 font-sans text-xs font-light text-red-500/80">{errors.jobTypes}</p>}
            </div>

            <div>
              <label className="block font-sans text-sm font-light text-[#3A3028]">
                サロンの特徴・アピールポイント
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className={`${inputBase} mt-2 resize-none`}
                placeholder="サロンの雰囲気、大切にしていること"
              />
            </div>

            {[
              { id: "email", label: "メールアドレス", type: "email" as const, value: formData.email, onChange: (v: string) => setFormData({ ...formData, email: v }), error: errors.email },
              { id: "phone", label: "電話番号", type: "tel" as const, value: formData.phone, onChange: (v: string) => setFormData({ ...formData, phone: v }), error: errors.phone },
            ].map(({ id, label, type, value, onChange, error }) => (
              <div key={id}>
                <label className="block font-sans text-sm font-light text-[#3A3028]">
                  {label} <span className="text-[#7A8C6E]">*</span>
                </label>
                <input
                  type={type}
                  id={id}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className={`${inputBase} mt-2 ${error ? inputError : ""}`}
                />
                {error && <p className="mt-2 font-sans text-xs font-light text-red-500/80">{error}</p>}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-10 w-full rounded-lg bg-[#5A6E4E] py-3.5 font-semibold text-white transition-colors hover:bg-[#4A5E3E] min-h-[44px]"
          >
            登録する
          </button>
        </form>
      </div>
    </div>
  );
}
