"use client";

import { useCallback, useEffect, useState } from "react";
import type { CartItem } from "@/lib/types";

const KEY = "catalog-cart-v1";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((p) => p.sku === item.sku);
      if (found) {
        return prev.map((p) => (p.sku === item.sku ? { ...p, qty: p.qty + qty } : p));
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const setQty = useCallback((sku: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((p) => (p.sku === sku ? { ...p, qty } : p))
        .filter((p) => p.qty > 0),
    );
  }, []);

  const remove = useCallback((sku: string) => {
    setItems((prev) => prev.filter((p) => p.sku !== sku));
  }, []);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return { items, add, setQty, remove, subtotal, count, ready };
}
