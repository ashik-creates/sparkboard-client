"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

interface FAQProps {
  eyebrow?: string;
  title?: string;
  items?: FaqItem[];
}

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "Is SparkBoard only for technical founders?",
    a: "Not at all. SparkBoard is designed for anyone with an idea — developers, designers, domain experts, and business generalists alike. If you can write a sentence, you can use SparkBoard.",
  },
  {
    q: "How does the AI validate my idea?",
    a: "SparkBoard uses Gemini to analyze your input across multiple dimensions: market sizing signals, competitive landscape, technical complexity, regulatory environment, and unit economics. The result is a structured canvas and a scored validation report.",
  },
  {
    q: "Is my idea kept private?",
    a: "Yes. Every idea is scoped to your account and never shared publicly unless you explicitly choose to publish it to the Explore feed.",
  },
  {
    q: "What is Board Buddy?",
    a: "Board Buddy is your context-aware AI co-founder. It operates within the boundary of your specific idea — answering strategic questions, drafting pitch content, and challenging weak assumptions.",
  },
  {
    q: "Can I export my Lean Canvas?",
    a: "Export to PDF and Markdown is available on the Pro tier. Free accounts can copy individual canvas sections at any time.",
  },
];

export function FAQ({
  eyebrow = "Questions",
  title = "Straight answers.",
  items = DEFAULT_FAQS,
}: FAQProps) {
  return (
    <section
      id="faq"
      className="px-6 md:px-12 lg:px-16 py-24 md:py-32 bg-background border-b border-border"
    >
      <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row gap-12 lg:gap-24">
        
        {/* Left: Section Header */}
        <div className="flex flex-col gap-2 md:w-1/3 md:sticky md:top-24 h-fit">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
            {eyebrow}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary">
            {title}
          </h2>
        </div>

        {/* Right: Accordion List */}
        <div className="flex flex-col border border-border divide-y divide-border max-w-3xl md:w-2/3 bg-card-bg">
          {items.map((item, i) => (
            <FaqAccordionItem key={i} q={item.q} a={item.a} />
          ))}
        </div>

      </div>
    </section>
  );
}

function FaqAccordionItem({ q, a }: FaqItem) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col bg-card-bg transition-colors duration-200">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center justify-between gap-6 p-6 text-left group focus:outline-none focus:bg-surface"
      >
        <span className="font-heading text-base md:text-lg font-bold uppercase tracking-tight text-primary group-hover:text-accent transition-colors duration-200">
          {q}
        </span>
        <span 
          className={`font-heading text-2xl font-thin text-secondary flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-45" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      
      {open && (
        <div className="px-6 pb-6 animate-fade-in">
          <p className="font-sans text-sm text-secondary leading-relaxed max-w-2xl border-t border-divider pt-4">
            {a}
          </p>
        </div>
      )}
    </div>
  );
}
