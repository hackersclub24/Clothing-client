import Image from "next/image";
import Link from "next/link";
import { newArrivals, bestSellers } from "@/data/products";

const collections = [
  {
    title: "Autumn / Winter 26",
    subtitle: "Twelve pieces. Stone, charcoal, bone.",
    image: "/images/hero-1-Mj2Hbnrp.jpg.jpeg",
    href: "/collections/aw26",
    count: "12 Pieces",
  },
  {
    title: "Lookbook I",
    subtitle: "The first chapter. Light and structure.",
    image: "/images/lookbook-1-C15adsYr.jpg.jpeg",
    href: "/collections/lookbook-i",
    count: "8 Pieces",
  },
  {
    title: "Lookbook II",
    subtitle: "Volume and restraint in equal measure.",
    image: "/images/lookbook-2-DhQuyHOI.jpg.jpeg",
    href: "/collections/lookbook-ii",
    count: "10 Pieces",
  },
  {
    title: "Campaign",
    subtitle: "Worn as intended. Shot at the atelier.",
    image: "/images/campaign-Bg10tBFF.jpg.jpeg",
    href: "/collections/campaign",
    count: "6 Pieces",
  },
];

const allProducts = [
  ...newArrivals,
  ...bestSellers.filter((p) => !newArrivals.find((n) => n.id === p.id)),
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#f2ede0]">
      {/* ── Page header ── */}
      <div className="pt-36 pb-12 px-6 md:px-12 max-w-screen-xl mx-auto">
        <p className="text-[10px] tracking-[0.35em] uppercase text-stone-400 mb-3">
          Pacific Dust
        </p>
        <h1
          className="text-[clamp(2.5rem,6vw,5rem)] font-light text-stone-900 leading-none tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Collections
        </h1>
        <div className="w-12 h-px bg-stone-300 mt-6" />
      </div>

      {/* ── Collection grid ── */}
      <section className="px-6 md:px-12 max-w-screen-xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((col) => (
            <Link
              key={col.title}
              href={col.href}
              className="group relative overflow-hidden aspect-[4/3] block bg-stone-100"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-[9px] tracking-[0.3em] uppercase text-white/70 mb-2">
                  {col.count}
                </p>
                <h2 className="text-[1.6rem] font-light text-white leading-tight tracking-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}>
                  {col.title}
                </h2>
                <p className="text-[12px] text-white/70 font-light mt-1">
                  {col.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── All products ── */}
      <section className="px-6 md:px-12 max-w-screen-xl mx-auto pb-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[11px] tracking-[0.3em] uppercase text-stone-500">
            All Pieces — {allProducts.length} Items
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-3.5">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400">
                {product.category}
              </p>
              <p className="text-[13px] text-stone-900 mt-1">{product.name}</p>
              <p className="text-[12px] text-stone-400 mt-0.5">
                {product.colors.join(" · ")}
              </p>
              <p className="text-[13px] text-stone-900 mt-1.5">
                ₹{product.price.toLocaleString("en-IN")}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
