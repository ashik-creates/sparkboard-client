"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/auth-context";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

// ─── Shared text style — one size, used everywhere (desktop + mobile) ────────

const NAV_TEXT = "font-sans text-xs uppercase tracking-widest";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLinkData {
  label: string;
  href: string;
  /** Exact match instead of startsWith for root "/" */
  exact?: boolean;
}

// ─── Nav link sets ────────────────────────────────────────────────────────────

const LOGGED_OUT_LINKS: NavLinkData[] = [
  { label: "Home", href: "/", exact: true },
  { label: "Sparks", href: "/ideas" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

const LOGGED_IN_LINKS: NavLinkData[] = [
  { label: "Home", href: "/", exact: true },
  { label: "Sparks", href: "/ideas" },
  { label: "Add Spark", href: "/add-idea" },
  { label: "Manage Sparks", href: "/manage-ideas" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

// ─── Shared active-link check (desktop + mobile both use this) ───────────────

function isLinkActive(pathname: string, link: NavLinkData) {
  return link.exact ? pathname === link.href : pathname.startsWith(link.href);
}

// ─── NavLink atom (desktop) ───────────────────────────────────────────────────

function NavLink({ href, label, exact = false }: NavLinkData) {
  const pathname = usePathname();
  const active = isLinkActive(pathname, { href, label, exact });

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`
        relative ${NAV_TEXT} whitespace-nowrap
        transition-colors duration-200 pb-0.5
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent
        ${
          active
            ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-primary"
            : "text-secondary hover:text-primary"
        }
      `}
    >
      {label}
    </Link>
  );
}

// ─── Hamburger icon ───────────────────────────────────────────────────────────

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="flex flex-col gap-[5px] w-5">
      <span
        className={`block h-[1.5px] bg-primary origin-center transition-transform duration-200 ${
          open ? "rotate-45 translate-y-[7px]" : ""
        }`}
      />
      <span
        className={`block h-[1.5px] bg-primary transition-opacity duration-200 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-[1.5px] bg-primary origin-center transition-transform duration-200 ${
          open ? "-rotate-45 -translate-y-[7px]" : ""
        }`}
      />
    </span>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar() {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // ── Close drawer on route change ─────────────────────────────────────────
  // Adjusted during render (not in an effect) per React's guidance on
  // deriving state from a prop change — avoids an extra cascading render.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully.");
    } catch {
      toast.error("Failed to sign out.");
    }
  };

  const navLinks = user ? LOGGED_IN_LINKS : LOGGED_OUT_LINKS;

  // ── Scroll shadow ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Body scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* ────────────────────────── Header bar ────────────────────────────── */}
      <header
        role="banner"
        className={`
          fixed top-0 left-0 right-0 z-50
          h-16 border-b border-border bg-background
          transition-shadow duration-300
          ${scrolled ? "shadow-[0_1px_12px_0_rgba(17,17,17,0.06)]" : ""}
        `}
      >
        {/*
          Flex + justify-between instead of grid-cols-[1fr_auto_1fr]:
          a hidden center nav can't reliably collapse an "auto" grid track
          to zero width across browsers, which is why the hamburger wasn't
          landing flush at the far right on small screens. With flex, the
          logo and the right-hand group are simply pushed to opposite ends
          whenever the center nav is hidden — no track-sizing ambiguity.
        */}
        <div className="h-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between gap-4">
          {/* ── Left: Logo ──────────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="SparkBoard — go to homepage"
            className="font-heading text-lg font-bold uppercase tracking-tight text-primary hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent shrink-0"
          >
            SparkBoard.
          </Link>

          {/* ── Center: Nav links (desktop only) ────────────────────────── */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex flex-1 items-center justify-center gap-7"
          >
            {navLinks.map((link) => (
              <NavLink key={`${link.href}-${link.label}`} {...link} />
            ))}
          </nav>

          {/* ── Right: Actions ──────────────────────────────────────────── */}
          <div className="flex items-center justify-end gap-4 shrink-0">
            {/* Loading skeleton */}
            {loading && (
              <div className="hidden lg:block w-28 h-4 bg-border animate-pulse" />
            )}

            {/* Authenticated */}
            {!loading && user && (
              <div className="hidden lg:flex items-center gap-5">
                {/* "hi | Name" greeting */}
                <span className={`${NAV_TEXT} text-secondary select-none`}>
                  hi&nbsp;
                  <span className={`${NAV_TEXT} text-primary border-l border-border pl-3 ml-0.5`}>
                    {user.name.split(" ")[0]}
                  </span>
                </span>

                {/* Sign out — subtle text button */}
                <button
                  onClick={handleSignOut}
                  className={`${NAV_TEXT} text-secondary hover:text-primary border-b border-transparent hover:border-secondary pb-0.5 transition-all duration-200`}
                >
                  Sign Out
                </button>
              </div>
            )}

            {/* Unauthenticated */}
            {!loading && !user && (
              <div className="hidden lg:flex items-center gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => router.push("/auth/signin")}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => router.push("/auth/signup")}
                >
                  Get Started
                </Button>
              </div>
            )}

            {/* Mobile hamburger — always the last item, flush right */}
            <button
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden flex items-center justify-center w-9 h-9 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────── Mobile drawer ────────────────────────── */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        className={`
          fixed inset-x-0 top-16 bottom-0 z-40 bg-background
          flex flex-col overflow-y-auto
          transition-all duration-[250ms] ease-out lg:hidden
          ${
            mobileOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }
        `}
      >
        {/* Nav link list */}
        <nav aria-label="Mobile main navigation" className="flex flex-col">
          {navLinks.map((link) => {
            const active = isLinkActive(pathname, link);
            return (
              <Link
                key={`mobile-${link.href}-${link.label}`}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={closeMobile}
                className={`
                  px-6 py-4 ${NAV_TEXT}
                  border-b border-border
                  transition-colors duration-150
                  ${
                    active
                      ? "text-primary bg-surface font-semibold"
                      : "text-secondary hover:text-primary hover:bg-surface"
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Auth section */}
        <div className="px-6 py-8 flex flex-col gap-3 border-t border-border mt-auto">
          {loading && <div className="w-full h-10 bg-border animate-pulse" />}

          {!loading && user && (
            <>
              {/* User greeting strip */}
              <div className="flex items-center justify-between py-3 border-b border-border mb-2">
                <div className="flex flex-col gap-1">
                  <span className={`font-heading ${NAV_TEXT} font-bold text-primary`}>
                    {user.name}
                  </span>
                  <span className={`${NAV_TEXT} text-secondary`}>{user.email}</span>
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="w-fit mt-2"
                onClick={() => {
                  closeMobile();
                  handleSignOut();
                }}
              >
                Sign Out
              </Button>
            </>
          )}

          {!loading && !user && (
            <>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => {
                  closeMobile();
                  router.push("/auth/signup");
                }}
              >
                Get Started
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => {
                  closeMobile();
                  router.push("/auth/signin");
                }}
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Spacer — offsets fixed header height */}
      <div aria-hidden="true" className="h-16" />
    </>
  );
}