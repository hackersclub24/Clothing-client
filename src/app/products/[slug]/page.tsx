"use client";

import { newArrivals, trending } from "@/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, MessageCircle } from "lucide-react";

const allProducts = [
  ...newArrivals,
  ...trending.filter((p) => !newArrivals.find((n) => n.id === p.id)),
];

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = allProducts.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const { addItem, openCart } = useCart();
  const [size, setSize]   = useState("M");
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty]     = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product, size, color);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2500);
  };

  const whatsapp = `https://wa.me/918595818638?text=${encodeURIComponent(
    `Hello Pacific Dust! I'd like to order:\n\n• ${product.name} (${color}, Size: ${size}) × ${qty}\n\nPrice: ₹${(product.price * qty).toLocaleString("en-IN")}\n\nPlease confirm availability. Delivery: Delhi NCR / Faridabad`
  )}`;

  return (
    <div className="min-h-screen bg-[#f2ede0] pt-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

          {/* Image */}
          <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
            {product.image && (
              <Image src={product.image} alt={product.name} fill className="object-cover" priority />
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-3">
              {product.category}
            </p>
            <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-light text-stone-900 leading-tight tracking-tight mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}>
              {product.name}
            </h1>
            <p className="text-[1.4rem] text-stone-800 font-light mb-8">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            {/* Color */}
            <div className="mb-6">
              <p className="text-[9px] tracking-[0.3em] uppercase text-stone-500 mb-3">
                Colour — <span className="text-stone-800">{color}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)}
                    className={`px-4 py-1.5 text-[10px] tracking-[0.15em] uppercase border transition-colors ${
                      color === c ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300 text-stone-500 hover:border-stone-600"
                    }`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <p className="text-[9px] tracking-[0.3em] uppercase text-stone-500 mb-3">
                Size — <span className="text-stone-800">{size}</span>
              </p>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`w-10 h-10 text-[10px] tracking-[0.1em] border transition-colors ${
                      size === s ? "border-stone-900 bg-stone-900 text-white" : "border-stone-300 text-stone-500 hover:border-stone-600"
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="flex items-center gap-4 mb-8">
              <p className="text-[9px] tracking-[0.3em] uppercase text-stone-500">Qty</p>
              <div className="flex items-center gap-3 border border-stone-300 px-3 py-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-stone-500 hover:text-stone-900">
                  <Minus size={12} />
                </button>
                <span className="text-[13px] w-5 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="text-stone-500 hover:text-stone-900">
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <button onClick={handleAdd}
                className={`w-full py-4 text-[11px] tracking-[0.25em] uppercase transition-colors ${
                  added ? "bg-stone-700 text-white" : "bg-stone-900 text-white hover:bg-stone-700"
                }`}>
                {added ? "Added to Bag ✓" : "Add to Bag"}
              </button>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer"
                className="w-full py-4 text-[11px] tracking-[0.25em] uppercase bg-[#25D366] hover:bg-[#20b858] text-white transition-colors flex items-center justify-center gap-2">
                <MessageCircle size={14} />
                Buy via WhatsApp
              </a>
            </div>

            {/* Meta */}
            <div className="mt-10 pt-8 border-t border-stone-200 grid grid-cols-2 gap-6">
              {[
                { label: "Material", value: "320 gsm brushed cotton" },
                { label: "Made in", value: "Faridabad, India" },
                { label: "Delivery", value: "Delhi NCR · Faridabad" },
                { label: "Returns", value: "15 days, free pickup" },
              ].map((m) => (
                <div key={m.label}>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-stone-400 mb-1">{m.label}</p>
                  <p className="text-[12px] text-stone-700 font-light">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
