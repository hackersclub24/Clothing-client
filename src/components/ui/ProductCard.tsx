"use client";

import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded]       = useState(false);
  const [size, setSize]         = useState("M");
  const [showSizes, setShowSizes] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, size, product.colors[0] ?? "Default");
    setAdded(true);
    setShowSizes(false);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="group relative flex flex-col">
      {/* ── Image ───────────────────────────────────────────── */}
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
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full bg-stone-100 flex items-center justify-center">
            <span className="text-[10px] tracking-widest uppercase text-stone-400">
              {product.category}
            </span>
          </div>
        )}

        {/* ── Quick add overlay ─────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-white">
          {/* Size picker — shows when hovering */}
          {showSizes && !added && (
            <div className="flex border-b border-stone-100">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={(e) => { e.preventDefault(); setSize(s); }}
                  className={`flex-1 py-2 text-[9px] tracking-[0.2em] uppercase transition-colors ${
                    size === s
                      ? "bg-stone-900 text-white"
                      : "text-stone-500 hover:bg-stone-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={showSizes ? handleAdd : (e) => { e.preventDefault(); setShowSizes(true); }}
            className={`w-full py-3.5 text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 transition-colors ${
              added
                ? "bg-stone-900 text-white"
                : "text-stone-900 hover:bg-stone-900 hover:text-white"
            }`}
          >
            {added ? (
              <><Check size={12} strokeWidth={2} /> Added</>
            ) : showSizes ? (
              <><Plus size={12} strokeWidth={1.5} /> Add — Size {size}</>
            ) : (
              <><Plus size={12} strokeWidth={1.5} /> Quick add</>
            )}
          </button>
        </div>
      </Link>

      {/* ── Info ─────────────────────────────────────────────── */}
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
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-[13px] text-stone-900">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
          {/* Direct add to bag button below the card */}
          <button
            onClick={(e) => { e.preventDefault(); addItem(product, size); setAdded(true); setTimeout(() => setAdded(false), 2000); }}
            className="text-[9px] tracking-[0.2em] uppercase text-stone-400 hover:text-stone-900 transition-colors"
          >
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
