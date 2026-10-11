
import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategorySortClient from "@/components/category/CategorySortClient";

const API_URL = "https://api.api-store.workers.dev/api/bazardor";

async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("পণ্যের তথ্য লোড করা যায়নি");
    }

    const result = await response.json();

    const products = Array.isArray(result)
      ? result
      : result.data || result.products || [];

    return products;
  } catch (error) {
    console.error("Category products error:", error);
    return [];
  }
}

function CategorySkeleton() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10">
      <div className="mb-8 h-8 w-56 animate-pulse rounded bg-gray-200" />

      <div className="mb-8 h-5 w-72 animate-pulse rounded bg-gray-100" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border border-gray-100 p-4"
          >
            <div className="mb-4 h-28 rounded-xl bg-gray-100" />
            <div className="mb-3 h-4 rounded bg-gray-200" />
            <div className="h-5 w-2/3 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </main>
  );
}

async function CategoryContent({ params }) {
  await connection();

  const { slug } = await params;
  const products = await getProducts();

  if (!products.length) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-16 text-center">
        <p className="text-lg font-semibold text-gray-700">
          পণ্যের তথ্য লোড করা যায়নি।
        </p>

        <Link
          href="/"
          className="btn mt-5 bg-emerald-700 text-white hover:bg-emerald-800"
        >
          হোম পেজে ফিরে যাও
        </Link>
      </main>
    );
  }

  const categoryProducts = products.filter(
    (product) =>
      String(product.category || "").toLowerCase() ===
      String(slug).toLowerCase()
  );

  if (!categoryProducts.length) {
    notFound();
  }

  const categoryName =
    categoryProducts[0].categoryNameBn ||
    categoryProducts[0].category ||
    slug;

  const categoryIcon = categoryProducts[0].categoryIcon || "🛒";

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-900"
        >
          <span aria-hidden="true">←</span>
          হোম পেজে ফিরে যাও
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-4xl" aria-hidden="true">
            {categoryIcon}
          </span>

          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {categoryName} এর বাজারদর
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              এই ক্যাটাগরির {categoryProducts.length}টি পণ্য
            </p>
          </div>
        </div>
      </div>

      <CategorySortClient products={categoryProducts} />
    </main>
  );
}

export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
