"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { Product } from "@/lib/types";
import { productImage } from "@/lib/types";

type Props = { products: Product[] };

export function CatalogClient({ products }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const debouncedQ = useDebouncedValue(q, 300);
  const category = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "name";
  const min = searchParams.get("min") ?? "";
  const max = searchParams.get("max") ?? "";

  const updateParams = (patch: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([k, v]) => {
      if (!v) params.delete(k);
      else params.set(k, v);
    });
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (debouncedQ !== (searchParams.get("q") ?? "")) {
      updateParams({ q: debouncedQ });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category) list = list.filter((p) => p.category === category);
    if (debouncedQ) {
      const needle = debouncedQ.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(needle));
    }
    const minN = min ? Number(min) : undefined;
    const maxN = max ? Number(max) : undefined;
    if (minN !== undefined && !Number.isNaN(minN)) list = list.filter((p) => p.price >= minN);
    if (maxN !== undefined && !Number.isNaN(maxN)) list = list.filter((p) => p.price <= maxN);
    list.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [products, category, debouncedQ, min, max, sort]);

  return (
    <>
      <div className="filters">
        <div className="field">
          <label htmlFor="q">Search</label>
          <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Chair, lamp…" />
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => updateParams({ category: e.target.value })}
          >
            <option value="">All</option>
            <option value="furniture">Furniture</option>
            <option value="lighting">Lighting</option>
            <option value="decor">Decor</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="min">Min price</label>
          <input id="min" type="number" value={min} onChange={(e) => updateParams({ min: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="max">Max price</label>
          <input id="max" type="number" value={max} onChange={(e) => updateParams({ max: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor="sort">Sort</label>
          <select id="sort" value={sort} onChange={(e) => updateParams({ sort: e.target.value })}>
            <option value="name">Name A–Z</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty">No products match your filters.</p>
      ) : (
        <div className="grid">
          {filtered.map((p) => (
            <article key={p.sku} className="card">
              <Link href={`/catalog/${p.slug}`}>
                <div className="card-media">
                  <Image src={productImage(p.imageSeed)} alt={p.name} fill sizes="(max-width: 640px) 100vw, 25vw" />
                </div>
                <div className="card-body">
                  <span className="badge">{p.category}</span>
                  <h2 style={{ fontSize: "1.1rem", margin: "0.5rem 0" }}>{p.name}</h2>
                  <p className="price">${p.price}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
