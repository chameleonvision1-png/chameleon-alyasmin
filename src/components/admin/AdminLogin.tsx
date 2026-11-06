"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password: pw }),
    });
    setLoading(false);
    if (!res.ok) {
      setErr((await res.json()).error);
      return;
    }
    router.refresh();
  };

  return (
    <div className="min-h-screen grid place-items-center px-4 bg-[#FAF6EC]">
      <form
        onSubmit={submit}
        className="rounded-[32px] bg-white border border-[#E8A818]/40 shadow-2xl w-full max-w-sm p-8 space-y-4"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-emblem.png"
          alt="مطعم الياسمين"
          className="w-20 h-20 mx-auto rounded-full bg-[#18110C] p-3 ring-2 ring-[#E8A818]"
        />
        <h1 className="text-xl font-black text-[#18110C] text-center">
          لوحة تحكم مطعم الياسمين
        </h1>
        <label className="block">
          <span className="label">اسم المستخدم</span>
          <input
            autoFocus
            autoComplete="username"
            dir="ltr"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="label">كلمة المرور</span>
          <input
            type="password"
            autoComplete="current-password"
            dir="ltr"
            className="input"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </label>
        {err && <p className="text-sm text-red-700 font-bold">{err}</p>}
        <button disabled={loading} className="btn btn-primary w-full cursor-pointer">
          {loading ? "…" : "دخول"}
        </button>
        <Link
          href="/"
          className="block text-center text-sm text-[#292929]/60 hover:text-[#18110C] font-bold"
        >
          ← رجوع للموقع
        </Link>
      </form>
    </div>
  );
}
