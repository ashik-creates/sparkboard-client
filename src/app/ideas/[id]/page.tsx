"use client";

import { useState, use, useRef, useEffect } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { useIdea, useUpdateIdea, useImproveIdea, useValidateIdea, useSendMessage } from "@/hooks/use-ideas";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-context";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function IdeaWorkspace({ params }: PageProps) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"canvas" | "validation" | "mentor">("canvas");
  const [chatInput, setChatInput] = useState("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const { data: idea, isLoading, error } = useIdea(id);
  const updateIdeaMutation = useUpdateIdea();
  const improveIdeaMutation = useImproveIdea();
  const validateIdeaMutation = useValidateIdea();
  const sendMessageMutation = useSendMessage();

  useEffect(() => {
    if (activeTab === "mentor" && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeTab, idea?.chatHistory, sendMessageMutation.isPending]);

  if (!user && typeof window !== "undefined") {
    router.push("/auth/signin");
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <span className="font-sans text-xs uppercase tracking-widest text-secondary animate-pulse">
            Loading workspace...
          </span>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !idea) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <span className="font-sans text-xs uppercase tracking-widest text-red-600">
            Workspace error: Idea not found.
          </span>
          <Button variant="secondary" size="sm" onClick={() => router.push("/ideas")}>
            Return to Ideas
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleImprove = async () => {
    await improveIdeaMutation.mutateAsync(id);
  };

  const handleValidate = async () => {
    await validateIdeaMutation.mutateAsync(id);
  };

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg = chatInput;
    setChatInput("");
    await sendMessageMutation.mutateAsync({ id, message: msg });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 py-12 flex flex-col gap-10">
        {/* Workspace Subheader / Actions */}
        <div className="border-b border-border pb-8 flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
          <div className="flex flex-col gap-3">
            {/* Breadcrumb link */}
            <button 
              onClick={() => router.push("/ideas")}
              className="self-start font-sans text-[10px] uppercase tracking-wider text-secondary hover:text-primary transition-colors"
            >
              &larr; Back to Ideas
            </button>
            <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-primary">
              {idea.title}
            </h1>
            <p className="font-sans text-xs text-secondary italic">
              &ldquo;{idea.oneLiner}&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleImprove}
              isLoading={improveIdeaMutation.isPending}
            >
              ✨ Refine Canvas with Gemini
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleValidate}
              isLoading={validateIdeaMutation.isPending}
              disabled={!idea.leanCanvas}
            >
              📊 Run AI Market Validation
            </Button>
          </div>
        </div>

        {/* Tab Toggle Navigation */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("canvas")}
            className={`px-6 py-3 font-sans text-[10px] uppercase tracking-widest transition-colors font-bold border-b-2 ${
              activeTab === "canvas"
                ? "border-accent text-accent"
                : "border-transparent text-secondary hover:text-primary"
            }`}
          >
            01. Lean Canvas
          </button>
          <button
            onClick={() => setActiveTab("validation")}
            className={`px-6 py-3 font-sans text-[10px] uppercase tracking-widest transition-colors font-bold border-b-2 ${
              activeTab === "validation"
                ? "border-accent text-accent"
                : "border-transparent text-secondary hover:text-primary"
            }`}
          >
            02. Validation Report
          </button>
          <button
            onClick={() => setActiveTab("mentor")}
            className={`px-6 py-3 font-sans text-[10px] uppercase tracking-widest transition-colors font-bold border-b-2 ${
              activeTab === "mentor"
                ? "border-accent text-accent"
                : "border-transparent text-secondary hover:text-primary"
            }`}
          >
            03. Mentor Chat
          </button>
        </div>

        {/* Workspace Display Area */}
        <div className="flex-1">
          {/* TAB 1: LEAN CANVAS GRID */}
          {activeTab === "canvas" && (
            <div className="flex flex-col gap-8">
              {improveIdeaMutation.isPending ? (
                <div className="grid grid-cols-1 md:grid-cols-5 border border-border divide-y md:divide-y-0 md:divide-x divide-border h-[400px]">
                  <div className="col-span-1 p-6 bg-surface/50 animate-pulse" />
                  <div className="col-span-1 p-6 bg-surface/50 animate-pulse" />
                  <div className="col-span-1 p-6 bg-surface/50 animate-pulse" />
                  <div className="col-span-1 p-6 bg-surface/50 animate-pulse" />
                  <div className="col-span-1 p-6 bg-surface/50 animate-pulse" />
                </div>
              ) : !idea.leanCanvas ? (
                <div className="text-center py-24 border border-dashed border-border bg-surface flex flex-col items-center gap-6">
                  <h3 className="font-heading text-lg uppercase text-primary">Canvas Is Currently Empty</h3>
                  <p className="font-sans text-xs text-secondary max-w-md">
                    Let Gemini structure your raw startup description into value propositions, segments, channels, and pricing metrics.
                  </p>
                  <Button variant="primary" onClick={handleImprove}>
                    ✨ Generate Canvas with Gemini
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* The 5-Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-5 border border-border divide-y md:divide-y-0 md:divide-x divide-border bg-surface">
                    {/* Problem Block */}
                    <div className="p-6 flex flex-col gap-4">
                      <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-accent border-b border-border pb-2">
                        1. Problem
                      </h4>
                      <ul className="list-disc pl-4 flex flex-col gap-2 font-sans text-xs text-primary/80">
                        {idea.leanCanvas.problem.map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Solution Block */}
                    <div className="p-6 flex flex-col gap-4 divide-y divide-border/50">
                      <div className="pb-4">
                        <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-accent border-b border-border pb-2 mb-3">
                          2. Solution
                        </h4>
                        <ul className="list-disc pl-4 flex flex-col gap-2 font-sans text-xs text-primary/80">
                          {idea.leanCanvas.solution.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4">
                        <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-accent border-b border-border pb-2 mb-3">
                          8. Key Metrics
                        </h4>
                        <ul className="list-disc pl-4 flex flex-col gap-2 font-sans text-xs text-primary/80">
                          {idea.leanCanvas.keyMetrics.map((m, idx) => (
                            <li key={idx}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Value Proposition Block */}
                    <div className="p-6 flex flex-col gap-4 bg-background/25">
                      <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-accent border-b border-border pb-2">
                        3. Value Proposition
                      </h4>
                      <ul className="list-disc pl-4 flex flex-col gap-2 font-sans text-xs text-primary/80 font-medium">
                        {idea.leanCanvas.valueProposition.map((v, idx) => (
                          <li key={idx} className="text-primary">{v}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Unfair Advantage Block */}
                    <div className="p-6 flex flex-col gap-4 divide-y divide-border/50">
                      <div className="pb-4">
                        <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-accent border-b border-border pb-2 mb-3">
                          9. Unfair Advantage
                        </h4>
                        <ul className="list-disc pl-4 flex flex-col gap-2 font-sans text-xs text-primary/80">
                          {idea.leanCanvas.unfairAdvantage.map((u, idx) => (
                            <li key={idx}>{u}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4">
                        <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-accent border-b border-border pb-2 mb-3">
                          5. Channels
                        </h4>
                        <ul className="list-disc pl-4 flex flex-col gap-2 font-sans text-xs text-primary/80">
                          {idea.leanCanvas.channels.map((c, idx) => (
                            <li key={idx}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Customer Segments Block */}
                    <div className="p-6 flex flex-col gap-4">
                      <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-accent border-b border-border pb-2">
                        4. Customer Segments
                      </h4>
                      <ul className="list-disc pl-4 flex flex-col gap-2 font-sans text-xs text-primary/80">
                        {idea.leanCanvas.customerSegments.map((cs, idx) => (
                          <li key={idx}>{cs}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* The Bottom 2 blocks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 border border-border divide-y md:divide-y-0 md:divide-x divide-border bg-surface">
                    <div className="p-6 flex flex-col gap-4">
                      <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-accent border-b border-border pb-2">
                        6. Cost Structure
                      </h4>
                      <ul className="list-disc pl-4 flex flex-col gap-2 font-sans text-xs text-secondary">
                        {idea.leanCanvas.costStructure.map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                      <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-accent border-b border-border pb-2">
                        7. Revenue Streams
                      </h4>
                      <ul className="list-disc pl-4 flex flex-col gap-2 font-sans text-xs text-secondary">
                        {idea.leanCanvas.revenueStreams.map((r, idx) => (
                          <li key={idx}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: AI VALIDATION REPORT */}
          {activeTab === "validation" && (
            <div className="flex flex-col gap-10">
              {validateIdeaMutation.isPending ? (
                <div className="flex flex-col gap-8">
                  <div className="h-24 bg-surface/50 border border-border animate-pulse rounded-none" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="h-[250px] bg-surface/50 border border-border animate-pulse rounded-none" />
                    <div className="h-[250px] bg-surface/50 border border-border animate-pulse rounded-none" />
                  </div>
                </div>
              ) : !idea.validationReport ? (
                <div className="text-center py-24 border border-dashed border-border bg-surface flex flex-col items-center gap-6">
                  <h3 className="font-heading text-lg uppercase text-primary">No Validation Active</h3>
                  <p className="font-sans text-xs text-secondary max-w-md">
                    To perform feasibility checks and run SWOT audits, you must trigger a Gemini market study.
                  </p>
                  <Button
                    variant="primary"
                    onClick={handleValidate}
                    disabled={!idea.leanCanvas}
                  >
                    Run AI Market Validation
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  {/* Scores Overview Row */}
                  <div className="border border-border bg-surface p-8 flex flex-col md:flex-row justify-around gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
                    <div className="flex-1 flex flex-col gap-1.5 pt-4 md:pt-0">
                      <span className="font-heading text-4xl font-bold text-accent">
                        {idea.validationReport.feasibility.overallScore}%
                      </span>
                      <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-primary">
                        Overall Score
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5 pt-4 md:pt-0 md:pl-4">
                      <span className="font-heading text-3xl font-bold text-primary">
                        {idea.validationReport.feasibility.technical}%
                      </span>
                      <span className="font-sans text-[10px] uppercase tracking-wider text-secondary">
                        Technical
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5 pt-4 md:pt-0 md:pl-4">
                      <span className="font-heading text-3xl font-bold text-primary">
                        {idea.validationReport.feasibility.marketSize}%
                      </span>
                      <span className="font-sans text-[10px] uppercase tracking-wider text-secondary">
                        Market Size
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5 pt-4 md:pt-0 md:pl-4">
                      <span className="font-heading text-3xl font-bold text-primary">
                        {idea.validationReport.feasibility.financialViability}%
                      </span>
                      <span className="font-sans text-[10px] uppercase tracking-wider text-secondary">
                        Financial
                      </span>
                    </div>
                  </div>

                  {/* SWOT Matrix */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-primary">
                      SWOT Matrix
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 border border-border divide-y md:divide-y-0 md:divide-x divide-border bg-surface">
                      {/* Strengths */}
                      <div className="p-6 flex flex-col gap-3">
                        <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-accent">
                          Strengths
                        </h4>
                        <ul className="list-disc pl-4 flex flex-col gap-1.5 font-sans text-xs text-secondary">
                          {idea.validationReport.swot.strengths.map((str, idx) => (
                            <li key={idx}>{str}</li>
                          ))}
                        </ul>
                      </div>
                      {/* Weaknesses */}
                      <div className="p-6 flex flex-col gap-3">
                        <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-accent">
                          Weaknesses
                        </h4>
                        <ul className="list-disc pl-4 flex flex-col gap-1.5 font-sans text-xs text-secondary">
                          {idea.validationReport.swot.weaknesses.map((w, idx) => (
                            <li key={idx}>{w}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 border-l border-r border-b border-border divide-y md:divide-y-0 md:divide-x divide-border bg-surface">
                      {/* Opportunities */}
                      <div className="p-6 flex flex-col gap-3">
                        <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-accent">
                          Opportunities
                        </h4>
                        <ul className="list-disc pl-4 flex flex-col gap-1.5 font-sans text-xs text-secondary">
                          {idea.validationReport.swot.opportunities.map((o, idx) => (
                            <li key={idx}>{o}</li>
                          ))}
                        </ul>
                      </div>
                      {/* Threats */}
                      <div className="p-6 flex flex-col gap-3">
                        <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-accent">
                          Threats
                        </h4>
                        <ul className="list-disc pl-4 flex flex-col gap-1.5 font-sans text-xs text-secondary">
                          {idea.validationReport.swot.threats.map((t, idx) => (
                            <li key={idx}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Competitive Landscape Table */}
                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-primary">
                      Key Competitors
                    </h3>
                    <div className="border border-border bg-surface divide-y divide-border">
                      {idea.validationReport.competitors.map((comp, idx) => (
                        <div key={idx} className="p-6 flex flex-col md:flex-row gap-4 justify-between">
                          <div className="flex-1 flex flex-col gap-1">
                            <span className="font-heading text-md font-bold text-primary">
                              {comp.name}
                            </span>
                            <p className="font-sans text-xs text-secondary">
                              {comp.description}
                            </p>
                          </div>
                          <div className="flex-1 flex flex-col gap-1 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                            <span className="font-sans text-[9px] uppercase tracking-widest text-accent font-bold">
                              SparkBoard Differentiation
                            </span>
                            <p className="font-sans text-xs text-primary font-medium">
                              {comp.differentiation}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Text Panel */}
                  <div className="border border-border bg-background p-8 flex flex-col gap-4">
                    <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-primary">
                      AI Executive Analyst Feedback
                    </h4>
                    <div className="font-sans text-xs text-secondary leading-relaxed space-y-4">
                      {idea.validationReport.summaryReport}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BOARD BUDDY MENTOR CHAT */}
          {activeTab === "mentor" && (
            <div className="border border-border bg-surface flex flex-col h-[500px]">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-background/20">
                {(!idea.chatHistory || idea.chatHistory.length === 0) && (
                  <div className="text-center py-16 flex flex-col items-center gap-2">
                    <span className="font-heading text-2xl">🤖</span>
                    <h4 className="font-heading text-sm font-bold uppercase tracking-tight text-primary">
                      Say hello to Board Buddy
                    </h4>
                    <p className="font-sans text-xs text-secondary max-w-sm">
                      Your AI startup mentor. Ask pricing queries, suggest value positioning, or ask general launch timelines.
                    </p>
                  </div>
                )}

                {idea.chatHistory?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col gap-1 max-w-[80%] ${
                      msg.role === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    <span className="font-sans text-[8px] uppercase tracking-wider text-secondary">
                      {msg.role === "user" ? "You" : "Board Buddy"}
                    </span>
                    <div
                      className={`p-4 font-sans text-xs leading-relaxed border ${
                        msg.role === "user"
                          ? "bg-primary border-primary text-background rounded-none"
                          : "bg-surface border-border text-primary rounded-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {sendMessageMutation.isPending && (
                  <div className="self-start flex flex-col gap-1 items-start">
                    <span className="font-sans text-[8px] uppercase tracking-wider text-secondary">
                      Board Buddy
                    </span>
                    <div className="p-4 font-sans text-xs border border-border bg-surface text-secondary animate-pulse rounded-none">
                      Analyzing and typing response...
                    </div>
                  </div>
                )}

                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={handleSendChatMessage}
                className="border-t border-border p-4 flex gap-4 bg-background"
              >
                <input
                  type="text"
                  placeholder="Ask Board Buddy a question..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={sendMessageMutation.isPending}
                  className="flex-1 px-4 py-3 bg-surface border border-border focus:outline-none focus:border-accent text-xs font-sans rounded-none"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={sendMessageMutation.isPending}
                >
                  Send
                </Button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
