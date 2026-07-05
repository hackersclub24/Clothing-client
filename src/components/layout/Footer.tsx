import Link from "next/link";
import { footerLinks } from "@/data/site";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400">
      {/* Top grid */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <p className="text-[12px] tracking-[0.35em] uppercase text-stone-100 mb-4">
              Pacific Dust
            </p>
            <p className="text-[13px] leading-relaxed text-stone-500 max-w-xs">
              Fewer garments, made more slowly. A wardrobe built with air, weight
              and time.
            </p>
            <p className="text-[11px] tracking-widest uppercase text-stone-600 mt-6">
              Since 2019
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-[10px] tracking-widest uppercase text-stone-500 mb-5">
                {heading}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-stone-400 hover:text-stone-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-stone-600 tracking-wide">
            © {new Date().getFullYear()} Pacific Dust. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[11px] text-stone-600 hover:text-stone-400 transition-colors tracking-wide"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[11px] text-stone-600 hover:text-stone-400 transition-colors tracking-wide"
            >
              Terms
            </Link>
            <a
              href="https://instagram.com/pacific.dust"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-stone-500 hover:text-stone-200 transition-colors"
            >
              <InstagramIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
