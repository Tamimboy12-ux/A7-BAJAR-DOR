import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import ProductsSection from "@/components/home/ProductsSection";

function ProductsSkeleton() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12">
        {[1, 2, 3].map((section) => (
          <section key={section}>
            <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-52 animate-pulse rounded-2xl bg-gray-200"
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsSection />
      </Suspense>
    </main>
  );
}