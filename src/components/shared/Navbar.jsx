
import { connection } from "next/server";
import Link from "next/link";
import CategoryNavLinks from "./CategoryNavLinks";
import AuthActions from "./AuthActions";

const API_URL = "https://api.api-store.workers.dev/api/bazardor";

const DEFAULT_CATEGORIES = [
  { nameBn: "চাল", slug: "chal", categoryIcon: "🍚" },
  { nameBn: "ডাল", slug: "dal", categoryIcon: "🫘" },
  { nameBn: "তেল", slug: "tel", categoryIcon: "🫙" },
  { nameBn: "সবজি", slug: "sobji", categoryIcon: "🥦" },
  { nameBn: "মাছ", slug: "mach", categoryIcon: "🐟" },
  { nameBn: "মাংস", slug: "mangsho", categoryIcon: "🍗" },
];

async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/products`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      return DEFAULT_CATEGORIES;
    }

    const result = await response.json();

    const products = Array.isArray(result)
      ? result
      : result.data || result.products || [];

    if (!products.length) {
      return DEFAULT_CATEGORIES;
    }

    const categories = new Map();

    products.forEach((product) => {
      if (!product.category) return;

      if (!categories.has(product.category)) {
        categories.set(product.category, {
          slug: product.category,
          nameBn: product.categoryNameBn || product.category,
          categoryIcon: product.categoryIcon || "🛒",
        });
      }
    });

    return categories.size
      ? Array.from(categories.values())
      : DEFAULT_CATEGORIES;
  } catch (error) {
    console.error("Navbar categories error:", error);
    return DEFAULT_CATEGORIES;
  }
}

function getBanglaDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export default async function Navbar() {
  await connection();

  const categories = await getCategories();
  const today = getBanglaDate();

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white shadow-sm">
      {/* Logo, date and authentication */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2">
          <span className="text-3xl" aria-hidden="true">
            🛒
          </span>

          <div>
            <h1 className="text-xl font-extrabold leading-tight text-emerald-800 sm:text-2xl">
              বাজার দর
            </h1>

            <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
              {today}
            </p>
          </div>
        </Link>

        <div className="flex shrink-0 items-center">
          <AuthActions />
        </div>
      </div>

      {/* Category navigation */}
      <div className="border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-4">
          <CategoryNavLinks categories={categories} />
        </div>
      </div>
    </header>
  );
}