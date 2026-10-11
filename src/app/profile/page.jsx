
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const newName = name.trim();

    if (newName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    if (newName === (user?.name || "")) {
      toast.error("নতুন নাম লিখো");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: newName,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি");
        return;
      }

      toast.success("নাম সফলভাবে আপডেট হয়েছে!");
      setName(newName);

      // Session refresh
      await authClient.getSession();
      router.refresh();
    } catch (error) {
      toast.error(error.message || "নাম আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-gray-50">
        <p className="text-emerald-700">লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl font-bold text-gray-900">
          লগইন করা প্রয়োজন
        </h1>

        <p className="mt-2 text-gray-500">
          প্রোফাইল আপডেট করতে প্রথমে সাইন ইন করো।
        </p>

        <Link
          href="/signin"
          className="mt-4 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
        >
          সাইন ইন
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-emerald-50/50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-lg">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-emerald-700 hover:text-emerald-900"
        >
          ← হোম পেজে ফিরে যাও
        </Link>

        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <div className="bg-emerald-700 px-6 py-7 text-white">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">
                {(name || user.name || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  Profile Update
                </h1>

                <p className="mt-1 text-sm text-emerald-50">
                  তোমার নাম পরিবর্তন করো
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6 sm:p-8"
          >
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                নতুন নাম
              </label>

              <input
                id="profile-name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={user.name || "তোমার নতুন নাম লিখো"}
                minLength={2}
                maxLength={100}
                autoComplete="name"
                required
                disabled={loading}
                className="block w-full cursor-text rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
              />

              <p className="mt-2 text-xs text-gray-500">
                এখানে নতুন নাম লিখে আপডেট বাটনে ক্লিক করো।
              </p>
            </div>

            <button
              type="submit"
              disabled={
                loading ||
                name.trim().length < 2 ||
                name.trim() === (user.name || "")
              }
              className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? "আপডেট হচ্ছে..." : "নাম আপডেট করো"}
            </button>

            <Link
              href="/"
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-center font-medium text-gray-700 transition hover:bg-gray-50"
            >
              বাতিল
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}