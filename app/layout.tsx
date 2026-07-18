import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import QueryProvider from "@/components/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aurora Heights | Ultra-Luxury Residences & Penthouses",
  description: "Experience the pinnacle of sophisticated living. Aurora Heights offers architecturally masterminded modern villas, private cliffside infinity pools, and panoramic views.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-[#111111]">
        <LenisProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </LenisProvider>
      </body>
    </html>
  );
}


