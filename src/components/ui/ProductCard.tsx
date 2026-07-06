"use client";

import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useQuickAdd } from "@/context/QuickAddContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { open } = useQuickAdd();

  return (
    <article className="group relative flex flex-col">

      {/* ── Image ── */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface product-hover">
        <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-center"
            />
          ) : (
            <div className="w-full h-full bg-surface flex items-center justify-center">
              <span className="eyebrow">{product.category}</span>
            </div>
          )}
        </Link>

        {/* Wishlist icon top-right */}
        <button
          aria-label="Save to wishlist"
          className="absolute top-3 right-3 size-9 grid place-items-center rounded-full bg-background/70 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Quick add — slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={(e) => { e.preventDefault(); open(product); }}
            className="w-full py-3.5 bg-background/90 backdrop-blur-sm hover:bg-ink hover:text-background text-[11px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Plus size={12} strokeWidth={1.5} />
            Quick add
          </button>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="mt-4 flex flex-col gap-1">
        <p className="eyebrow">{product.category}</p>
        <Link
          href={`/products/${product.slug}`}
          className="font-display text-lg mt-1 leading-tight hover:opacity-60 transition-opacity"
        >
          {product.name}
        </Link>
        <p className="text-xs text-ink-muted mt-0.5">{product.colors.join(" · ")}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm">₹{product.price.toLocaleString("en-IN")}</p>
          <button
            onClick={() => open(product)}
            className="text-[10px] tracking-[0.18em] uppercase text-ink-muted hover:text-ink transition-colors link-underline"
          >
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}
