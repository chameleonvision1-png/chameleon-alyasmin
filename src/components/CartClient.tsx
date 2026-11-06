"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "./store";
import { formatPrice, paymentMethods } from "@/lib/format";
import { MinusIcon, PhoneIcon, PinIcon, PlusIcon, TrashIcon, WhatsAppIcon } from "./icons";

export default function CartClient() {
  const { cart, updateQty, removeLine, subtotal, branch, openPicker, clearCart, hydrated } = useStore();
  const router = useRouter();
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [form, setForm] = useState({ name: "", phone: "", address: "", payment: paymentMethods[0], notes: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!hydrated) return <div className="py-32 text-center text-[#18110C]/50 font-bold">جاري التحميل…</div>;

  if (cart.length === 0)
    return (
      <div className="py-24 px-4 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-[#18110C] p-3 ring-2 ring-[#E8A818] mx-auto grid place-items-center shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-emblem.png" alt="مطعم الياسمين" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#18110C] mt-5">
          سلة الطلبات فارغة حالياً
        </h2>
        <p className="text-[#292929]/70 mt-1.5 font-semibold text-sm">
          أصالة المذاق السوري بانتظارك — اختر أطباقك المفضلة من شاورما ومشاوي وفتات الياسمين.
        </p>
        <Link href="/menu" className="btn btn-primary mt-6">
          تصفح المنيو واطلب الآن
        </Link>
      </div>
    );

  const deliveryFee = orderType === "delivery" ? (branch?.deliveryFee ?? 30) : 0;
  const total = subtotal + deliveryFee;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!branch) {
      openPicker();
      setError("يرجى اختيار منطقة التوصيل أولاً");
      return;
    }
    setLoading(true);
    const win = window.open("", "_blank");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branchId: branch.id,
          customerName: form.name,
          customerPhone: form.phone,
          orderType,
          address: form.address,
          paymentMethod: form.payment,
          notes: form.notes,
          items: cart.map((l) => ({
            productId: l.productId,
            sizeLabel: l.sizeLabel,
            addons: l.addons.map((a) => a.label),
            note: l.note,
            qty: l.qty,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى");
      if (win) win.location.href = data.whatsappUrl;
      sessionStorage.setItem(`wa_${data.order.id}`, data.whatsappUrl);
      clearCart();
      router.push(`/order/${data.order.id}`);
    } catch (err) {
      win?.close();
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-6 items-start overflow-x-hidden">
      <div className="space-y-3.5 min-w-0 w-full">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div className="min-w-0">
            <div dir="ltr" className="font-en text-right text-[11px] sm:text-xs font-extrabold tracking-widest text-[#A87508] uppercase">
              YOUR DAMASCENE ORDER
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#18110C]">
              سلة طلبات الياسمين
            </h1>
          </div>
          <Link
            href="/menu"
            className="shrink-0 rounded-full bg-[#FDF2CE] border border-[#E8A514]/50 px-3.5 py-1.5 text-xs font-black text-[#18110C] hover:bg-[#E8A514] transition"
          >
            + إضافة أصناف أخرى
          </Link>
        </div>

        {cart.map((l) => (
          <div
            key={l.key}
            className="w-full min-w-0 rounded-[24px] bg-white border border-[#18110C]/10 p-3.5 flex gap-3 sm:gap-3.5 shadow-xs"
          >
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#18110C] shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.image} alt={l.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-black text-sm sm:text-base text-[#18110C] leading-snug break-words">
                  {l.name}
                </h3>
                <button
                  onClick={() => removeLine(l.key)}
                  className="text-[#292929]/40 hover:text-red-600 cursor-pointer shrink-0 p-1"
                  aria-label="حذف"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
              {l.sizeLabel && (
                <div className="text-xs font-bold text-[#A87508] mt-0.5">{l.sizeLabel}</div>
              )}
              {l.addons.length > 0 && (
                <div className="text-[11px] text-[#292929]/65 mt-0.5">
                  إضافات: {l.addons.map((a) => a.label).join("، ")}
                </div>
              )}
              {l.note && (
                <div className="text-[11px] text-[#5A3218] mt-0.5">ملاحظة: {l.note}</div>
              )}

              <div className="mt-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 rounded-full bg-[#FAF6EC] border border-[#18110C]/12 px-2 py-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateQty(l.key, l.qty - 1)}
                    className="w-6 h-6 rounded-full bg-white text-[#18110C] grid place-items-center"
                  >
                    <MinusIcon className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-black w-5 text-center">{l.qty}</span>
                  <button
                    type="button"
                    onClick={() => updateQty(l.key, l.qty + 1)}
                    className="w-6 h-6 rounded-full bg-[#18110C] text-[#E8A818] grid place-items-center"
                  >
                    <PlusIcon className="w-3 h-3" />
                  </button>
                </div>

                <span className="font-black text-sm text-[#18110C] shrink-0">
                  {formatPrice(l.unitPrice * l.qty)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Form */}
      <form
        onSubmit={submit}
        className="w-full min-w-0 rounded-[28px] bg-white border border-[#18110C]/12 p-4 sm:p-6 space-y-4 lg:sticky lg:top-24 shadow-[0_18px_42px_-18px_rgba(24,17,12,0.14)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#18110C]/10">
          <h2 className="text-base sm:text-lg font-black text-[#18110C]">بيانات التوصيل والطلب</h2>
          <a
            href="tel:01010400507"
            dir="ltr"
            className="font-en inline-flex items-center gap-1 text-xs font-black text-[#A87508] shrink-0"
          >
            <PhoneIcon className="w-3.5 h-3.5" />
            <span>01010400507</span>
          </a>
        </div>

        {/* Zone Picker Button */}
        <button
          type="button"
          onClick={openPicker}
          className="w-full min-w-0 rounded-2xl bg-[#FAF6EC] border border-[#E8A818]/40 p-3 flex items-center justify-between gap-2 text-right"
        >
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <PinIcon className="w-4 h-4 text-[#A87508] shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-[11px] text-[#5A3218] font-bold">نطاق التوصيل المختار</div>
              <div className="text-xs font-black text-[#18110C] truncate">
                {branch ? branch.name : "اختر منطقتك في القاهرة"}
              </div>
            </div>
          </div>
          <span className="text-xs font-black text-[#A87508] shrink-0">تغيير</span>
        </button>

        {/* Order Type */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setOrderType("delivery")}
            className={`py-2.5 rounded-xl text-xs font-black border transition ${
              orderType === "delivery"
                ? "bg-[#18110C] text-[#E8A818] border-[#18110C]"
                : "bg-white text-[#18110C] border-[#18110C]/15"
            }`}
          >
            توصيل للمنزل
          </button>
          <button
            type="button"
            onClick={() => setOrderType("pickup")}
            className={`py-2.5 rounded-xl text-xs font-black border transition ${
              orderType === "pickup"
                ? "bg-[#18110C] text-[#E8A818] border-[#18110C]"
                : "bg-white text-[#18110C] border-[#18110C]/15"
            }`}
          >
            استلام مباشر
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="min-w-0">
            <label className="label text-xs" htmlFor="c-name">
              الاسم الكامل *
            </label>
            <input
              id="c-name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input text-xs"
              placeholder="اكتب اسمك"
            />
          </div>
          <div className="min-w-0">
            <label className="label text-xs" htmlFor="c-phone">
              رقم الموبايل *
            </label>
            <input
              id="c-phone"
              required
              dir="ltr"
              inputMode="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="input text-xs text-right"
              placeholder="01xxxxxxxxx"
            />
          </div>
        </div>

        {orderType === "delivery" && (
          <div>
            <label className="label text-xs" htmlFor="c-address">
              العنوان بالتفصيل في القاهرة *
            </label>
            <input
              id="c-address"
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="input text-xs"
              placeholder="المنطقة، اسم الشارع، رقم العمارة، الدور والشقة"
            />
          </div>
        )}

        <div>
          <label className="label text-xs" htmlFor="c-pay">
            طريقة الدفع
          </label>
          <select
            id="c-pay"
            value={form.payment}
            onChange={(e) => setForm({ ...form, payment: e.target.value })}
            className="input text-xs"
          >
            {paymentMethods.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label text-xs" htmlFor="c-notes">
            ملاحظات إضافية على الطلب
          </label>
          <textarea
            id="c-notes"
            rows={2}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="input text-xs"
            placeholder="أي تفاصيل إضافية للتوصيل أو التحضير…"
          />
        </div>

        {/* Summary */}
        <div className="rounded-2xl bg-[#FAF6EC] p-3.5 space-y-1.5 text-xs">
          <div className="flex justify-between font-bold text-[#292929]/75">
            <span>قيمة الأصناف</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {orderType === "delivery" && (
            <div className="flex justify-between font-bold text-[#292929]/75">
              <span>رسوم التوصيل التقديرية</span>
              <span>{formatPrice(deliveryFee)}</span>
            </div>
          )}
          <div className="flex justify-between font-black text-sm text-[#18110C] pt-1.5 border-t border-[#18110C]/10">
            <span>الإجمالي الكلي</span>
            <span className="text-[#A87508]">{formatPrice(total)}</span>
          </div>
        </div>

        {error && (
          <p className="text-xs font-bold text-red-700 bg-red-50 rounded-xl p-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#25D366] hover:brightness-105 text-white font-black text-sm py-3.5 flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>{loading ? "جاري تجهيز الطلب…" : "تأكيد وإرسال الطلب عبر واتساب"}</span>
        </button>
      </form>
    </div>
  );
}
