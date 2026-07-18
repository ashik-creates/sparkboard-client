"use client";
const TICKER_STATS = [
  { value: "12,400+", label: "Ideas Scored" },
  { value: "94.2%",   label: "Precision Rate" },
  { value: "47s",     label: "Generation Speed" },
  { value: "280+",    label: "Niches Tracked" },
];

const Marquee = () => {
    return (
        <div className="border-b border-border bg-card-bg overflow-hidden py-5 select-none" aria-hidden="true">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {/* Duplicate for infinite horizontal scrolling marquee effect */}
          {[...TICKER_STATS, ...TICKER_STATS, ...TICKER_STATS].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-12 border-r border-border last:border-r-0"
            >
              <span className="font-heading text-lg font-bold text-primary tracking-tight">
                {stat.value}
              </span>
              <span className="font-sans text-[9px] uppercase tracking-widest text-secondary font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
};

export default Marquee;