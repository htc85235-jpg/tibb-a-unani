import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${site.name} — ${site.sub}`, template: `%s | ${site.name}` },
  description:
    "Tibb-a-Unani — pure herbal & Unani remedies prepared the classical way. 100% natural, lab tested, cash on delivery all over Pakistan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <StoreProvider>
          <div className="flex min-h-screen flex-col">
            <AnnouncementBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <WhatsAppFloat />
        </StoreProvider>
        {/* tawk.to live chat — owner property 6ab35448cc78583443ace3b4, widget 1k3682fh9
            (tawk.to account on owner's Gmail tibbaunani@gmail.com). This is tawk's OFFICIAL
            async embed snippet rendered directly into the static HTML <head> (React 19
            hoists async scripts): the browser starts downloading + executing tawk at
            first paint, in parallel with the page's own JS — not after hydration like
            next/script did. The widget itself is untouched: 100% real tawk, any change
            the owner makes in his tawk.to account still applies automatically. */}
        <link rel="preconnect" href="https://embed.tawk.to" />
        <link rel="preconnect" href="https://va.tawk.to" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://embed.tawk.to" />
        <script async src="https://embed.tawk.to/6ab35448cc78583443ace3b4/1k3682fh9" />
      </body>
    </html>
  );
}
