import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f2ede0]">
      {/* ── Hero ── */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src="/images/studio-DwVjruef.jpg.jpeg"
          alt="Pacific Dust atelier"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-12 left-6 md:left-12">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/70 mb-3">
            The House
          </p>
          <h1
            className="text-[clamp(3rem,7vw,6rem)] font-light text-white leading-none tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            About
          </h1>
        </div>
      </div>

      {/* ── Philosophy ── */}
      <section className="max-w-2xl mx-auto px-6 py-24">
        <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A84C] mb-6">
          Our Philosophy
        </p>
        <h2
          className="text-[clamp(1.8rem,4vw,3rem)] font-light text-stone-900 leading-tight mb-8"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Fewer garments, made more slowly.
        </h2>
        <div className="space-y-5 text-[14px] text-stone-600 font-light leading-[1.9]">
          <p>
            Pacific Dust was founded in Faridabad with a single conviction — that
            the most considered wardrobe is also the smallest one. We make
            garments that last, cut from materials that improve with time.
          </p>
          <p>
            Every piece is designed to fall away from the body. Nothing fitted.
            Nothing loud. Each silhouette is studied in weight, drape and presence
            before a single metre of cloth is cut.
          </p>
          <p>
            We deliver exclusively across Delhi NCR and Faridabad — not because
            we can't go further, but because we believe in knowing exactly where
            our clothes end up.
          </p>
        </div>
      </section>

      {/* ── Two column detail ── */}
      <section className="max-w-screen-xl mx-auto px-6 md:px-12 pb-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
          <Image
            src="/images/lookbook-2-DhQuyHOI.jpg.jpeg"
            alt="Pacific Dust craftsmanship"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-10">
          {[
            {
              label: "Made in India",
              text: "Every piece is crafted in our Faridabad atelier by a small team of specialist cutters and sewers who have worked with us since the beginning.",
            },
            {
              label: "Materials",
              text: "We use 280–340 gsm brushed cotton, Japanese denim, and Italian wool sourced from mills we have visited personally.",
            },
            {
              label: "Delivery",
              text: "We deliver to Delhi, Noida, Gurgaon, Faridabad and Ghaziabad. Order via WhatsApp — we confirm every order personally.",
            },
            {
              label: "Returns",
              text: "Free returns within 15 days. No questions asked. We collect from your door.",
            },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#C9A84C] mb-2">
                {item.label}
              </p>
              <p className="text-[13px] text-stone-600 font-light leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
