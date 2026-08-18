export type Product = {
  sku: string;
  slug: string;
  name: string;
  category: "furniture" | "lighting" | "decor" | string;
  price: number;
  description: string;
  imageSeed: string;
};

export type CartItem = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

export function productImage(seed: string): string {
  return `https://picsum.photos/seed/${seed}/600/600`;
}
