"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";

type Props = { sku: string; name: string; price: number };

export function AddToCartButton({ sku, name, price }: Props) {
  const { add } = useCart();
  const [pending, setPending] = useState(false);

  return (
    <button
      className="btn btn-primary"
      type="button"
      disabled={pending}
      onClick={() => {
        setPending(true);
        add({ sku, name, price });
        setTimeout(() => setPending(false), 250);
      }}
    >
      {pending ? "Adding…" : "Add to cart"}
    </button>
  );
}
