import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative flex flex-col">
      {/* ── Image ───────────────────────────────────────────────── */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[3/4] overflow-hidden bg-stone-100"
        aria-label={`View ${product.name}`}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
          />
        ) : (
          <div className="w-full h-full bg-stone-100 flex items-center justify-center">
            <span className="text-[10px] tracking-widest uppercase text-stone-400">
              {product.category}
            </span>
          </div>
        )}

        {/* Quick add — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            className="w-full py-3.5 text-[10px] tracking-[0.2em] uppercase text-stone-900 flex items-center justify-center gap-2 hover:bg-stone-900 hover:text-white transition-colors"
            aria-label={`Quick add ${product.name}`}
          >
            <Plus size={12} strokeWidth={1.5} />
            Quick add
          </button>
        </div>
      </Link>

      {/* ── Info ────────────────────────────────────────────────── */}
      <div className="mt-3.5 flex flex-col gap-0.5">
        <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400">
          {product.category}
        </p>
        <Link
          href={`/products/${product.slug}`}
          className="text-[13px] text-stone-900 hover:text-stone-500 transition-colors mt-1"
        >
          {product.name}
        </Link>
        <p className="text-[12px] text-stone-400 tracking-wide">
          {product.colors.join(" · ")}
        </p>
        <p className="text-[13px] text-stone-900 mt-1.5">
          {product.currency}
          {product.price.toLocaleString()}
        </p>
      </div>
    </article>
  );
}
