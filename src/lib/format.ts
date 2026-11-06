export const formatPrice = (n: number) => `${n.toLocaleString("ar-EG")} ج.م`;

export const statusLabels: Record<string, string> = {
  new: "جديد",
  preparing: "جاري التحضير",
  delivering: "خرج للتوصيل",
  done: "مكتمل",
  cancelled: "ملغي",
  contacted: "تم التواصل",
  confirmed: "مؤكد",
};

export const paymentMethods = [
  "الدفع عند الاستلام (كاش)",
  "إنستاباي (InstaPay)",
  "محفظة إلكترونية (فودافون كاش)",
];

export const occasionTypes = [
  "صواني اللّمة والعزومات العائلية",
  "حفلة أو مناسبة خاصة",
  "وجبات شركات ومجموعات كبيرة",
  "استفسار عن مناطق التوصيل",
  "ملاحظة أو اقتراح للإدارة",
  "أخرى",
];
