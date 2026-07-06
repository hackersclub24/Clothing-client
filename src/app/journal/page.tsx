import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    slug: "on-fabric-weight",
    title: "On Fabric Weight",
    subtitle: "Why 320 gsm changes everything.",
    date: "July 2026",
    readTime: "4 min",
    image: "/images/studio-DwVjruef.jpg.jpeg",
    category: "Materials",
  },
  {
    slug: "the-oversized-silhouette",
    title: "The Oversized Silhouette",
    subtitle: "A study in drape, proportion and presence.",
    date: "June 2026",
    readTime: "6 min",
    image: "/images/hero-1-Mj2Hbnrp.jpg.jpeg",
    category: "Design",
  },
  {
    slug: "made-in-india",
    title: "Made in India",
    subtitle: "Quiet luxury, crafted in Faridabad.",
    date: "May 2026",
    readTime: "5 min",
    image: "/images/campaign-Bg10tBFF.jpg.jpeg",
    category: "The House",
  },
  {
    slug: "the-neutral-palette",
    title: "The Neutral Palette",
    subtitle: "Ivory, stone, bone — a considered restraint.",
    date: "April 2026",
    readTime: "3 min",
    image: "/images/lookbook-1-C15adsYr.jpg.jpeg",
    category: "Colour",
  },
];

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#f2ede0]">
      {/* ── Header ── */}
      <div className="pt-36 pb-14 px-6 md:px-12 max-w-screen-xl mx-auto">
        <p className="text-[10px] tracking-[0.35em] uppercase text-stone-400 mb-3">
          Pacific Dust
        </p>
        <h1
          className="text-[clamp(2.5rem,6vw,5rem)] font-light text-stone-900 leading-none tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Journal
        </h1>
        <div className="w-12 h-px bg-stone-300 mt-6" />
      </div>

      {/* ── Featured post ── */}
      <section className="px-6 md:px-12 max-w-screen-xl mx-auto mb-16">
        <Link href={`/journal/${posts[0].slug}`} className="group block md:grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 mb-8 md:mb-0">
            <Image
              src={posts[0].image}
              alt={posts[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
              {posts[0].category}
            </p>
            <h2
              className="text-[clamp(1.8rem,4vw,3.5rem)] font-light text-stone-900 leading-tight tracking-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {posts[0].title}
            </h2>
            <p className="text-[13px] text-stone-500 font-light leading-relaxed mb-6">
              {posts[0].subtitle}
            </p>
            <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-stone-400">
              <span>{posts[0].date}</span>
              <span className="w-4 h-px bg-stone-300" />
              <span>{posts[0].readTime} read</span>
            </div>
          </div>
        </Link>
      </section>

      {/* ── Rest of posts ── */}
      <section className="px-6 md:px-12 max-w-screen-xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.slice(1).map((post) => (
            <Link key={post.slug} href={`/journal/${post.slug}`} className="group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 mb-5">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A84C] mb-2">
                {post.category}
              </p>
              <h3
                className="text-[1.2rem] font-light text-stone-900 leading-tight mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {post.title}
              </h3>
              <p className="text-[12px] text-stone-500 font-light leading-relaxed flex-1">
                {post.subtitle}
              </p>
              <div className="flex items-center gap-3 text-[9px] tracking-[0.2em] uppercase text-stone-400 mt-4">
                <span>{post.date}</span>
                <span className="w-3 h-px bg-stone-300" />
                <span>{post.readTime} read</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
