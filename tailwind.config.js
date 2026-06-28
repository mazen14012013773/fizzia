/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        fizzi: {
          yellow: "#FFE64D",
          lime: "#BDF34A",
          blue: "#89E8FF",
          purple: "#B88CFF",
          "dark-purple": "#2D1F3E",
          coral: "#FF4F2E",
          orange: "#FF7A1A",
          pink: "#FF80BC",
          mint: "#1FE6A8",
          berry: "#D91E72",
          "electric-blue": "#13BDF2",
          "blob-purple": "#B88CFF",
          "blob-cherry": "#5E2133",
          "blob-green": "#7BA344",
          "blob-lime": "#9BC44D",
          "blob-pink": "#E8A0B0",
        },
      },
      fontFamily: {
        fredoka: ["Fredoka", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "bubble-float": {
          "0%": { transform: "translateY(100vh) translateX(0)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100px) translateX(20px)", opacity: "0" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pop-in": {
          "0%": { transform: "translateY(18px) scale(0.92)", opacity: "0" },
          "70%": { transform: "translateY(-4px) scale(1.03)", opacity: "1" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%) skewX(-18deg)" },
          "100%": { transform: "translateX(220%) skewX(-18deg)" },
        },
        "slide-loop": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spark-rise": {
          "0%": { transform: "translateY(24px) scale(0.5)", opacity: "0" },
          "20%": { opacity: "1" },
          "100%": { transform: "translateY(-90px) scale(1.2)", opacity: "0" },
        },
        "color-shift": {
          "0%, 100%": { filter: "saturate(1) hue-rotate(0deg)" },
          "50%": { filter: "saturate(1.25) hue-rotate(8deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        float: "float 3s ease-in-out infinite",
        "float-slow": "float-slow 4s ease-in-out infinite",
        "bubble-float": "bubble-float linear infinite",
        spin: "spin 10s linear infinite",
        bounce: "bounce 2s ease-in-out infinite",
        "pop-in": "pop-in 0.65s cubic-bezier(0.2, 0.9, 0.2, 1.15) both",
        wiggle: "wiggle 2.6s ease-in-out infinite",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        "slide-loop": "slide-loop 16s linear infinite",
        "spark-rise": "spark-rise 2.4s ease-out infinite",
        "color-shift": "color-shift 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
