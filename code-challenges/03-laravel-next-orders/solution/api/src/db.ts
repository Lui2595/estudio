export type User = { id: number; name: string; email: string; password: string };
export type Customer = { id: number; name: string; email: string };
export type Product = { id: number; name: string; sku: string; price: number; stock: number };
export type OrderItem = {
  product_id: number;
  quantity: number;
  unit_price: number;
  product_name: string;
};
export type Order = {
  id: number;
  customer_id: number;
  status: "pending" | "paid" | "shipped" | "cancelled";
  total: number;
  created_at: string;
  items: OrderItem[];
};

export const db = {
  users: [] as User[],
  customers: [] as Customer[],
  products: [] as Product[],
  orders: [] as Order[],
};

export function seed() {
  if (db.users.length) return;
  db.users.push({ id: 1, name: "Admin", email: "admin@orders.test", password: "Password1!" });
  db.customers.push(
    { id: 1, name: "Acme Corp", email: "billing@acme.test" },
    { id: 2, name: "Globex", email: "ap@globex.test" },
  );
  db.products.push(
    { id: 1, name: "Laptop Pro", sku: "LAP-PRO", price: 24999, stock: 10 },
    { id: 2, name: "USB-C Hub", sku: "HUB-USBC", price: 799, stock: 50 },
    { id: 3, name: "Monitor 27", sku: "MON-27", price: 5999, stock: 8 },
  );
}
