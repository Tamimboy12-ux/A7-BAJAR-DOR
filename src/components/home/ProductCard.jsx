
import Link from "next/link";

function formatPrice(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) return "—";

  return number.toLocaleString("bn-BD");
}

export default function ProductCard({ product }) {
  const direction = product.change?.dir;
  const isUp = direction === "up";
  const isDown = direction === "down";

  const changeStyle = isUp
    ? "bg-red-50 text-red-600"
    : isDown
      ? "bg-green-50 text-green-700"
      : "bg-gray-100 text-gray-600";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-3xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        {product.change && (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${changeStyle}`}
          >
            {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
            {formatPrice(product.change.pct)}%
          </span>
        )}
      </div>

      <h3 className="mt-4 font-bold text-gray-800 transition group-hover:text-emerald-700">
        {product.nameBn || product.name}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        প্রতি {product.unit || "একক"}
      </p>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-xl font-extrabold text-emerald-700">
            ৳{formatPrice(product.today)}
          </p>
        </div>

        <span className="text-sm text-emerald-700">
          বিস্তারিত →
        </span>
      </div>
    </Link>
  );
}
