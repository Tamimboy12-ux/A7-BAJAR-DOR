
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = "https://api.api-store.workers.dev/api/bazardor";

async function getProduct(slug) {
  try {
    const response = await fetch(`${API_URL}/products`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Product API error:", response.status);
      return null;
    }

    const result = await response.json();

    const products = Array.isArray(result)
      ? result
      : result.data || result.products || [];

    return products.find((product) => product.slug === slug) || null;
  } catch (error) {
    console.error("Product fetch error:", error);
    return null;
  }
}

function formatPrice(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(value);

  if (!Number.isFinite(number)) return "—";

  return number.toLocaleString("bn-BD");
}

function PriceSummary({ title, value, color }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`mt-2 text-xl font-extrabold ${color}`}>
        ৳{formatPrice(value)}
      </p>
    </div>
  );
}

function ProductDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-5xl animate-pulse space-y-6">
        <div className="h-5 w-48 rounded bg-gray-200" />
        <div className="h-64 rounded-3xl bg-gray-200" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 rounded-2xl bg-gray-200"
            />
          ))}
        </div>

        <div className="h-56 rounded-2xl bg-gray-200" />
      </div>
    </main>
  );
}

async function ProductDetailsContent({ slug }) {
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const markets = Array.isArray(product.markets)
    ? product.markets
    : [];

  const prices = markets
    .flatMap((market) => [
      Number(market.min),
      Number(market.max),
    ])
    .filter((price) => Number.isFinite(price));

  const minPrice = prices.length
    ? Math.min(...prices)
    : null;

  const maxPrice = prices.length
    ? Math.max(...prices)
    : null;

  const direction = product.change?.dir;

  const changeStyle =
    direction === "up"
      ? "bg-red-50 text-red-600"
      : direction === "down"
        ? "bg-green-50 text-green-700"
        : "bg-gray-100 text-gray-600";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
        >
          ← হোম পেজে ফিরে যাও
        </Link>

        <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-emerald-50/70 p-5 sm:p-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-white text-5xl shadow-sm">
                {product.image || product.categoryIcon || "🛒"}
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-emerald-700">
                  {product.categoryIcon || "🛒"}{" "}
                  {product.categoryNameBn ||
                    product.category ||
                    "অন্যান্য"}
                </p>

                <h1 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  {product.nameBn || product.name}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  প্রতি {product.unit || "একক"}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <p className="text-3xl font-extrabold text-emerald-700">
                    ৳{formatPrice(product.today)}
                  </p>

                  {product.change && (
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold ${changeStyle}`}
                    >
                      {direction === "up"
                        ? "▲"
                        : direction === "down"
                          ? "▼"
                          : "—"}{" "}
                      {formatPrice(product.change.pct)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <h2 className="mb-5 text-xl font-extrabold text-gray-900">
              বাজারদরের সারসংক্ষেপ
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <PriceSummary
                title="আজকের দাম"
                value={product.today}
                color="text-emerald-700"
              />

              <PriceSummary
                title="সর্বনিম্ন বাজারদর"
                value={minPrice}
                color="text-green-700"
              />

              <PriceSummary
                title="সর্বোচ্চ বাজারদর"
                value={maxPrice}
                color="text-red-600"
              />
            </div>

            <div className="mt-10">
              <h2 className="mb-5 text-xl font-extrabold text-gray-900">
                🏪 বাজারভিত্তিক দাম
              </h2>

              {markets.length === 0 ? (
                <p className="rounded-xl bg-gray-50 p-5 text-sm text-gray-500">
                  এই পণ্যের বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
                </p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full min-w-[420px] text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="px-4 py-3 font-semibold">
                          বাজার
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          সর্বনিম্ন
                        </th>
                        <th className="px-4 py-3 font-semibold">
                          সর্বোচ্চ
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {markets.map((market, index) => (
                        <tr
                          key={`${market.market || "market"}-${index}`}
                          className="border-t border-gray-100"
                        >
                          <td className="px-4 py-4">
                            <p className="font-semibold text-gray-900">
                              {market.market || "নাম উল্লেখ নেই"}
                            </p>

                            {market.division && (
                              <p className="mt-1 text-xs text-gray-500">
                                {market.division}
                              </p>
                            )}
                          </td>

                          <td className="px-4 py-4 font-semibold text-green-700">
                            ৳{formatPrice(market.min)}
                          </td>

                          <td className="px-4 py-4 font-semibold text-red-600">
                            ৳{formatPrice(market.max)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <p className="mt-6 text-xs leading-6 text-gray-500">
              দ্রষ্টব্য: প্রদর্শিত দাম সম্ভাব্য বাজারদর। বাজার ও সময়
              অনুযায়ী প্রকৃত দাম পরিবর্তিত হতে পারে।
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

async function ProductDetailsRoute({ params }) {
  const { slug } = await params;

  return <ProductDetailsContent slug={slug} />;
}

export default function ProductDetailsPage({ params }) {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsRoute params={params} />
    </Suspense>
  );
}