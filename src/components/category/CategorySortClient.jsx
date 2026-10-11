
"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/home/ProductCard";

export default function CategorySortClient({ products }) {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sortOrder === "low-high") {
      items.sort((a, b) => Number(a.today) - Number(b.today));
    } else if (sortOrder === "high-low") {
      items.sort((a, b) => Number(b.today) - Number(a.today));
    }

    return items;
  }, [products, sortOrder]);

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold text-gray-900">
          পণ্যের তালিকা
        </h2>

        <select
          aria-label="দাম অনুযায়ী সাজান"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          className="select select-bordered select-sm bg-white"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-high">দাম: কম থেকে বেশি</option>
          <option value="high-low">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {sortedProducts.map((product, index) => (
          <ProductCard
            key={product.id || product.slug || index}
            product={product}
          />
        ))}
      </div>
    </>
  );
}
