import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { getProductBySlug, relatedProducts } from "@/lib/products";
import { productImage } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = relatedProducts(product);

  return (
    <div className="wrap">
      <div className="detail">
        <div className="detail-media" style={{ position: "relative" }}>
          <Image src={productImage(product.imageSeed)} alt={product.name} fill sizes="50vw" priority />
        </div>
        <div>
          <span className="badge">{product.category}</span>
          <h1 style={{ fontFamily: "var(--font-display)" }}>{product.name}</h1>
          <p className="price" style={{ fontSize: "1.4rem" }}>
            ${product.price}
          </p>
          <p>{product.description}</p>
          <AddToCartButton sku={product.sku} name={product.name} price={product.price} />
        </div>
      </div>

      <h2 style={{ fontFamily: "var(--font-display)", marginTop: "3rem" }}>Related</h2>
      <div className="grid">
        {related.map((p) => (
          <article key={p.sku} className="card">
            <Link href={`/catalog/${p.slug}`}>
              <div className="card-media">
                <Image src={productImage(p.imageSeed)} alt={p.name} fill sizes="25vw" />
              </div>
              <div className="card-body">
                <h3 style={{ margin: 0 }}>{p.name}</h3>
                <p className="price">${p.price}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
