"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { items, setQty, remove, subtotal, ready } = useCart();

  if (!ready) return <div className="wrap">Loading cart…</div>;

  return (
    <div className="wrap">
      <h1 style={{ fontFamily: "var(--font-display)" }}>Cart</h1>
      {items.length === 0 ? (
        <p className="empty">
          Cart is empty. <Link href="/catalog">Browse catalog</Link>
        </p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.sku}>
                  <td>{i.name}</td>
                  <td>
                    <input
                      className="qty"
                      type="number"
                      min={1}
                      value={i.qty}
                      aria-label={`Quantity for ${i.name}`}
                      onChange={(e) => setQty(i.sku, Number(e.target.value))}
                    />
                  </td>
                  <td>${i.price * i.qty}</td>
                  <td>
                    <button type="button" className="btn btn-ghost" onClick={() => remove(i.sku)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="price" style={{ fontSize: "1.3rem" }}>
            Subtotal: ${subtotal}
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => alert("Checkout demo — payment not implemented.")}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
