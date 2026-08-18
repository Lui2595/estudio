import { Suspense } from "react";
import { CatalogClient } from "@/components/CatalogClient";
import { getProducts } from "@/lib/products";

export default function CatalogPage() {
  const products = getProducts();
  return (
    <div className="wrap">
      <h1 style={{ fontFamily: "var(--font-display)", marginTop: 0 }}>Catalog</h1>
      <Suspense fallback={<p className="empty">Loading catalog…</p>}>
        <CatalogClient products={products} />
      </Suspense>
    </div>
  );
}
