"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-slate-200 text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40"
      >
        <FiChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page, i) => {
        const prevPage = pages[i - 1];
        const showEllipsis = prevPage && page - prevPage > 1;
        return (
          <div key={page} className="flex items-center gap-2">
            {showEllipsis && <span className="text-slate-400">…</span>}
            <button
              onClick={() => goToPage(page)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold transition ${
                page === currentPage
                  ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                  : "border-2 border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              {page}
            </button>
          </div>
        );
      })}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-slate-200 text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40"
      >
        <FiChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}