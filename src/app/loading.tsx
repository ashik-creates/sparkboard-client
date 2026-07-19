export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl animate-pulse px-6 py-20">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto h-3 w-24 bg-border" />
        <div className="mx-auto mt-4 h-10 w-72 bg-border" />
        <div className="mx-auto mt-4 h-5 w-[420px] max-w-full bg-border" />
      </div>

      {/* Filter */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="h-11 w-full rounded-none border border-border bg-surface md:w-72" />

        <div className="flex gap-3">
          <div className="h-11 w-40 rounded-none border border-border bg-surface" />
          <div className="h-11 w-32 rounded-none border border-border bg-surface" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="border border-border bg-surface"
          >
            <div className="h-52 bg-border" />

            <div className="space-y-4 p-5">
              <div className="h-4 w-20 bg-border" />

              <div className="space-y-2">
                <div className="h-6 w-5/6 bg-border" />
                <div className="h-6 w-2/3 bg-border" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full bg-border" />
                <div className="h-4 w-5/6 bg-border" />
                <div className="h-4 w-3/4 bg-border" />
              </div>

              <div className="flex gap-2">
                <div className="h-6 w-16 bg-border" />
                <div className="h-6 w-20 bg-border" />
                <div className="h-6 w-14 bg-border" />
              </div>

              <div className="flex justify-between pt-3">
                <div className="h-4 w-20 bg-border" />
                <div className="h-9 w-24 bg-border" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-14 flex justify-center gap-2">
        <div className="h-10 w-24 bg-border" />
        <div className="h-10 w-10 bg-border" />
        <div className="h-10 w-10 bg-border" />
        <div className="h-10 w-10 bg-border" />
        <div className="h-10 w-24 bg-border" />
      </div>
    </main>
  );
}