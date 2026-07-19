export default function Loading() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-white to-indigo-50/40 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto mb-8 max-w-4xl text-center">
        <div className="mx-auto h-6 w-40 animate-pulse rounded-full bg-slate-200" />
        <div className="mx-auto mt-4 h-8 w-64 animate-pulse rounded-lg bg-slate-200" />
        <div className="mx-auto mt-3 h-1 w-16 animate-pulse rounded-full bg-slate-200" />
        <div className="mx-auto mt-3 h-4 w-56 animate-pulse rounded-lg bg-slate-200" />
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="grid gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-slate-200" />
                <div className="space-y-2">
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <div className="h-8 w-16 animate-pulse rounded-xl bg-slate-200" />
                <div className="h-8 w-16 animate-pulse rounded-xl bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}