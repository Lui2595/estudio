"use client";

import { useCart } from "@/hooks/useCart";

export function CartCount() {
  const { count, ready } = useCart();
  if (!ready || count === 0) return null;
  return <span className="cart-badge">{count}</span>;
}
