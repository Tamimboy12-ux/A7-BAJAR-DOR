
import { Suspense } from "react";
import Navbar from "@/components/shared/Navbar";
import PriceMarqueeWrapper from "@/components/shared/PriceMarqueeWrapper";
import ToasterProvider from "@/components/shared/ToasterProvider";
import "./globals.css";
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: "বাজার দর",
  description: "প্রতিদিনের বাজারদর জানুন সহজেই।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <ToasterProvider />

        <Suspense
          fallback={
            <header className="border-b bg-white px-4 py-5">
              <p className="font-bold text-emerald-700">
                বাজার দর
              </p>
            </header>
          }
        >
          <Navbar />
        </Suspense>

        <Suspense fallback={null}>
          <PriceMarqueeWrapper />
        </Suspense>

        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
