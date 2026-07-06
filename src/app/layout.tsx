import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/ui/CartDrawer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Pacific Dust — Quiet Luxury, Architecturally Cut",
  description:
    "Fewer garments, made more slowly. Crafted in India for Delhi NCR & Faridabad.",
  openGraph: {
    title: "Pacific Dust — Quiet Luxury, Architecturally Cut",
    description:
      "Fewer garments, made more slowly. Crafted in India for Delhi NCR & Faridabad.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f2ede0] text-stone-900">
        <Script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
          strategy="afterInteractive"
        />
        {/* CartProvider wraps everything so all components access cart state */}
        <CartProvider>
          <div className="sticky top-0 z-[60]">
            <AnnouncementBar />
          </div>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* Cart drawer renders at root level — above everything */}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
