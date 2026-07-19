"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaLocationDot,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="font-heading text-3xl font-bold uppercase tracking-tight text-primary"
          >
            Spark<span className="text-accent">Board</span>
          </Link>

          <p className="mt-6 max-w-sm leading-7 text-secondary">
            Discover, validate and improve startup ideas with AI. SparkBoard
            helps founders evaluate market potential, identify risks and refine
            business ideas before building.
          </p>

          <div className="mt-8 flex gap-3">
            <Link
              href="https://github.com/ashik-creates"
              target="_blank"
              className="border border-border bg-surface p-3 transition hover:border-accent hover:bg-accent hover:text-white"
            >
              <FaGithub size={18} />
            </Link>

            <Link
              href="https://linkedin.com/in/ashik-creates"
              target="_blank"
              className="border border-border bg-surface p-3 transition hover:border-accent hover:bg-accent hover:text-white"
            >
              <FaLinkedinIn size={18} />
            </Link>

            <Link
              href="https://facebook.com/ashik.aryan.52"
              target="_blank"
              className="border border-border bg-surface p-3 transition hover:border-accent hover:bg-accent hover:text-white"
            >
              <FaFacebookF size={18} />
            </Link>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="mb-6 font-heading text-lg font-bold uppercase tracking-widest text-primary">
            Explore
          </h3>

          <div className="flex flex-col gap-4 text-secondary">
            <Link href="/" className="transition hover:text-accent">
              Home
            </Link>

            <Link href="/ideas" className="transition hover:text-accent">
              Explore Ideas
            </Link>

            <Link href="/add-idea" className="transition hover:text-accent">
              Submit Idea
            </Link>

            <Link href="/manage-ideas" className="transition hover:text-accent">
              Manage Ideas
            </Link>
          </div>
        </div>

        {/* AI */}
        <div>
          <h3 className="mb-6 font-heading text-lg font-bold uppercase tracking-widest text-primary">
            AI Features
          </h3>

          <div className="flex flex-col gap-4 text-secondary">
            <Link href="/ideas" className="transition hover:text-accent">
              Startup Validation
            </Link>

            <Link href="/ideas" className="transition hover:text-accent">
              AI Improvement
            </Link>

            <Link href="/ideas" className="transition hover:text-accent">
              Community Ideas
            </Link>

            <Link href="/about" className="transition hover:text-accent">
              About SparkBoard
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-6 font-heading text-lg font-bold uppercase tracking-widest text-primary">
            Contact
          </h3>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <FaLocationDot className="mt-1 text-accent" />

              <span className="text-secondary">
                Gazipur, Dhaka, Bangladesh
              </span>
            </div>

            <div className="flex items-center gap-3">
              <MdEmail className="text-accent" />

              <a
                href="mailto:ashikorrahman8900@gmail.com"
                className="text-secondary transition hover:text-accent"
              >
                ashikorrahman8900@gmail.com
              </a>
            </div>

            <div className="border border-border bg-surface p-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent">
                System Status
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className="h-2 w-2 bg-green-500" />

                <span className="text-sm text-primary">
                  All AI services operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom */}
      <div className="border-t border-border">
        <section className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-center text-xs uppercase tracking-wider text-secondary md:flex-row md:items-center md:justify-between md:text-left">
          <p>
            © {new Date().getFullYear()} SparkBoard. All Rights Reserved.
          </p>

          <p>
            Built with <span className="text-accent">❤</span> using Next.js ·
            MongoDB · Gemini AI · Tailwind CSS
          </p>
        </section>
      </div>
    </footer>
  );
}