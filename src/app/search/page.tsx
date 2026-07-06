"use client";
import { useState } from "react";
import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import { newArrivals, trending } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

const all = [...newArrivals, ...trending.filter(p => !newArrivals.find(n => n.id === p.id))];
const trending_searches = ["Oversized T-Shirt","Column Trouser","Cashmere Knit","Monolith Overcoat","Ivory"];
const suggestions = [["Outerwear","2 pieces"],["Knitwear","4 pieces"],["Journal · Weight & Drape","4 min read"],["Contact · WhatsApp","Order directly"]];

export default function SearchPage() {
  const [q, setQ] = useState("");
  const results = q ? all.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.category.toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <main className="pt-32 px-6 md:px-10 min-h-screen">
      <p className="eyebrow">Archive · Search</p>
      <div className="mt-6 flex items-center gap-4 border-b border-ink pb-4">
        <SearchIcon size={24} strokeWidth={1.25}/>
        <input autoFocus value={q} onChange={e => setQ(e.target.value)}
          placeholder="Search a piece, a category, a colour…"
          className="flex-1 bg-transparent outline-none font-display text-3xl md:text-6xl placeholder:text-ink-muted/40"/>
        {q && <button onClick={() => setQ("")} className="text-xs uppercase tracking-[0.18em] text-ink-muted link-underline">Clear</button>}
      </div>

      {!q && (
        <div className="grid md:grid-cols-2 gap-16 mt-16">
          <div>
            <p className="eyebrow">Trending searches</p>
            <ul className="mt-6 space-y-4">
              {trending_searches.map(t => (
                <li key={t}><button onClick={() => setQ(t)} className="font-display text-2xl md:text-4xl link-underline italic font-light">{t}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">You may look for</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {suggestions.map(([s,n]) => (
                <li key={s} className="py-5 flex justify-between items-center">
                  <Link href="/shop" className="link-underline text-lg">{s}</Link>
                  <span className="text-xs text-ink-muted">{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {q && (
        <div className="mt-16">
          <p className="text-sm text-ink-muted">{results.length} pieces for <em>"{q}"</em></p>
          {results.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-14">
              {results.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          ) : (
            <p className="mt-20 font-display text-4xl italic font-light">Nothing found in the archive.</p>
          )}
        </div>
      )}
    </main>
  );
}
