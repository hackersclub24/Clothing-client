import Link from "next/link";

const cols = [
  { title:"Shop",  links:[["/shop","All pieces"],["/category/outerwear","Outerwear"],["/category/knitwear","Knitwear"],["/category/trousers","Trousers"],["/collections","Collections"]] },
  { title:"House", links:[["/about","Our Story"],["/lookbook","Lookbook"],["/journal","Journal"],["/contact","Contact"],["/faq","FAQ"]] },
  { title:"Care",  links:[["/faq","Shipping"],["/faq","Returns"],["/faq","Size Guide"],["/contact","WhatsApp"],["/account","Account"]] },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-background/85 mt-32">
      <div className="px-6 md:px-10 pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-background/50">Est. Faridabad 2024</p>
            <h2 className="font-display text-5xl md:text-7xl mt-6 leading-[0.9]">Pacific<br/>Dust.</h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-background/70">
              A quiet house of clothing — made in Faridabad, India. Cut from natural fibres, considered like architecture, worn like a memory. Delivering across Delhi NCR.
            </p>
            <form className="mt-10 max-w-md">
              <label className="eyebrow text-background/50">Newsletter</label>
              <div className="mt-3 flex items-center border-b border-background/20 pb-2">
                <input type="email" placeholder="your@address.com" className="flex-1 bg-transparent outline-none text-sm placeholder:text-background/40 py-2"/>
                <button className="text-[11px] tracking-[0.22em] uppercase hover:text-white">Subscribe →</button>
              </div>
            </form>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="md:col-span-2">
              <p className="eyebrow text-background/50">{c.title}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {c.links.map(([to, label]) => (
                  <li key={label}>
                    <Link href={to} className="link-underline text-background/80 hover:text-background">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <p className="eyebrow text-background/50">Social</p>
            <ul className="mt-6 space-y-3 text-sm text-background/80">
              <li>
                <a
                  href="https://www.instagram.com/pacific_dust_?igsh=MXdseDRuZHNsZGVnbA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-background/80 hover:text-background"
                >
                  Instagram
                </a>
              </li>
              <li>WhatsApp</li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-background/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] tracking-[0.18em] uppercase text-background/50">
          <div>© 2026 Pacific Dust — All rights reserved</div>
          <div className="flex gap-8">
            <span>Privacy</span><span>Terms</span><span>Made in India</span>
          </div>
        </div>

        <div aria-hidden className="mt-16 font-display text-[18vw] leading-[0.8] tracking-[-0.05em] text-background/[0.06] select-none">
          PACIFIC DUST
        </div>
      </div>
    </footer>
  );
}
