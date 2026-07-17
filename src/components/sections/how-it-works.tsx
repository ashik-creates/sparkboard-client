"use client";

interface StepItem {
  step: string;
  title: string;
  body: string;
}

interface HowItWorksProps {
  eyebrow?: string;
  title?: string;
  steps?: StepItem[];
}

const DEFAULT_STEPS: StepItem[] = [
  {
    step: "01",
    title: "Capture the Raw Spark",
    body: "Write your startup idea in plain language — one sentence or twenty. No templates, no structure required. SparkBoard handles the scaffolding.",
  },
  {
    step: "02",
    title: "AI Builds the Canvas",
    body: "Gemini maps your input to a 9-block Lean Canvas automatically: problem, solution, channels, revenue streams, cost structure, and more.",
  },
  {
    step: "03",
    title: "Validate Against Reality",
    body: "Receive a VC-grade SWOT analysis and a 0–100 Feasibility Score across five axes: market size, technical difficulty, competition, margins, and regulatory risk.",
  },
  {
    step: "04",
    title: "Refine with Your AI Co-Founder",
    body: "Board Buddy — your context-aware AI mentor — answers strategic questions, drafts pitch frameworks, and challenges assumptions in real time.",
  },
];

export function HowItWorks({
  eyebrow = "The Process",
  title = "From Idea to Investment-Ready.",
  steps = DEFAULT_STEPS,
}: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      className="px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-secondary-bg border-b border-border"
    >
      <div className="max-w-[1400px] mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
            {eyebrow}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
            {title}
          </h2>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border divide-y md:divide-y-0 lg:divide-x divide-border bg-border">
          {steps.map((step) => (
            <div 
              key={step.step} 
              className="p-8 flex flex-col gap-6 bg-card-bg hover:bg-surface transition-colors duration-200 rounded-none group"
            >
              {/* Step number in accent */}
              <span className="font-heading text-3xl font-bold text-accent select-none group-hover:text-accent-hover transition-colors">
                {step.step}
              </span>
              
              {/* Step Title */}
              <h3 className="font-heading text-base font-bold uppercase tracking-tight text-primary">
                {step.title}
              </h3>
              
              {/* Step Body */}
              <p className="font-sans text-sm text-secondary leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
