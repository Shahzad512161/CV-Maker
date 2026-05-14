import type { Metadata } from "next";
import { Inter, Dancing_Script, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";

const inter = Inter({ subsets: ["latin"] });
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: '--font-dancing',
  weight: ['400', '700'],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
});

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// ... existing imports

export const metadata: Metadata = {
  title: "CV Maker - Free Online Resume Builder",
  description: "Build a job-winning resume for free. No hidden fees.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dancingScript.variable} ${playfair.variable}`}>
        <ClientProviders>
          <Header />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
