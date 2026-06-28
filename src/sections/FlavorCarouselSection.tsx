import { useState, useRef, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FlavorSlide {
  name: string;
  price: string;
  canImage: string;
  thumbImage: string;
  blobColor: string;
  accentColor: string;
  background: string;
  tagline: string;
  words: string[];
}

const flavors: FlavorSlide[] = [
  {
    name: "Grape Goodness",
    price: "12 cans - $35.99",
    canImage: "/images/optimized/can-grape-512.png",
    thumbImage: "/images/optimized/can-grape-256.png",
    blobColor: "#B88CFF",
    accentColor: "#FFE64D",
    background: "linear-gradient(135deg, #5B2B86 0%, #B88CFF 48%, #89E8FF 100%)",
    tagline: "jammy, bright, and just the right amount of purple punch",
    words: ["bold", "grape", "glow"],
  },
  {
    name: "Black Cherry",
    price: "12 cans - $35.99",
    canImage: "/images/optimized/can-black-cherry-512.png",
    thumbImage: "/images/optimized/can-black-cherry-256.png",
    blobColor: "#5E2133",
    accentColor: "#FF80BC",
    background: "linear-gradient(135deg, #2D1F3E 0%, #5E2133 52%, #FF4F2E 100%)",
    tagline: "deep, dark cherry that makes a statement",
    words: ["dark", "cherry", "rush"],
  },
  {
    name: "Watermelon Crush",
    price: "12 cans - $35.99",
    canImage: "/images/optimized/can-watermelon-512.png",
    thumbImage: "/images/optimized/can-watermelon-256.png",
    blobColor: "#7BA344",
    accentColor: "#1FE6A8",
    background: "linear-gradient(135deg, #1FE6A8 0%, #BDF34A 45%, #FF80BC 100%)",
    tagline: "tastes like summer in a can",
    words: ["melon", "fresh", "wave"],
  },
  {
    name: "Lemon Lime",
    price: "12 cans - $35.99",
    canImage: "/images/optimized/can-lemon-lime-512.png",
    thumbImage: "/images/optimized/can-lemon-lime-256.png",
    blobColor: "#9BC44D",
    accentColor: "#13BDF2",
    background: "linear-gradient(135deg, #BDF34A 0%, #FFE64D 45%, #13BDF2 100%)",
    tagline: "zesty, crisp, and refreshingly sharp",
    words: ["lime", "zing", "snap"],
  },
  {
    name: "Strawberry Lemon",
    price: "12 cans - $35.99",
    canImage: "/images/optimized/can-strawberry-512.png",
    thumbImage: "/images/optimized/can-strawberry-256.png",
    blobColor: "#FF80BC",
    accentColor: "#FFE64D",
    background: "linear-gradient(135deg, #FF80BC 0%, #FFE64D 52%, #FF4F2E 100%)",
    tagline: "sweet strawberry meets zingy lemon",
    words: ["berry", "lemon", "spark"],
  },
];

function BlobShape({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className="absolute inset-0 w-full h-full transition-colors duration-500"
      style={{ filter: "blur(0px)" }}
    >
      <path
        d="M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,347Q39,287,66.5,205.5Q94,124,166,91Q238,58,314,71Q390,84,436,149.5Q482,215,461.5,267.5Q441,320,440.5,320.5Z"
        fill={color}
        opacity="0.9"
      />
    </svg>
  );
}

export default function FlavorCarouselSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const activeFlavor = flavors[activeIndex];

  useEffect(() => {
    if (!blobRef.current) return;

    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.out" },
    });

    tl.fromTo(
      blobRef.current,
      { scale: 0.92, opacity: 0.8 },
      { scale: 1, opacity: 1, repeat: -1, yoyo: true, duration: 3 }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const animateTransition = useCallback(
    (newIndex: number, dir: "left" | "right") => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      });

      const xOut = dir === "right" ? -50 : 50;
      const xIn = dir === "right" ? 50 : -50;

      tl.to(canRef.current, {
        opacity: 0,
        x: xOut,
        rotate: dir === "right" ? -12 : 12,
        duration: 0.3,
        ease: "power2.in",
      });

      tl.to(
        textRef.current,
        {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease: "power2.in",
        },
        "<"
      );

      tl.call(() => {
        setActiveIndex(newIndex);
      });

      tl.fromTo(
        canRef.current,
        { opacity: 0, x: xIn, rotate: dir === "right" ? 14 : -14, scale: 0.86 },
        { opacity: 1, x: 0, rotate: 0, scale: 1, duration: 0.42, ease: "back.out(1.8)" }
      );

      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
        "-=0.1"
      );
    },
    []
  );

  const goNext = useCallback(() => {
    if (isAnimating.current) return;
    const newIndex = activeIndex === flavors.length - 1 ? 0 : activeIndex + 1;
    animateTransition(newIndex, "right");
  }, [activeIndex, animateTransition]);

  const goPrev = useCallback(() => {
    if (isAnimating.current) return;
    const newIndex = activeIndex === 0 ? flavors.length - 1 : activeIndex - 1;
    animateTransition(newIndex, "left");
  }, [activeIndex, animateTransition]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goPrev();
      } else if (e.key === "ArrowRight") {
        goNext();
      }
    };

    section.addEventListener("keydown", handleKeyDown);
    return () => {
      section.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goPrev]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.hidden || isAnimating.current) return;
      const newIndex = activeIndex === flavors.length - 1 ? 0 : activeIndex + 1;
      animateTransition(newIndex, "right");
    }, 4800);

    return () => window.clearInterval(timer);
  }, [activeIndex, animateTransition]);

  useGSAP(
    () => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="carousel"
      ref={sectionRef}
      className="relative w-full min-h-[90vh] flex flex-col items-center justify-center py-20 overflow-hidden transition-colors duration-700"
      style={{ background: activeFlavor.background }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(255,255,255,0.36),transparent_24%),radial-gradient(circle_at_80%_68%,rgba(255,255,255,0.24),transparent_26%)] animate-color-shift" />
      <div className="absolute top-8 left-0 flex w-[200%] animate-slide-loop text-white/20 font-fredoka text-5xl md:text-8xl font-bold whitespace-nowrap pointer-events-none">
        {activeFlavor.words.concat(activeFlavor.words).map((word, i) => (
          <span key={`${word}-${i}`} className="mx-6 uppercase">
            {word}
          </span>
        ))}
      </div>

      <h2 className="font-fredoka text-5xl md:text-6xl font-bold text-white mb-12 text-center relative z-10 text-pop-shadow animate-pop-in">
        Find Your Flavor
      </h2>

      <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center px-4">
        <button
          onClick={goPrev}
          className="absolute left-4 md:left-8 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 hover:bg-white/40 active:scale-95 shadow-lg shadow-black/10 flex items-center justify-center transition-all duration-200"
          aria-label="Previous flavor"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </button>

        <div className="relative flex flex-col items-center">
          <div className="absolute -top-12 flex gap-3">
            {activeFlavor.words.map((word, i) => (
              <span
                key={word}
                className="rounded-full bg-white/90 px-4 py-2 font-quicksand text-base font-black text-fizzi-dark-purple shadow-[0_14px_28px_rgba(0,0,0,0.16)] animate-pop-in"
                style={{ color: activeFlavor.blobColor, animationDelay: `${i * 0.1}s` }}
              >
                {word}
              </span>
            ))}
          </div>
          <div
            ref={blobRef}
            className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] transition-colors duration-500 gpu-layer"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -55%)" }}
          >
            <BlobShape color={activeFlavor.blobColor} />
            <div className="absolute inset-0 rounded-full bg-white/10 mix-blend-screen" />
            <div
              className="absolute inset-10 rounded-full blur-2xl animate-pulse"
              style={{ backgroundColor: activeFlavor.accentColor, opacity: 0.42 }}
            />
          </div>

          <img
            ref={canRef}
            src={activeFlavor.canImage}
            alt={activeFlavor.name}
            loading="lazy"
            decoding="async"
            className="relative z-10 w-52 object-contain drop-shadow-[0_38px_54px_rgba(0,0,0,0.32)] gpu-layer hover:scale-110 transition-transform duration-300 md:w-72 lg:w-80"
            draggable={false}
          />

          <div ref={textRef} className="relative z-10 text-center mt-6">
            <h3 className="font-fredoka text-3xl md:text-5xl font-bold text-white text-pop-shadow">
              {activeFlavor.name}
            </h3>
            <p className="font-quicksand text-lg md:text-xl font-black text-white mt-2">
              {activeFlavor.price}
            </p>
            <p className="mx-auto mt-3 max-w-sm font-quicksand text-base md:text-lg copy-crisp-light">
              {activeFlavor.tagline}
            </p>
          </div>
        </div>

        <button
          onClick={goNext}
          className="absolute right-4 md:right-8 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 hover:bg-white/40 active:scale-95 shadow-lg shadow-black/10 flex items-center justify-center transition-all duration-200"
          aria-label="Next flavor"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
        </button>
      </div>

      <div className="flex gap-3 mt-10 relative z-10">
        {flavors.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i !== activeIndex && !isAnimating.current) {
                const dir = i > activeIndex ? "right" : "left";
                animateTransition(i, dir as "left" | "right");
              }
            }}
            className={`h-3 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-8 bg-white scale-110" : "w-3 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to flavor ${i + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 mt-8 flex flex-wrap items-end justify-center gap-4 px-4">
        {flavors.map((flavor, i) => (
          <button
            key={flavor.name}
            onClick={() => {
              if (i !== activeIndex && !isAnimating.current) {
                animateTransition(i, i > activeIndex ? "right" : "left");
              }
            }}
            className={`relative rounded-full bg-white/20 p-2 shadow-[0_16px_32px_rgba(0,0,0,0.16)] backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:bg-white/35 ${
              i === activeIndex ? "scale-[1.15] ring-4 ring-white/70" : "scale-100"
            }`}
            aria-label={`Show ${flavor.name}`}
          >
            <img
              src={flavor.thumbImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="h-16 w-10 object-contain drop-shadow-lg md:h-20 md:w-12"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
