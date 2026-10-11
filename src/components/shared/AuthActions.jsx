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

  const user = session?.user;

  async function handleSignOut() {
    if (loading) return;

    setLoading(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "Sign out করা যায়নি");
        return;
      }

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
    return <span className="loading loading-spinner loading-sm" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/signin" className="btn btn-outline btn-sm">
          Sign In
        </Link>

        <Link
          href="/signup"
          className="btn btn-sm border-0 bg-emerald-700 text-white hover:bg-emerald-800"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        className="btn btn-ghost flex h-auto gap-2 px-2"
      >
        <div className="avatar placeholder">
          <div className="w-10 rounded-full bg-emerald-100 text-emerald-800">
            <span className="text-lg font-bold">
              {(user.name || user.email || "U")
                .charAt(0)
                .toUpperCase()}
            </span>
          </div>
        </div>

        <div className="hidden text-left sm:block">
          <p className="max-w-32 truncate text-sm font-semibold text-gray-800">
            {user.name || "User"}
          </p>
          <p className="max-w-32 truncate text-xs text-gray-500">
            {user.email}
          </p>
        </div>

        <span className="text-gray-500">⌄</span>
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content menu z-50 mt-3 w-64 rounded-xl border border-emerald-100 bg-white p-3 shadow-lg"
      >
        <li className="menu-title">
          <span>আপনার অ্যাকাউন্ট</span>
        </li>

        <li className="mb-2">
          <div className="pointer-events-none flex flex-col items-start gap-1">
            <span className="font-semibold text-gray-800">
              {user.name || "User"}
            </span>
            <span className="break-all text-xs text-gray-500">
              {user.email}
            </span>
          </div>
        </li>

        <li>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={loading}
            className="text-red-600 hover:bg-red-50"
          >
            {loading ? "Sign Out হচ্ছে..." : "Sign Out"}
          </button>
        </li>
      </ul>
    </div>
  );
}