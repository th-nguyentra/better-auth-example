"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/signin");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
                Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {session.user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-zinc-800">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Welcome, {session.user?.name || "User"}!
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            You are successfully signed in to your account.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-md bg-zinc-50 p-4 dark:bg-zinc-700">
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                User Information
              </h3>
              <dl className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                    Name:
                  </dt>
                  <dd className="text-sm font-medium text-zinc-900 dark:text-white">
                    {session.user?.name || "N/A"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                    Email:
                  </dt>
                  <dd className="text-sm font-medium text-zinc-900 dark:text-white">
                    {session.user?.email}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                    User ID:
                  </dt>
                  <dd className="text-sm font-medium text-zinc-900 dark:text-white">
                    {session.user?.id}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
