export default function ProductsLoading() {
  return (
    <main className="min-h-screen bg-[var(--color-primary)] pt-24 pb-20">
      {/* Header skeleton */}
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <div className="h-3 w-24 bg-[var(--color-gold)]/20 rounded-full mx-auto mb-4 animate-pulse" />
        <div className="h-10 w-72 bg-[var(--color-accent)]/10 rounded-xl mx-auto mb-3 animate-pulse" />
        <div className="h-4 w-96 bg-[var(--color-muted)]/15 rounded-lg mx-auto animate-pulse" />
      </div>

      {/* Filter tabs skeleton */}
      <div className="max-w-6xl mx-auto px-6 mb-10 flex gap-2">
        {[80, 60, 90, 70].map((w, i) => (
          <div
            key={i}
            className="h-9 rounded-full bg-white/60 animate-pulse"
            style={{ width: `${w}px`, animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden animate-pulse"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="aspect-[2/3] bg-[var(--color-accent)]/8" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-[var(--color-accent)]/10 rounded-lg w-4/5" />
              <div className="h-3 bg-[var(--color-muted)]/10 rounded w-3/5" />
              <div className="flex justify-between items-center pt-1">
                <div className="h-6 w-28 bg-[var(--color-gold)]/15 rounded-lg" />
                <div className="h-7 w-24 bg-[var(--color-accent)]/10 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
