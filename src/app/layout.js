
import { Suspense } from "react";
import Navbar from "@/components/shared/Navbar";
import PriceMarquee from "@/components/shared/PriceMarquee";
import ToasterProvider from "@/components/shared/ToasterProvider";
import "./globals.css";

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

        <Suspense
          fallback={
            <div className="bg-emerald-700 px-4 py-3 text-white">
              বাজারদর লোড হচ্ছে...
            </div>
          }
        >
          <PriceMarquee />
        </Suspense>

        <main>{children}</main>
      </body>
    </html>
  );
}
