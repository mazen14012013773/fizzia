import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Shop", href: "#carousel" },
  { label: "Our Story", href: "#features" },
  { label: "What's Inside", href: "#features" },
  { label: "Say Hi", href: "#footer" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        backgroundColor: scrolled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.72)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [scrolled]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveLink(href);
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-colors"
      aria-label="Main navigation"
    >
      <a 
        href="#" 
        className="font-fredoka text-3xl md:text-[32px] font-bold text-fizzi-dark-purple focus:outline-none focus:ring-2 focus:ring-fizzi-coral rounded px-2 hover:scale-110 transition-transform duration-200 gpu-layer"
        aria-label="Fizzi Home"
      >
        fizzi
      </a>
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="font-quicksand text-lg font-black text-fizzi-dark-purple relative group focus:outline-none focus:ring-2 focus:ring-fizzi-coral rounded px-2 hover:-translate-y-0.5 transition-transform duration-200 gpu-layer"
            aria-current={activeLink === link.href ? "page" : undefined}
          >
            {link.label}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-fizzi-coral transition-all duration-300 group-hover:w-full group-focus:w-full" />
          </a>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close menu" : "Open mobile menu"}
        className="relative z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-fizzi-dark-purple shadow-[0_18px_40px_rgba(45,31,62,0.16)] ring-1 ring-fizzi-dark-purple/10 backdrop-blur transition-all duration-300 hover:scale-105 md:hidden"
      >
        <span className={`absolute block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
        <span className={`absolute block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
        <span className={`absolute block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
      </button>
      <div
        className={`absolute inset-x-0 top-full z-40 overflow-hidden bg-white/95 backdrop-blur-xl border-t border-white/70 shadow-2xl transition-all duration-300 md:hidden ${isMenuOpen ? "max-h-[360px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
      >
        <div className="flex flex-col gap-4 px-6 py-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-quicksand text-base font-black text-fizzi-dark-purple rounded-full px-4 py-3 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-fizzi-yellow/20"
              aria-current={activeLink === link.href ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </nav>
  );
}
