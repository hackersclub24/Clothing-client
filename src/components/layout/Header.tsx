"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, User, Heart, ShoppingBag } from "lucide-react";
import { navItems } from "@/data/site";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed left-0 right-0 z-50 transition-[background,box-shadow,border-color] duration-500",
        "top-[var(--announcement-h)]",
        scrolled
          ? "bg-[rgba(245,240,232,0.88)] backdrop-blur-md border-b border-stone-200/60 shadow-[0_1px_24px_rgba(0,0,0,0.05)]"
          : "bg-transparent"
      )}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-14 md:h-[60px]">

          {/* ── Left nav ──────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.06 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "nav-link text-[12px] tracking-wider font-light transition-colors duration-300",
                    scrolled
                      ? "text-stone-600 hover:text-stone-900"
                      : "text-stone-500 hover:text-stone-900"
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* ── Mobile hamburger ──────────────────────────────── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn(
              "md:hidden p-1.5 -ml-1.5 transition-colors",
              scrolled ? "text-stone-800" : "text-stone-700"
            )}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* ── Logo — always centred ─────────────────────────── */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.0 }}
          >
            <Link
              href="/"
              className={cn(
                "text-[14px] tracking-[0.25em] font-light transition-colors duration-300 select-none whitespace-nowrap",
                scrolled ? "text-stone-900" : "text-stone-800"
              )}
            >
              Pacific Dust
            </Link>
          </motion.div>

          {/* ── Right icons ───────────────────────────────────── */}
          <motion.div
            className="flex items-center gap-4 lg:gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            {[
              { Icon: Search, label: "Search",       desktop: true  },
              { Icon: User,   label: "Account",      desktop: true  },
              { Icon: Heart,  label: "Wishlist",     desktop: true  },
            ].map(({ Icon, label, desktop }) => (
              <button
                key={label}
                aria-label={label}
                className={cn(
                  "transition-colors duration-300",
                  desktop && "hidden md:block",
                  scrolled
                    ? "text-stone-600 hover:text-stone-900"
                    : "text-stone-500 hover:text-stone-900"
                )}
              >
                <Icon size={17} strokeWidth={1.5} />
              </button>
            ))}

            {/* Bag with count badge */}
            <button
              aria-label="Shopping bag"
              className={cn(
                "relative transition-colors duration-300",
                scrolled
                  ? "text-stone-600 hover:text-stone-900"
                  : "text-stone-500 hover:text-stone-900"
              )}
            >
              <ShoppingBag size={17} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-2 w-[17px] h-[17px] bg-stone-900 text-white text-[8px] rounded-full flex items-center justify-center leading-none font-medium">
                2
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-nav"
            className="md:hidden bg-[#f5f0e8]/95 backdrop-blur-md border-t border-stone-200/60"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <nav className="px-6 py-7 flex flex-col gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: EASE, delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="nav-link text-[12px] tracking-widest uppercase text-stone-700 hover:text-stone-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
