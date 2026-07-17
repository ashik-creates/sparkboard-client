"use client";

interface FeatureItem {
  icon: string;
  label: string;
  title: string;
  body: string;
}

interface AICoachPreviewProps {
  eyebrow?: string;
  title?: string;
  features?: FeatureItem[];
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    icon: "◈",
    label: "Lean Canvas",
    title: "Structure in seconds.",
    body: "Transform a rough paragraph into a complete 9-block Lean Canvas. Gemini extracts customer segments, revenue streams, cost drivers, and competitive advantages automatically.",
  },
  {
    icon: "◉",
    label: "Feasibility Score",
    title: "Data over intuition.",
    body: "A 0–100 composite score across five weighted dimensions: TAM, technical complexity, competitive density, unit economics, and regulatory exposure. Updated on every revision.",
  },
  {
    icon: "◎",
    label: "SWOT Analysis",
    title: "Full strategic picture.",
    body: "Auto-generated Strengths, Weaknesses, Opportunities, and Threats — each backed by market context and actionable recommendations from Gemini.",
  },
  {
    icon: "◐",
    label: "Board Buddy",
    title: "Your AI co-founder.",
    body: "A private conversational AI trained on your specific idea. Probe pricing models, stress-test GTM assumptions, and draft investor narratives — all within a single workspace.",
  },
];

export function AICoachPreview({
  eyebrow = "Core AI Engine",
  title = "Four tools. One workspace.",
  features = DEFAULT_FEATURES,
}: AICoachPreviewProps) {
  return (
    <section
      id="features"
      className="px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-background border-b border-border"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 mb-16 max-w-2xl">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
            {eyebrow}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
            {title}
          </h2>
        </div>

        {/* 2x2 Feature Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-border divide-y md:divide-y-0 md:divide-x divide-border bg-border">
          {/* Left Column Features */}
          <div className="flex flex-col divide-y divide-border">
            {features.slice(0, 2).map((feat) => (
              <div 
                key={feat.label} 
                className="p-8 md:p-12 flex flex-col gap-6 bg-card-bg hover:bg-surface transition-colors duration-200 rounded-none"
              >
                <div className="flex items-center gap-3">
                  <span className="font-heading text-2xl text-accent select-none" aria-hidden="true">
                    {feat.icon}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-accent font-bold">
                    {feat.label}
                  </span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight text-primary">
                  {feat.title}
                </h3>
                <p className="font-sans text-sm text-secondary leading-relaxed max-w-md">
                  {feat.body}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column Features */}
          <div className="flex flex-col divide-y divide-border">
            {features.slice(2).map((feat) => (
              <div 
                key={feat.label} 
                className="p-8 md:p-12 flex flex-col gap-6 bg-card-bg hover:bg-surface transition-colors duration-200 rounded-none"
              >
                <div className="flex items-center gap-3">
                  <span className="font-heading text-2xl text-accent select-none" aria-hidden="true">
                    {feat.icon}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-accent font-bold">
                    {feat.label}
                  </span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight text-primary">
                  {feat.title}
                </h3>
                <p className="font-sans text-sm text-secondary leading-relaxed max-w-md">
                  {feat.body}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
