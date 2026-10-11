
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading || socialLoading) return;

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        toast.error(
          result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি"
        );
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error.message || "কিছু একটা সমস্যা হয়েছে"
      );
    } finally {
      setLoading(false);
    }
  }

   const handleGoogle = async () => {
    await authClient.signIn.social({
        provider: "google",
    });
  }

  const handleGithub = async () => {
    await authClient.signIn.social({
        provider: "github",
    });
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-emerald-50/60 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-6 shadow-lg sm:p-8">
        <Link href="/" className="mb-6 block text-center">
          <span className="text-4xl">🛒</span>

          <h1 className="mt-2 text-2xl font-extrabold text-emerald-800">
            বাজার দর
          </h1>
        </Link>

        <h2 className="text-center text-xl font-bold text-gray-900">
          নতুন অ্যাকাউন্ট তৈরি করুন
        </h2>

        <p className="mb-6 mt-2 text-center text-sm text-gray-500">
          বাজারদরের বিস্তারিত তথ্য দেখতে সাইন আপ করুন।
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="signup-name"
              className="mb-1 block text-sm font-medium"
            >
              আপনার নাম
            </label>

            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              placeholder="আপনার পুরো নাম"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="mb-1 block text-sm font-medium"
            >
              ইমেইল
            </label>

            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@example.com"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="mb-1 block text-sm font-medium"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label
              htmlFor="signup-confirm-password"
              className="mb-1 block text-sm font-medium"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              placeholder="আবার পাসওয়ার্ড লিখুন"
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading || Boolean(socialLoading)}
            className="btn w-full border-0 bg-emerald-700 text-white hover:bg-emerald-800"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ"}
          </button>
        </form>

        <div className="divider text-xs text-gray-400">
          অথবা
        </div>

        <div className="space-y-3">
           <button
            type="button"
            onClick={handleGoogle}
            className="btn btn-outline w-full"
          >
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={handleGithub}
            className="btn btn-outline w-full"
          >
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-emerald-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}