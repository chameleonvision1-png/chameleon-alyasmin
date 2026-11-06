"use client";

import { useState } from "react";
import type { Branch } from "@/lib/types";
import { occasionTypes } from "@/lib/format";
import { useStore } from "./store";
import { CheckIcon, WhatsAppIcon } from "./icons";

export default function OccasionForm({ branches }: { branches: Branch[] }) {
  const { branch } = useStore();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");
  const [wa, setWa] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setState("loading");
    const res = await fetch("/api/occasions", {
      method: "POST",
      body: new FormData(e.currentTarget),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      setState("idle");
      return;
    }
    setWa(data.whatsappUrl);
    setState("done");
  };

  if (state === "done")
    return (
      <div className="rounded-[28px] bg-white border border-[#E8A818]/40 p-6 text-center lg:sticky lg:top-24 shadow-lg">
        <div className="w-14 h-14 mx-auto rounded-full bg-[#198754] text-white grid place-items-center">
          <CheckIcon className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-black text-[#18110C] mt-3">
          وصلنا طلبك في مطعم الياسمين!
        </h2>
        <p className="text-[#292929]/75 mt-1 text-sm font-semibold">
          سنتواصل معك فوراً لتأكيد التفاصيل، أو يمكنك إرسال التفاصيل مباشرة عبر واتساب الآن:
        </p>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="btn btn-whatsapp w-full mt-4"
        >
          <WhatsAppIcon className="w-4 h-4" /> إرسال التفاصيل على واتساب
        </a>
      </div>
    );

  return (
    <form
      onSubmit={submit}
      className="w-full min-w-0 rounded-[28px] bg-white border border-[#18110C]/10 p-5 sm:p-6 space-y-4 lg:sticky lg:top-24 shadow-[0_16px_40px_-18px_rgba(24,17,12,0.12)]"
    >
      <div>
        <div dir="ltr" className="font-en text-right text-xs font-extrabold tracking-widest text-[#A87508] uppercase">
          FEASTS &amp; DIRECT INQUIRIES
        </div>
        <h2 className="text-xl font-black text-[#18110C] mt-1">
          احجز ولائم العيلة أو أرسل استفسارك
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="min-w-0">
          <label className="label" htmlFor="o-name">
            الاسم *
          </label>
          <input id="o-name" name="name" required className="input" />
        </div>
        <div className="min-w-0">
          <label className="label" htmlFor="o-phone">
            الموبايل *
          </label>
          <input
            id="o-phone"
            name="phone"
            required
            dir="ltr"
            inputMode="tel"
            className="input text-right"
            placeholder="01xxxxxxxxx"
          />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="o-type">
          نوع الطلب *
        </label>
        <select id="o-type" name="type" className="input" required>
          {occasionTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="o-q">
            العدد التقريبي للأفراد أو الوجبات
          </label>
          <input
            id="o-q"
            name="quantity"
            className="input"
            placeholder="مثلاً: 10 أفراد / صينية وليمة الشام"
          />
        </div>
        <div>
          <label className="label" htmlFor="o-d">
            التاريخ المطلوب *
          </label>
          <input id="o-d" name="date" type="date" required className="input" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="o-b">
          منطقة التوصيل
        </label>
        <select id="o-b" name="branchId" className="input" defaultValue={branch?.id}>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="o-det">
          تفاصيل الطلب أو الرسالة
        </label>
        <textarea
          id="o-det"
          name="details"
          rows={3}
          className="input"
          placeholder="اكتب الأصناف أو الصواني المطلوبة، عنوان التوصيل، أو أي ملاحظات…"
        />
      </div>
      {error && (
        <p className="text-sm font-bold text-[#5A3218] bg-[#FFF4D6] rounded-xl p-3">
          {error}
        </p>
      )}
      <button
        disabled={state === "loading"}
        className="btn btn-primary w-full cursor-pointer"
      >
        {state === "loading" ? "جاري الإرسال…" : "إرسال الطلب وتأكيده عبر واتساب"}
      </button>
    </form>
  );
}
