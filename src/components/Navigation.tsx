import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { sections } from "~/data/sections";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isHome = currentPath === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      setScrolled(scrollY > 10);
    };

    // Check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isScrolledOrOpen = scrolled || isMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolledOrOpen ? "shadow-lg py-4" : "bg-transparent py-6"
      }`}
      data-scrolled={isScrolledOrOpen ? "true" : "false"}
      data-home={isHome ? "true" : "false"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            hirefrank
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {sections
              .filter((section) => section.show)
              .map((section) => {
                const isActive =
                  (currentPath === section.url && section.url !== "/") ||
                  (section.url === "/" && currentPath === "/");
                return (
                  <Link
                    key={section.url}
                    to={section.url}
                    className="text-sm font-medium transition-opacity hover:opacity-80"
                    data-active={isActive ? "true" : "false"}
                  >
                    {section.label}
                  </Link>
                );
              })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              data-cal-link="hirefrank/discovery-call-initial"
              data-cal-namespace="discovery-call-initial"
              data-cal-config='{"layout":"month_view","theme":"light"}'
              className="btn-primary text-sm px-5 pt-4 pb-3.5 cursor-pointer inline-flex items-center justify-center"
            >
              Book a Free Intro Call
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 -m-1 rounded-lg active:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 shadow-lg p-4 flex flex-col space-y-4 h-screen"
          style={{ backgroundColor: "hsl(30, 10%, 8%)", borderTop: "1px solid hsl(30, 12%, 22%)" }}
        >
          {sections
            .filter((section) => section.show)
            .map((section) => {
              const isActive =
                (currentPath === section.url && section.url !== "/") ||
                (section.url === "/" && currentPath === "/");
              return (
                <Link
                  key={section.url}
                  to={section.url}
                  className="text-lg font-medium py-4 px-4 -mx-4 rounded-lg active:bg-white/5 transition-colors"
                  style={{
                    color: isActive ? "hsl(14, 80%, 65%)" : "hsl(30, 8%, 75%)",
                    borderBottom: "1px solid hsl(30, 12%, 22%)",
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {section.label}
                </Link>
              );
            })}
          <button
            data-cal-link="hirefrank/discovery-call-initial"
            data-cal-namespace="discovery-call-initial"
            data-cal-config='{"layout":"month_view"}'
            className="btn-primary text-center w-full mt-4 py-4 cursor-pointer"
          >
            Book a Free Intro Call
          </button>
        </div>
      )}
    </header>
  );
}
