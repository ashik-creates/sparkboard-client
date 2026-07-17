export function IdeaCardSkeleton() {
  return (
    <div className="animate-pulse border border-border bg-surface">
      <div className="h-48 w-full bg-border" />

      <div className="space-y-4 p-6">
        <div className="h-3 w-20 bg-border" />

        <div className="h-6 w-3/4 bg-border" />

        <div className="space-y-2">
          <div className="h-3 w-full bg-border" />
          <div className="h-3 w-5/6 bg-border" />
          <div className="h-3 w-2/3 bg-border" />
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="h-3 w-20 bg-border" />
          <div className="h-3 w-24 bg-border" />
        </div>
      </div>
    </div>
  );
}