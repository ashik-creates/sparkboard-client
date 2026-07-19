"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { improveIdea } from "@/lib/action/ideas";

interface Props {
  ideaId: string;
  reanalyze?: boolean;
}

export default function ImproveIdeaButton({
  ideaId,
  reanalyze = false,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleImprove = async () => {
    try {
      setLoading(true);

      const res = await improveIdea(ideaId);

      if (res.success) {
        toast.success("AI improvement completed!");

        // Give the toast time to appear, then reload.
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setLoading(false);
        toast.error(res.message || "Failed to improve idea.");
      }
    } catch (error) {
      setLoading(false);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  return (
    <Button onClick={handleImprove} disabled={loading}>
      {loading
        ? "Improving..."
        : reanalyze
          ? "Re-improve with AI"
          : "Improve with AI"}
    </Button>
  );
}
