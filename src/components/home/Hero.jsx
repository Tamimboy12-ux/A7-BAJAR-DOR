
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-100">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:py-16 md:grid-cols-2 md:gap-12 md:py-20">
        {/* Left Content */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
            <span>🌿</span>
            প্রতিদিনের বাজারদর, এক জায়গায়
          </span>

          <h1 className="mt-6 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            সঠিক বাজারদর জানুন,
            <span className="mt-2 block text-emerald-700">
              কেনাকাটা করুন নিশ্চিন্তে
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-8 text-gray-600 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ ও মাংসের সর্বশেষ বাজারদর দেখুন।
            বিভিন্ন বাজারের দামের তথ্য জেনে সহজেই আপনার কেনাকাটার
            পরিকল্পনা করুন।
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#সব-পণ্য"
              className="btn border-emerald-700 bg-emerald-700 px-6 text-white shadow-md hover:border-emerald-800 hover:bg-emerald-800"
            >
              সব পণ্যের দাম দেখুন
              <span aria-hidden="true">→</span>
            </Link>

            <span className="text-sm text-gray-500">
              🛒 সহজেই দেখুন আজকের দাম
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
            <span>✓ পণ্যের দাম এক নজরে</span>
            <span>✓ বাজারভিত্তিক তথ্য</span>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="absolute inset-4 rounded-full bg-emerald-200/50 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-3 shadow-xl">
            <Image
              src="/bazar-hero.png"
              alt="তাজা শাকসবজি ও নিত্যপ্রয়োজনীয় পণ্য"
              width={640}
              height={520}
              priority
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>

          <div className="absolute -bottom-4 left-2 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-lg sm:left-0">
            <p className="text-xs text-gray-500">
              প্রতিদিনের বাজার
            </p>
            <p className="mt-1 font-bold text-emerald-700">
              আপনার হাতেই বাজারদর
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
