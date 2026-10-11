
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function CategoryNavLinks({ categories = [] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { nameBn: "হোম", slug: "", categoryIcon: "🏠" },
    ...categories,
  ];

  function isActive(slug) {
    if (!slug) return pathname === "/";
    return pathname === `/category/${slug}`;
  }

  return (
    <nav className="relative" aria-label="প্রধান নেভিগেশন">
      <div className="hidden items-center gap-2 overflow-x-auto py-2 md:flex">
        {links.map((item) => (
          <Link
            key={item.slug || "home"}
            href={
              item.slug
                ? `/category/${item.slug}`
                : "/"
            }
            aria-current={isActive(item.slug) ? "page" : undefined}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
              isActive(item.slug)
                ? "bg-emerald-700 text-white"
                : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
            }`}
          >
            <span className="mr-1" aria-hidden="true">
              {item.categoryIcon || "🛒"}
            </span>
            {item.nameBn}
          </Link>
        ))}
      </div>

      <div className="py-2 md:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          className="btn btn-sm border-gray-200 bg-white text-gray-700"
        >
          ☰ বিভাগ দেখুন
        </button>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-full z-50 grid grid-cols-2 gap-2 rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
            {links.map((item) => (
              <Link
                key={item.slug || "home"}
                href={
                  item.slug
                    ? `/category/${item.slug}`
                    : "/"
                }
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-3 text-sm font-medium ${
                  isActive(item.slug)
                    ? "bg-emerald-700 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-emerald-50"
                }`}
              >
                {item.categoryIcon || "🛒"} {item.nameBn}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}