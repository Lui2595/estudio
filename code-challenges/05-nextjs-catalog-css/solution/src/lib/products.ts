import products from "@/data/products.json";
import type { Product } from "@/lib/types";

export function getProducts(): Product[] {
  return products as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  return getProducts()
    .filter((p) => p.category === product.category && p.sku !== product.sku)
    .slice(0, limit);
}
