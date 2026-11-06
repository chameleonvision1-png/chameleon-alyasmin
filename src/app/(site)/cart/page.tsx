import type { Metadata } from "next";
import CartClient from "@/components/CartClient";

export const metadata: Metadata = {
  title: "سلة الطلبات | مطعم الياسمين الدمشقي",
  description: "أكمل طلبك من مطعم الياسمين للمأكولات السورية وأرسله مباشرة عبر واتساب.",
};

export default function CartPage() {
  return <CartClient />;
}
