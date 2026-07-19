import Link from "next/link";
import { FiLock, FiHome } from "react-icons/fi";

export default function UnauthorizedPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-white to-indigo-50/40 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-md shadow-indigo-200">
          <FiLock className="h-3.5 w-3.5" />
          ACCESS DENIED
        </span>

        <h1 className="mt-6 text-7xl font-black text-slate-900">403</h1>

        <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600" />

        <p className="mt-4 text-lg font-bold text-slate-900">
          You don&apos;t have permission to view this page
        </p>
        <p className="mt-2 text-sm text-slate-500">
          This area is restricted. If you think this is a mistake, contact
          support or sign in with an account that has the right access.
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