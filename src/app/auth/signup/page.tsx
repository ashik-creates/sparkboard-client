"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineUserAdd } from "react-icons/hi";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    if (!name.trim()) {
      setError("Please enter your full name.");
      return false;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    const { data, error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    if (data) {
      window.location.href = "/";
      toast.success("Successfully created account!");
    }

    if (error) {
      setError(error.message as string);
    }

    setIsLoading(false);
  };

  const handleGoogleSignup = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <section className="min-h-screen bg-background flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md border border-border bg-surface p-10 shadow-sm">

        <div className="flex flex-col items-center gap-3">

          <Link
            href="/"
            className="font-heading text-3xl font-bold uppercase tracking-tight text-primary"
          >
            SparkBoard.
          </Link>

          <h1 className="font-heading text-2xl font-bold uppercase tracking-tight text-primary">
            Create Account
          </h1>

          <p className="text-center text-sm text-secondary leading-relaxed">
            Join SparkBoard and start organizing, validating and improving your startup ideas with AI.
          </p>

        </div>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">

          {error && (
            <div className="border border-red-300 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Minimum 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            <div className="flex items-center justify-center gap-2">
              <HiOutlineUserAdd size={18} />
              {isLoading ? "Creating Account..." : "Create Account"}
            </div>
          </Button>

        </form>

        <div className="my-8 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-secondary">
            Or
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Button
          variant="secondary"
          className="w-full"
          onClick={handleGoogleSignup}
        >
          <div className="flex items-center justify-center gap-3">
            <FcGoogle size={20} />
            Continue with Google
          </div>
        </Button>

        <p className="mt-8 text-center text-sm text-secondary">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-accent hover:text-accent-hover transition-colors"
          >
            Sign In
          </Link>
        </p>

      </div>
    </section>
  );
}