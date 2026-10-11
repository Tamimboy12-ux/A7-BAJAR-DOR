
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
    console.error("Price marquee error:", error);
    return [];
  }
}

function formatPrice(price) {
  const number = Number(price);

  if (!Number.isFinite(number)) return "—";

  return number.toLocaleString("bn-BD");
}

export default async function PriceMarquee() {
  const products = await getProducts();

  if (!products.length) {
    return (
      <div className="border-b bg-emerald-800 px-4 py-3 text-center text-sm text-white">
        বাজারদরের তথ্য লোড হচ্ছে...
      </div>
    );
  }

  // Content দুবার রাখলে animation শেষ হয়ে থেমে যাবে না।
  const items = [...products, ...products];

  return (
    <section
      className="overflow-hidden border-b border-emerald-900 bg-emerald-800 text-white"
      aria-label="আজকের বাজারদর"
    >
      <div className="flex min-h-12 items-center">
        <div className="shrink-0 bg-emerald-950 px-3 py-3 text-sm font-bold">
          আজকের দর
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="price-marquee-track flex w-max items-center">
            {items.map((product, index) => {
              const direction = product.change?.dir;
              const isUp = direction === "up";
              const isDown = direction === "down";

              return (
                <div
                  key={`${product.id || product.slug || product.nameBn}-${index}`}
                  className="flex shrink-0 items-center gap-2 px-5 text-sm"
                >
                  <span>{product.image || "🛒"}</span>

                  <span className="font-medium">
                    {product.nameBn || product.name}
                  </span>

                  <span className="font-bold">
                    ৳{formatPrice(product.today)}
                    {product.unit ? `/${product.unit}` : ""}
                  </span>

                  {product.change && (
                    <span
                      className={
                        isUp
                          ? "font-semibold text-green-300"
                          : isDown
                            ? "font-semibold text-red-300"
                            : "font-semibold text-gray-200"
                      }
                    >
                      {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                      {formatPrice(product.change.pct)}%
                    </span>
                  )}

                  <span className="ml-3 text-emerald-400">◆</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .price-marquee-track {
          width: max-content;
          animation: price-marquee-scroll 35s linear infinite;
          will-change: transform;
        }

        .price-marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes price-marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .price-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
