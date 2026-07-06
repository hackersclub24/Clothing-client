import { newArrivals, trending, bestSellers } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

const categories = ["All", "Knitwear", "Outerwear", "Trousers", "Accessories"];

const allProducts = [
  ...newArrivals,
  ...trending.filter((p) => !newArrivals.find((n) => n.id === p.id)),
  ...bestSellers.filter(
    (p) =>
      !newArrivals.find((n) => n.id === p.id) &&
      !trending.find((t) => t.id === p.id)
  ),
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#f2ede0]">
      {/* ── Header ── */}
      <div className="pt-36 pb-10 px-6 md:px-12 max-w-screen-xl mx-auto border-b border-stone-200/60">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-stone-400 mb-2">
              Pacific Dust
            </p>
            <h1
              className="text-[clamp(2rem,5vw,4rem)] font-light text-stone-900 leading-none tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Shop
            </h1>
          </div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-stone-400 pb-2">
            {allProducts.length} Pieces
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-6 mt-8 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`text-[10px] tracking-[0.25em] uppercase shrink-0 pb-2 border-b transition-colors ${
                cat === "All"
                  ? "border-stone-900 text-stone-900"
                  : "border-transparent text-stone-400 hover:text-stone-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="px-6 md:px-12 max-w-screen-xl mx-auto py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
