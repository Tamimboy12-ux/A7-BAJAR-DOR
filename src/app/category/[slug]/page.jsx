
import { Suspense } from "react";
import Link from "next/link";
import ProductCard from "@/components/home/ProductCard";

const API_URL = "https://api.api-store.workers.dev/api/bazardor";

async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`, {
      cache: "no-store",
    });

    if (!response.ok) return [];

    const result = await response.json();

    return Array.isArray(result)
      ? result
      : result.data || result.products || [];
  } catch (error) {
    console.error("Category products error:", error);
    return [];
  }
}

function CategorySkeleton() {
  return (
    <main className="mx-auto max-w-6xl animate-pulse px-4 py-10">
      <div className="mb-6 h-8 w-56 rounded bg-gray-200" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="h-52 rounded-2xl bg-gray-200" />
        ))}
      </div>
    </main>
  );
}

async function CategoryContent({ params }) {
  const { slug } = await params;
  const allProducts = await getProducts();

  const products = allProducts.filter(
    (product) => product.category === slug
  );

  if (products.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <p className="text-5xl">🔎</p>
          <h1 className="mt-4 text-2xl font-extrabold text-gray-900">
            পণ্য পাওয়া যায়নি
          </h1>
          <p className="mt-3 text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।
          </p>
          <Link
            href="/"
            className="btn mt-6 border-0 bg-emerald-700 text-white hover:bg-emerald-800"
          >
            হোম পেজে ফিরে যাও
          </Link>
        </div>
      </main>
    );
  }

  const categoryName =
    products[0].categoryNameBn || products[0].category;

  const categoryIcon = products[0].categoryIcon || "🛒";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-700 hover:underline"
        >
          ← হোম
        </Link>

        <div className="mt-5 rounded-3xl border border-emerald-100 bg-white p-6 sm:p-8">
          <p className="text-sm font-semibold text-emerald-700">
            CATEGORY
          </p>
          <h1 className="mt-2 flex items-center gap-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            <span>{categoryIcon}</span>
            {categoryName}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            এই ক্যাটাগরির {products.length.toLocaleString("bn-BD")}টি পণ্যের বাজারদর
          </p>
        </div>

        <div className="mb-5 mt-8 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-extrabold text-gray-900">
            পণ্যের তালিকা
          </h2>
          <CategorySort products={products} />
        </div>

        <div id="category-products">
          <ProductGrid products={products} />
        </div>
      </div>
    </main>
  );
}

function ProductGrid({ products }) {
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

function CategorySort({ products }) {
  // Sort করার জন্য client component ব্যবহার করা হয়েছে।
  return <CategorySortClient products={products} />;
}

import CategorySortClient from "@/components/category/CategorySortClient";

export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
