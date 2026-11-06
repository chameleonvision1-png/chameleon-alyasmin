import Link from "next/link";
import { notFound } from "next/navigation";
import { readDB } from "@/lib/db";
import { formatPrice, statusLabels } from "@/lib/format";
import { orderWhatsAppText, waLink } from "@/lib/whatsapp";
import { CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

export const dynamic = "force-dynamic";

export default async function OrderSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await readDB();
  const order = db.orders.find((o) => o.id === id);
  if (!order) notFound();

  const branch = db.branches.find((b) => b.id === order.branchId) ?? db.branches[0];
  const whatsappUrl = waLink(branch.whatsapp, orderWhatsAppText(order, branch));

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-[32px] bg-white border border-[#E8A818]/40 p-6 sm:p-8 text-center space-y-4 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-[#198754] text-white mx-auto grid place-items-center shadow">
          <CheckIcon className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <div className="text-xs font-extrabold text-[#A87508]">
            رقم الطلب: #{order.orderNumber}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#18110C]">
            تم تسجيل طلبك في مطعم الياسمين!
          </h1>
          <p className="text-xs sm:text-sm text-[#292929]/75">
            حالة الطلب الحالية: <span className="font-black text-[#18110C]">{statusLabels[order.status] || order.status}</span>
          </p>
        </div>

        <div className="rounded-2xl bg-[#FAF6EC] p-4 text-right space-y-2 text-xs sm:text-sm border border-[#18110C]/10">
          <div className="font-black text-[#18110C] border-b border-[#18110C]/10 pb-2">
            تفاصيل الطلب ({branch.name})
          </div>
          {order.items.map((it, i) => (
            <div key={i} className="flex justify-between gap-2 font-bold">
              <span>
                {it.qty} × {it.name} {it.sizeLabel ? `(${it.sizeLabel})` : ""}
              </span>
              <span>{formatPrice(it.unitPrice * it.qty)}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-[#18110C]/10 flex justify-between font-black text-base text-[#18110C]">
            <span>الإجمالي الكلي</span>
            <span className="text-[#A87508]">{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#25D366] text-white font-black text-xs sm:text-sm py-3.5 px-5 flex items-center justify-center gap-2 shadow"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>إرسال الطلب عبر واتساب</span>
          </a>

          <a
            href={`tel:${branch.phone}`}
            dir="ltr"
            className="font-en rounded-full bg-[#18110C] text-[#E8A818] font-black text-xs sm:text-sm py-3.5 px-5 flex items-center justify-center gap-2"
          >
            <PhoneIcon className="w-4 h-4" />
            <span>{branch.phone}</span>
          </a>
        </div>

        <div className="pt-2">
          <Link href="/menu" className="text-xs font-extrabold text-[#A87508] hover:underline">
            ← العودة إلى المنيو
          </Link>
        </div>
      </div>
    </div>
  );
}
