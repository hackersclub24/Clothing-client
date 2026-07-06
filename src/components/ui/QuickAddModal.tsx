"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Check, Ruler, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

const SIZES = ["XS", "S", "M", "L", "XL"];
const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function QuickAddModal({ product, onClose }: Props) {
  const { addItem, openCart } = useCart();
  const [size,  setSize]  = useState("M");
  const [color, setColor] = useState("");
  const [qty,   setQty]   = useState(1);
  const [added, setAdded] = useState(false);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSize("M");
      setColor(product.colors[0] ?? "");
      setQty(1);
      setAdded(false);
    }
  }, [product]);

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  const handleAdd = () => {
    if (!product) return;
    for (let i = 0; i < qty; i++) addItem(product, size, color);
    setAdded(true);
    // Show ✓ for 1.2s then reset — modal stays open so user can add more
    setTimeout(() => setAdded(false), 1200);
  };

  const wa = product
    ? `https://wa.me/918595818638?text=${encodeURIComponent(
        `Hi Pacific Dust! I'd like to order:\n\n• ${product.name} (${color}, Size: ${size}) × ${qty}\n\nPrice: ₹${(product.price * qty).toLocaleString("en-IN")}\n\nDelivery: Delhi NCR / Faridabad`
      )}`
    : "#";

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/25 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal panel — slides up from bottom on mobile, centred on desktop */}
          <motion.div
            className="fixed z-[110] bg-background shadow-2xl
              bottom-0 left-0 right-0 rounded-t-2xl
              md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
              md:rounded-sm md:w-[820px] md:max-h-[90vh] overflow-y-auto"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0,    opacity: 1 }}
            exit={{   y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ maxHeight: "92vh" }}
            // On desktop, override the slide-up with a scale-in
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 size-9 rounded-full bg-surface grid place-items-center hover:bg-line transition-colors"
              aria-label="Close"
            >
              <X size={16} strokeWidth={1.5} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* ── Image ── */}
              <div className="relative aspect-[4/5] bg-surface">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 410px"
                    priority
                  />
                )}
                {/* View full detail link */}
                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-5 py-2 text-[10px] tracking-[0.22em] uppercase hover:bg-background transition-colors rounded-sm whitespace-nowrap"
                >
                  View full details →
                </Link>
              </div>

              {/* ── Details ── */}
              <div className="p-7 md:p-10 flex flex-col">
                {/* Category + name */}
                <div>
                  <p className="eyebrow">{product.category} · Collection Brume</p>
                  <h2 className="font-display text-3xl md:text-4xl mt-3 leading-[0.95]">
                    {product.name}
                  </h2>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-xl font-light">₹{product.price.toLocaleString("en-IN")}</span>
                    <span className="text-xs text-ink-muted">incl. taxes · free delivery</span>
                  </div>
                </div>

                {/* Colour */}
                <div className="mt-7">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] mb-3">
                    <span>Colour</span>
                    <span className="text-ink-muted normal-case tracking-normal">{color}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map(c => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`px-4 py-2 border text-xs rounded-sm transition-all
                          ${color === c
                            ? "border-ink bg-ink text-background"
                            : "border-line hover:border-ink"
                          }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] mb-3">
                    <span>Size</span>
                    <button className="normal-case tracking-normal text-ink-muted flex items-center gap-1 link-underline text-xs">
                      <Ruler size={11} /> Size guide
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {SIZES.map(s => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`py-3 border text-sm transition-all
                          ${size === s
                            ? "border-ink bg-ink text-background"
                            : "border-line hover:border-ink"
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Qty */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-xs uppercase tracking-[0.18em]">Qty</span>
                  <div className="flex items-center border border-line rounded-full">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="size-9 grid place-items-center text-ink-muted hover:text-ink">
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="size-9 grid place-items-center text-ink-muted hover:text-ink">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-auto pt-8 flex flex-col gap-3">
                  {/* Add to bag — stays open after adding */}
                  <button
                    onClick={handleAdd}
                    className={`w-full py-4 text-[12px] tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 transition-all duration-300
                      ${added
                        ? "bg-green-600 text-white scale-[0.98]"
                        : "bg-ink text-background hover:opacity-80"
                      }`}
                  >
                    {added
                      ? <><Check size={14} /> Added — keep shopping</>
                      : "Add to bag"
                    }
                  </button>

                  {/* View bag — always visible once something is in cart */}
                  <button
                    onClick={() => { onClose(); openCart(); }}
                    className="w-full py-3.5 text-[11px] tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 border border-line hover:border-ink transition-colors"
                  >
                    View bag & checkout
                  </button>

                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 text-[11px] tracking-[0.2em] uppercase rounded-sm flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white transition-colors"
                  >
                    <MessageCircle size={13} /> Order via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
