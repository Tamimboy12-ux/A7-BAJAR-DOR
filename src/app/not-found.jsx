
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-emerald-50/50 px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="relative mx-auto mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-emerald-50">
          <span className="text-7xl">🛒</span>

          <span className="absolute -right-1 -top-1 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white shadow-md">
            404
          </span>
        </div>

        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
          Page Not Found
        </p>

        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-500 sm:text-base">
          দুঃখিত! তুমি যে পেজটি খুঁজছ, সেটি পাওয়া যাচ্ছে না।
          ঠিকানা পরিবর্তন হয়ে থাকতে পারে অথবা লিংকটি ভুল হতে পারে।
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
          >
            <span>⌂</span>
            হোম পেজে ফিরে যাও
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-6 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-50"
          >
            ← হোম পেজে যাও
          </Link>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-5">
          <p className="text-sm text-gray-500">
            প্রতিদিনের বাজারদর জানতে{" "}
            <Link
              href="/"
              className="font-semibold text-emerald-700 underline underline-offset-4 hover:text-emerald-900"
            >
              বাজার দর
            </Link>
            -এ ফিরে যাও।
          </p>
        </div>
      </div>
    </main>
  );
}