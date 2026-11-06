"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Branch } from "@/lib/types";

export interface CartLine {
  key: string;
  productId: string;
  name: string;
  image: string;
  sizeLabel?: string;
  addons: { label: string; price: number }[];
  note?: string;
  unitPrice: number;
  qty: number;
}

interface StoreCtx {
  branches: Branch[];
  branch: Branch | null;
  setBranchId: (id: string) => void;
  pickerOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
  cart: CartLine[];
  addToCart: (line: Omit<CartLine, "key">) => void;
  updateQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  bump: number;
  hydrated: boolean;
}

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ branches, children }: { branches: Branch[]; children: React.ReactNode }) {
  const [branchId, setBranchIdState] = useState<string | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const b = localStorage.getItem("alyasmin_branch");
      const c = localStorage.getItem("alyasmin_cart");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (b && branches.some((x) => x.id === b)) setBranchIdState(b);
      else if (branches[0]) setBranchIdState(branches[0].id);
      if (c) setCart(JSON.parse(c));
    } catch {}
    setHydrated(true);
  }, [branches]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("alyasmin_cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  const setBranchId = useCallback((id: string) => {
    setBranchIdState(id);
    localStorage.setItem("alyasmin_branch", id);
    setPickerOpen(false);
  }, []);

  const addToCart = useCallback((line: Omit<CartLine, "key">) => {
    const key = [line.productId, line.sizeLabel, line.addons.map((a) => a.label).join("+"), line.note].join("|");
    setCart((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + line.qty } : l));
      return [...prev, { ...line, key }];
    });
    setBump((x) => x + 1);
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    setCart((prev) => (qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l))));
  }, []);
  const removeLine = useCallback((key: string) => setCart((prev) => prev.filter((l) => l.key !== key)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo<StoreCtx>(() => {
    const branch = branches.find((b) => b.id === branchId) ?? branches[0] ?? null;
    return {
      branches,
      branch,
      setBranchId,
      pickerOpen,
      openPicker: () => setPickerOpen(true),
      closePicker: () => setPickerOpen(false),
      cart,
      addToCart,
      updateQty,
      removeLine,
      clearCart,
      count: cart.reduce((s, l) => s + l.qty, 0),
      subtotal: cart.reduce((s, l) => s + l.qty * l.unitPrice, 0),
      bump,
      hydrated,
    };
  }, [branches, branchId, setBranchId, pickerOpen, cart, addToCart, updateQty, removeLine, clearCart, bump, hydrated]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore outside StoreProvider");
  return v;
}
