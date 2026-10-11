
import { connection } from "next/server";
import ProductCard from "@/components/home/ProductCard";

const API_URL = "https://api.api-store.workers.dev/api/bazardor";

async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Products API request failed:", response.status);
      return [];
    }

    const result = await response.json();

    const products = Array.isArray(result)
      ? result
      : result.data || result.products || [];

    return Array.isArray(products) ? products : [];
  } catch (error) {
    console.error("Products fetch error:", error);
    return [];
  }
}

function ProductGrid({ products, emptyMessage }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-10 text-center">
        <p className="text-sm text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard
          key={product.id || product.slug || index}
          product={product}
        />
      ))}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, icon }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="mb-1 text-sm font-semibold text-emerald-700">
          {eyebrow}
        </p>

        <h2 className="flex items-center gap-2 text-xl font-extrabold text-gray-900 sm:text-2xl">
          <span aria-hidden="true">{icon}</span>
          {title}
        </h2>

        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default async function ProductsSection() {
  // Next.js-কে জানানো হচ্ছে যে এই অংশটি request-এর সময় render হবে।
  await connection();

  const products = await getProducts();

  // যেসব পণ্যের দাম বেড়েছে
  const risers = products
    .filter((product) => product.change?.dir === "up")
    .sort(
      (a, b) =>
        Number(b.change?.pct || 0) -
        Number(a.change?.pct || 0)
    );

  // যেসব পণ্যের দাম কমেছে
  const fallers = products
    .filter((product) => product.change?.dir === "down")
    .sort(
      (a, b) =>
        Number(a.change?.pct || 0) -
        Number(b.change?.pct || 0)
    );

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:space-y-16 sm:py-14">
        {/* ১. দাম বেড়েছে */}
        <section>
          <SectionHeading
            eyebrow="PRICE INCREASE"
            title="দাম বেড়েছে"
            description="যেসব পণ্যের দাম আগের তুলনায় বেড়েছে"
            icon="📈"
          />

          <ProductGrid
            products={risers}
            emptyMessage="এই মুহূর্তে দাম বেড়েছে এমন কোনো পণ্যের তথ্য পাওয়া যায়নি।"
          />
        </section>

        {/* ২. দাম কমেছে */}
        <section>
          <SectionHeading
            eyebrow="PRICE DECREASE"
            title="দাম কমেছে"
            description="যেসব পণ্যের দাম আগের তুলনায় কমেছে"
            icon="📉"
          />

          <ProductGrid
            products={fallers}
            emptyMessage="এই মুহূর্তে দাম কমেছে এমন কোনো পণ্যের তথ্য পাওয়া যায়নি।"
          />
        </section>

        {/* ৩. সব পণ্য */}
        <section id="সব-পণ্য" className="scroll-mt-40">
          <SectionHeading
            eyebrow="ALL PRODUCTS"
            title="সব পণ্যের বাজারদর"
            description="প্রয়োজনীয় পণ্যের বর্তমান বাজারদর এক নজরে দেখুন"
            icon="🛒"
          />

          <ProductGrid
            products={products}
            emptyMessage="পণ্যের তথ্য লোড করা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করো।"
          />
        </section>
      </div>
    </div>
  );
}