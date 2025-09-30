"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/components/utils/cn";
import { Button } from "@/components/ui/button";
const BrandLogo = dynamic(
  () => import("@/components/BrandLogo").then((m) => m.BrandLogo),
  { ssr: false }
);
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Marketing / landing navigation items
const navItems = [
  { href: "/#features", label: "Features", anchor: true },
  { href: "/#pricing", label: "Pricing", anchor: true },
  { href: "/#how-it-works", label: "How It Works", anchor: true },
  { href: "/#testimonials", label: "Testimonials", anchor: true },
  { href: "/#faq", label: "FAQ", anchor: true },
  { href: "/contact", label: "Contact" },
];

// Internal app navigation (dashboard experience)
const appNavItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tools/ai-tutor", label: "AI Tutor" },
  { href: "/tools/notes", label: "Smart Notes" },
  { href: "/study-flow", label: "Study Flow" }, // placeholder route
  { href: "/pyq", label: "PYQ" }, // placeholder route
];

export const NavBar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const { user, signOut } = useAuth();
  const isHome = pathname === "/" || pathname === "";
  const isAppSection = ["/dashboard", "/tools", "/onboarding"].some((p) =>
    pathname.startsWith(p)
  );
  const showAppNav = user && isAppSection;

  // Scroll & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      if (!isHome) return; // only track sections on landing page
      const sectionIds = [
        "hero",
        "features",
        "pricing",
        "how-it-works",
        "testimonials",
        "faq",
        "contact",
      ];
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = id;
          break;
        }
      }
      setActiveHash(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Close mobile on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ESC to close mobile menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  // ---------------- APP NAV (Authenticated internal area) -----------------
  if (showAppNav) {
    return (
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 pt-3 md:pt-4 flex justify-center">
          <div
            className={cn(
              "flex items-center w-full pointer-events-auto transition-colors",
              "rounded-2xl h-14 border shadow-sm backdrop-blur-sm",
              "px-4 lg:px-6 gap-6",
              scrolled
                ? "bg-slate-950/90 border-slate-800"
                : "bg-slate-900/70 border-slate-800/70"
            )}
            role="navigation"
            aria-label="Application"
          >
            <div className="flex items-center gap-6 min-w-0 flex-1">
              <BrandLogo size={30} priority className="shrink-0" />
              <nav className="hidden md:flex items-center gap-1 text-sm font-medium" aria-label="App sections">
                {appNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "px-3 py-2 rounded-md outline-none",
                        "text-[13px] tracking-wide transition-colors",
                        "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60",
                        isActive && "text-white bg-slate-800"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            {/* Profile menu */}
            <AppProfileMenu onLogout={signOut} />
          </div>
        </div>
      </header>
    );
  }

  // ---------------- MARKETING NAV (Public site) -----------------
  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div className="container mx-auto px-4 flex justify-center md:justify-between pt-3 md:pt-4">
        {/* Desktop floating shell */}
        <div
          className={cn(
            "hidden md:flex items-center w-full pointer-events-auto transition-all",
            "rounded-2xl px-4 h-14 border shadow-sm backdrop-blur-sm",
            scrolled || !isHome
              ? "bg-slate-950/85 border-slate-800 shadow-[0_2px_6px_-2px_rgba(0,0,0,0.5)]"
              : "bg-slate-900/50 border-slate-800/60"
          )}
          role="navigation"
          aria-label="Primary"
        >
          <div className="flex items-center gap-5 flex-1 min-w-0">
            <BrandLogo size={34} priority className="shrink-0" />
            <nav
              className="hidden lg:flex items-center gap-1 text-sm"
              aria-label="Primary sections"
            >
              {navItems.map((item) => {
                const isActive = item.anchor
                  ? activeHash && item.href.includes(`#${activeHash}`)
                  : pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 rounded-md font-medium text-[13px] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                      "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60",
                      isActive && "text-white bg-slate-800"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden md:inline-block text-sm text-slate-400 hover:text-slate-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  Dashboard
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => signOut()}
                  className="border-slate-600 hover:bg-slate-800"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="hidden md:inline-block text-sm text-slate-400 hover:text-slate-100 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  Sign In
                </Link>
                <Link href="/sign-up">
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-500 text-white shadow-sm hover:shadow-md"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile compact pill */}
        <div
          className={cn(
            "md:hidden flex items-center justify-between gap-3 w-full pointer-events-auto transition-all",
            "rounded-xl px-4 h-12 border backdrop-blur-sm",
            scrolled || !isHome
              ? "bg-slate-950/90 border-slate-800"
              : "bg-slate-900/60 border-slate-800/50"
          )}
        >
          <BrandLogo size={28} className="shrink-0" />
          <div className="flex items-center gap-2">
            {user ? (
              <Button
                size="sm"
                onClick={() => signOut()}
                className="h-8 px-3 bg-slate-800 hover:bg-slate-700"
              >
                Logout
              </Button>
            ) : (
              <Link href="/sign-in" className="hidden sm:inline-block">
                <Button
                  size="sm"
                  className="h-8 px-3 bg-blue-600 hover:bg-blue-500"
                >
                  Sign In
                </Button>
              </Link>
            )}
            <button
              className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-slate-700 bg-slate-900/70 hover:bg-slate-800 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle navigation"
              aria-expanded={open}
              aria-controls="mobile-nav-panel"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay & panel */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 transition-opacity",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={close}
        />
        <div
          className={cn(
            "absolute top-16 inset-x-0 mx-auto w-[92%] max-w-sm origin-top overflow-hidden rounded-2xl",
            "border border-slate-800 bg-slate-900 shadow-lg transition-transform duration-300",
            open ? "scale-100" : "scale-95"
          )}
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="p-4 flex flex-col">
            <div className="flex flex-col divide-y divide-border/60">
              {navItems.map((item) => {
                const isActive = item.anchor
                  ? activeHash && item.href.includes(`#${activeHash}`)
                  : pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className={cn(
                      "py-3 px-3 flex items-center justify-between text-sm font-medium transition-colors rounded-md outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
                      "text-slate-300 hover:text-white hover:bg-slate-800",
                      isActive && "text-white bg-slate-800"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 flex gap-3">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={close} className="flex-1">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-500"
                      size="sm"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      signOut();
                      close();
                    }}
                    variant="outline"
                    className="flex-1 border-slate-600 hover:bg-slate-700"
                    size="sm"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" onClick={close} className="flex-1">
                    <Button
                      className="w-full bg-slate-800 hover:bg-slate-700"
                      size="sm"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up" onClick={close} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-slate-600 hover:bg-slate-700"
                      size="sm"
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Simple in-component dropdown for profile/settings in app area
const AppProfileMenu: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full border",
          "border-slate-700 bg-slate-800/60 hover:bg-slate-700",
          "px-3 h-10 text-sm font-medium text-slate-200",
          "outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-[11px] font-semibold shadow-inner">
          U
        </div>
        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition" />
      </button>
      {open && (
        <div
          className="absolute right-0 mt-2 w-44 rounded-lg border border-slate-700 bg-slate-900 shadow-lg p-1 text-sm animate-in fade-in slide-in-from-top-2"
          role="menu"
        >
          <Link
            href="/settings" // placeholder
            className="block px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/70"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
          <button
            onClick={() => {
              onLogout();
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/70"
            role="menuitem"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};
