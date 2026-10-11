
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        {/* Brand */}
        <div className="text-center md:text-left">
          <Link
            href="/"
            className="text-lg font-extrabold tracking-tight text-emerald-800 transition hover:text-emerald-600"
          >
            বাজার দর
          </Link>

          <p className="mt-1 text-sm text-gray-500">
            প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        {/* Disclaimer */}
        <p className="max-w-md text-center text-xs leading-6 text-gray-500 md:text-right sm:text-sm">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>

      <div className="text-gray-500 text-center">
        বাজার দর। সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
}