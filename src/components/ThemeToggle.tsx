import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const savedTheme = window.localStorage.getItem("fizzi-theme");
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("fizzi-theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-white/80 text-fizzi-dark-purple shadow-[0_14px_28px_rgba(45,31,62,0.14)] ring-1 ring-fizzi-dark-purple/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-fizzi-coral dark:bg-fizzi-dark-purple/85 dark:text-fizzi-yellow dark:ring-white/20"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,230,77,0.45),rgba(255,128,188,0.32),rgba(137,232,255,0.38))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <Sun className={`relative h-5 w-5 transition-all duration-300 ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
      <Moon className={`absolute h-5 w-5 transition-all duration-300 ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
    </button>
  );
}
