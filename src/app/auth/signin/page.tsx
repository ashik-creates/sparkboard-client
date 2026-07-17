"use client";

import { useState } from "react";
import { useAuth } from "@/providers/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    // Use the local mock sign-in handler
    await signIn(name || "Jane Doe", email);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-6">
      <div className="w-full max-w-md bg-surface border border-border p-10 flex flex-col gap-8 rounded-none">
        <div className="flex flex-col gap-2 text-center">
          <button 
            onClick={() => router.push("/")}
            className="font-heading text-xl font-bold tracking-tight text-primary uppercase focus:outline-none"
          >
            SparkBoard.
          </button>
          <span className="font-sans text-xs uppercase tracking-wider text-secondary">
            Sign in to your account
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Name (Optional)"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full mt-2"
            isLoading={isLoading}
          >
            Sign In with Email
          </Button>
        </form>

        <div className="flex flex-col gap-4 border-t border-border pt-6">
          <Button
            variant="secondary"
            onClick={() => signIn("Jane Doe", "jane@example.com")}
          >
            Instant Demo Bypass (Jane Doe)
          </Button>
          <div className="text-center">
            <button
              onClick={() => router.push("/auth/signup")}
              className="font-sans text-xs text-secondary hover:text-accent underline transition-colors"
            >
              Don't have an account? Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
