"use client";

import { useState } from "react";
import type { TabProps } from "./AdminDashboard";
import { deleteItem, Field, ImageUploader, Modal, saveItem } from "./ui";
import type { Category, Intent } from "@/lib/types";

const intents: { id: Intent; label: string }[] = [
  { id: "shawarma", label: "الشاورما السورية" },
  { id: "grills", label: "المشاوي الشامية" },
  { id: "fatteh", label: "الفتات الدمشقية" },
  { id: "appetizers", label: "المقبلات السورية" },
  { id: "sandwiches", label: "الساندوتشات والغربي" },
  { id: "family", label: "الوجبات العائلية والولائم" },
  { id: "sides", label: "الإضافات والمشروبات" },
  { id: "offers", label: "العروض" },
];

export default function CategoriesTab({ data, reload, notify }: TabProps) {
  const [edit, setEdit] = useState<Category | null>(null);
  const sorted = [...data.categories].sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() =>
            setEdit({
              id: "",
              nameAr: "",
              slug: "",
              intent: "shawarma",
              icon: "shawarma",
              image: "",
              sortOrder: sorted.length + 1,
            })
          }
          className="btn btn-primary"
        >
          + قسم جديد
        </button>
      </div>
      <div className="card divide-y">
        {sorted.map((c) => (
          <div key={c.id} className="p-4 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#E8A818] shrink-0" />
            <div className="flex-1">
              <div className="font-black">{c.nameAr}</div>
              <div className="text-xs text-ink/50">
                {data.products.filter((p) => p.categoryId === c.id).length} صنف — ترتيب {c.sortOrder}
              </div>
            </div>
            <button onClick={() => setEdit({ ...c })} className="text-[#A87508] font-bold text-sm">
              تعديل
            </button>
            <button
              onClick={async () => {
                if (data.products.some((p) => p.categoryId === c.id))
                  return alert("انقل أو احذف أصناف القسم أولاً");
                if (confirm("حذف القسم؟")) {
                  await deleteItem("categories", c.id);
                  reload();
                }
              }}
              className="text-red-700 font-bold text-sm"
            >
              حذف
            </button>
          </div>
        ))}
      </div>
      {edit && (
        <Modal title={edit.id ? "تعديل قسم" : "قسم جديد"} onClose={() => setEdit(null)}>
          <div className="space-y-3">
            <ImageUploader value={edit.image} onChange={(image) => setEdit({ ...edit, image })} />
            <Field label="اسم القسم (عربي)">
              <input
                className="input"
                value={edit.nameAr}
                onChange={(e) => setEdit({ ...edit, nameAr: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="النوع">
                <select
                  className="input"
                  value={edit.intent}
                  onChange={(e) => setEdit({ ...edit, intent: e.target.value as Intent })}
                >
                  {intents.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="الترتيب">
                <input
                  type="number"
                  className="input"
                  value={edit.sortOrder}
                  onChange={(e) => setEdit({ ...edit, sortOrder: Number(e.target.value) })}
                />
              </Field>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setEdit(null)} className="btn bg-cream">
                إلغاء
              </button>
              <button
                onClick={async () => {
                  if (!edit.nameAr.trim()) return;
                  const item = {
                    ...edit,
                    slug: edit.slug || edit.id || `cat${Date.now().toString(36)}`,
                  };
                  if (!item.id) item.id = item.slug;
                  await saveItem("categories", item);
                  setEdit(null);
                  notify("تم الحفظ");
                  reload();
                }}
                className="btn btn-primary"
              >
                حفظ
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
