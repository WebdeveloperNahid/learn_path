import Link from "next/link";
import { FiHome, FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-white to-indigo-50/40 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-md shadow-indigo-200">
          <FiSearch className="h-3.5 w-3.5" />
          PAGE NOT FOUND
        </span>

        <h1 className="mt-6 text-7xl font-black text-slate-900">404</h1>

        <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600" />

        <p className="mt-4 text-lg font-bold text-slate-900">
          This page doesn&apos;t exist
        </p>
        <p className="mt-2 text-sm text-slate-500">
          The page you&apos;re looking for may have been moved, renamed, or
          never existed in the first place.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all hover:shadow-lg hover:shadow-indigo-300"
          >
            <FiHome className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}