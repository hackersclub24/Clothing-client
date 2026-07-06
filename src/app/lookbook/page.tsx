import Image from "next/image";

const shots = [
  { image: "/images/lookbook-1-C15adsYr.jpg.jpeg", title: "Chapter I", caption: "Morning light, Milan studio." },
  { image: "/images/lookbook-2-DhQuyHOI.jpg.jpeg", title: "Chapter II", caption: "Volume and restraint." },
  { image: "/images/hero-1-Mj2Hbnrp.jpg.jpeg",     title: "Chapter III", caption: "The oversized silhouette." },
  { image: "/images/hero-2-DkoVx-kF.jpg.jpeg",     title: "Chapter IV",  caption: "Structure without effort." },
  { image: "/images/campaign-Bg10tBFF.jpg.jpeg",    title: "Chapter V",  caption: "Worn as intended." },
  { image: "/images/studio-DwVjruef.jpg.jpeg",      title: "Chapter VI", caption: "The atelier, Faridabad." },
];

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-[#f2ede0]">
      {/* ── Header ── */}
      <div className="pt-36 pb-14 px-6 md:px-12 max-w-screen-xl mx-auto text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase text-stone-400 mb-4">
          AW — Twenty-Six
        </p>
        <h1
          className="text-[clamp(3rem,8vw,7rem)] font-light text-stone-900 leading-none tracking-tight italic"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Lookbook
        </h1>
        <p className="text-[13px] text-stone-500 font-light mt-5 max-w-md mx-auto leading-relaxed">
          Twelve pieces. Shot at the Pacific Dust atelier in Faridabad.
          Every silhouette engineered to fall away from the body.
        </p>
      </div>

      {/* ── Masonry-style grid ── */}
      <div className="px-6 md:px-12 max-w-screen-xl mx-auto pb-24">
        <div className="columns-1 md:columns-2 gap-5 space-y-5">
          {shots.map((shot, i) => (
            <div key={i} className="break-inside-avoid relative overflow-hidden group">
              <div className={`relative w-full ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"} bg-stone-100`}>
                <Image
                  src={shot.image}
                  alt={shot.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-black/50">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/70 mb-1">
                    {shot.title}
                  </p>
                  <p className="text-[13px] text-white font-light">
                    {shot.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
