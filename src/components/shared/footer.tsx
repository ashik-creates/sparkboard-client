"use client";

const FOOTER_LINKS = {
  Product: [
    { label: "Explore Sparks", href: "/explore" },
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Community: [
    { label: "GitHub", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Discord", href: "#" },
  ],
  Legal: [
    { label: "Terms of Use", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Brand column */}
        <div className="md:col-span-1 flex flex-col gap-5">
          <span className="font-heading text-2xl font-bold tracking-tight text-primary uppercase">
            SparkBoard.
          </span>
          <p className="font-sans text-xs text-secondary leading-relaxed max-w-[180px]">
            AI-powered startup validation for founders who move fast.
          </p>
          {/* Live indicator */}
          <div className="flex items-center gap-2 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
            <span className="font-sans text-[10px] uppercase tracking-widest text-secondary">
              All systems operational
            </span>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([group, links]) => (
          <div key={group} className="flex flex-col gap-4">
            <h4 className="font-sans text-[10px] uppercase font-bold tracking-widest text-primary">
              {group}
            </h4>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-xs text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-sans text-[10px] text-secondary/60 uppercase tracking-wider">
            © {year} SparkBoard Inc. All rights reserved.
          </span>
          <span className="font-sans text-[10px] text-secondary/60 uppercase tracking-wider">
            Powered by Gemini AI
          </span>
        </div>
      </div>
    </footer>
  );
}
