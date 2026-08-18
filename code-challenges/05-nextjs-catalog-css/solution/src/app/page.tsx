import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero" aria-label="Hero">
      <p className="hero-brand">Atelier North</p>
      <h1>Objects made for quieter rooms</h1>
      <p>Furniture and lighting with lasting materials — browse the full catalog.</p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <Link className="btn btn-primary" href="/catalog">
          Shop catalog
        </Link>
        <Link className="btn btn-ghost" href="/catalog?category=lighting">
          View lighting
        </Link>
      </div>
    </section>
  );
}
