
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthActions() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const user = session?.user;

  async function handleSignOut() {
    if (loading) return;

    setLoading(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "Sign Out করা যায়নি");
        return;
      }

      setIsOpen(false);
      toast.success("সফলভাবে Sign Out হয়েছে!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <span className="loading loading-spinner loading-sm text-emerald-700" />
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="btn btn-sm border-emerald-600 bg-white text-emerald-700 hover:bg-emerald-50"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="btn btn-sm border-0 bg-emerald-700 text-white hover:bg-emerald-800"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const displayName = user.name || "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative">
      {/* শুধু এই বাটনটি Navbar-এ দেখা যাবে */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-label="Profile menu"
        className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-emerald-50"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
          {initial}
        </div>

        <div className="hidden max-w-36 text-left sm:block">
          <p className="truncate text-sm font-semibold text-gray-800">
            {displayName}
          </p>
          <p className="truncate text-xs text-gray-500">
            {user.email}
          </p>
        </div>

        <span className="text-sm text-gray-500">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {/* ক্লিক করলেই শুধু তখন dropdown দেখা যাবে */}
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close profile menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-xl">
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="truncate text-sm font-semibold text-gray-800">
                {displayName}
              </p>
              <p className="break-all text-xs text-gray-500">
                {user.email}
              </p>
            </div>

            <div className="p-2">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-800"
              >
                <span>👤</span>
                <span>Profile Update</span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={loading}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                <span>↪</span>
                <span>
                  {loading ? "Sign Out হচ্ছে..." : "Sign Out"}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}