"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { validateIdea } from "@/lib/action/ideas";

interface Props {
  ideaId: string;
  reanalyze?: boolean;
}

export default function ValidateIdeaButton({
  ideaId,
  reanalyze = false,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleValidate = async () => {
    try {
      setLoading(true);

      const res = await validateIdea(ideaId);

      if (res.success) {
        toast.success("AI analysis completed!");

        // Give the toast time to appear, then reload.
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setLoading(false);
        toast.error(res.message || "Failed to analyze idea.");
      }
    } catch (error) {
      setLoading(false);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  };

  return (
    <Button
      onClick={handleValidate}
      disabled={loading}
    >
      {loading
        ? "Analyzing..."
        : reanalyze
          ? "Re-analyze with AI"
          : "Validate with AI"}
    </Button>
  );
}