import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

const flavors = [
  {
    name: "Black Cherry",
    short: "CHERRY",
    src: "/images/optimized/can-black-cherry-512.png",
    thumb: "/images/optimized/can-black-cherry-256.png",
    color: "#5E2133",
    glow: "#FF80BC",
  },
  {
    name: "Grape Glow",
    short: "GRAPE",
    src: "/images/optimized/can-grape-512.png",
    thumb: "/images/optimized/can-grape-256.png",
    color: "#7A35C6",
    glow: "#B88CFF",
  },
  {
    name: "Watermelon Wave",
    short: "MELON",
    src: "/images/optimized/can-watermelon-512.png",
    thumb: "/images/optimized/can-watermelon-256.png",
    color: "#FF4F5E",
    glow: "#1FE6A8",
  },
  {
    name: "Lemon Lime",
    short: "LIME",
    src: "/images/optimized/can-lemon-lime-512.png",
    thumb: "/images/optimized/can-lemon-lime-256.png",
    color: "#7BBE21",
    glow: "#FFE64D",
  },
  {
    name: "Strawberry Lemon",
    short: "BERRY",
    src: "/images/optimized/can-strawberry-512.png",
    thumb: "/images/optimized/can-strawberry-256.png",
    color: "#FF4F8E",
    glow: "#FFE64D",
  },
];

export default function RotatingCanSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canTiltRef = useRef<HTMLDivElement>(null);
  const canSpinRef = useRef<HTMLDivElement>(null);
  const canRef = useRef<HTMLImageElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const orbitRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const isSwitching = useRef(false);

  const activeFlavor = flavors[activeIndex];

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const switchFlavor = useCallback(
    (nextIndex: number) => {
      const currentIndex = activeIndexRef.current;
      if (nextIndex === currentIndex || isSwitching.current) return;
      isSwitching.current = true;

      const direction = nextIndex > currentIndex ? 1 : -1;
      const tl = gsap.timeline({
        onComplete: () => {
          isSwitching.current = false;
        },
      });

      tl.to(canSpinRef.current, {
        rotateY: 95 * direction,
        scale: 0.9,
        opacity: 0,
        duration: 0.24,
        ease: "power2.in",
      });

      tl.call(() => {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      });

      tl.fromTo(
        canSpinRef.current,
        { rotateY: -95 * direction, scale: 0.9, opacity: 0 },
        { rotateY: 0, scale: 1, opacity: 1, duration: 0.42, ease: "back.out(1.8)" }
      );
    },
    []
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      switchFlavor((activeIndexRef.current + 1) % flavors.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [switchFlavor]);

  useEffect(() => {
    let removePointerInteraction = () => {};

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.to(orbitRefs.current.filter(Boolean), {
        y: -18,
        rotate: 6,
        duration: 1.8,
        ease: "sine.inOut",
        stagger: 0.12,
        repeat: -1,
        yoyo: true,
      });

      const section = sectionRef.current;
      if (!section) return;

      const handlePointerMove = (event: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const x = px - 0.5;
        const y = py - 0.5;

        glowRef.current?.style.setProperty("--spot-x", `${px * 100}%`);
        glowRef.current?.style.setProperty("--spot-y", `${py * 100}%`);

        gsap.to(canTiltRef.current, {
          x: x * 36,
          y: y * 22,
          rotateY: x * 20,
          rotateX: y * -16,
          duration: 0.35,
          ease: "power3.out",
          overwrite: "auto",
        });

        wordRefs.current.forEach((word, index) => {
          if (!word) return;
          const speed = [28, -22, 16, -26][index] ?? 18;
          gsap.to(word, {
            x: x * speed,
            y: y * speed * 0.6,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      };

      const handlePointerLeave = () => {
        gsap.to(canTiltRef.current, {
          x: 0,
          y: 0,
          rotateY: 0,
          rotateX: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.65)",
        });

        wordRefs.current.forEach((word) => {
          if (!word) return;
          gsap.to(word, { x: 0, y: 0, duration: 0.55, ease: "power3.out" });
        });
      };

      section.addEventListener("pointermove", handlePointerMove, { passive: true });
      section.addEventListener("pointerleave", handlePointerLeave);

      removePointerInteraction = () => {
        section.removeEventListener("pointermove", handlePointerMove);
        section.removeEventListener("pointerleave", handlePointerLeave);
      };
    }, sectionRef);

    return () => {
      removePointerInteraction();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden py-20"
      style={{
        background:
          "linear-gradient(135deg, #89E8FF 0%, #B88CFF 42%, #FFB6C8 68%, #FFE64D 100%)",
      }}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-95"
        style={{
          background:
            "radial-gradient(circle 360px at var(--spot-x, 50%) var(--spot-y, 45%), rgba(255,255,255,0.62), rgba(255,255,255,0.16) 28%, transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeFlavor.glow}66, transparent 34%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:74px_74px] opacity-25 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-7xl items-center justify-center px-6 perspective-1000">
        <div className="absolute inset-0 pointer-events-none select-none">
          <span
            ref={(el) => {
              wordRefs.current[0] = el;
            }}
            className="absolute left-[8%] top-[4%] font-fredoka text-7xl font-bold text-fizzi-coral text-pop-shadow md:text-[126px]"
          >
            SIP
          </span>
          <span
            ref={(el) => {
              wordRefs.current[1] = el;
            }}
            className="absolute right-[12%] top-[24%] font-fredoka text-6xl font-bold text-fizzi-yellow text-pop-shadow md:text-[104px]"
          >
            WHAT
          </span>
          <span
            ref={(el) => {
              wordRefs.current[2] = el;
            }}
            className="absolute left-[2%] top-[48%] whitespace-nowrap font-fredoka text-7xl font-bold text-fizzi-mint text-pop-shadow md:text-[148px]"
          >
            YOU
          </span>
          <span
            ref={(el) => {
              wordRefs.current[3] = el;
            }}
            className="absolute bottom-[8%] right-[7%] font-fredoka text-7xl font-bold text-fizzi-coral text-pop-shadow md:text-[134px]"
          >
            LOVE
          </span>
        </div>

        <div className="absolute inset-0 hidden md:block">
          {flavors.map((flavor, index) => {
            const positions = [
              "left-[9%] top-[16%]",
              "right-[9%] top-[18%]",
              "left-[14%] bottom-[13%]",
              "right-[18%] bottom-[16%]",
              "left-[46%] top-[3%]",
            ];

            return (
              <button
                key={flavor.name}
                ref={(el) => {
                  orbitRefs.current[index] = el;
                }}
                onClick={() => switchFlavor(index)}
                className={`absolute ${positions[index]} gpu-layer group pointer-events-auto rounded-full transition-transform duration-300 hover:scale-125`}
                aria-label={`Show ${flavor.name}`}
              >
                <span
                  className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                  style={{ backgroundColor: flavor.glow, opacity: index === activeIndex ? 0.9 : 0.45 }}
                />
                <img
                  src={flavor.thumb}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className={`relative h-24 w-16 object-contain drop-shadow-[0_22px_34px_rgba(45,31,62,0.24)] transition-all duration-300 md:h-36 md:w-24 ${
                    index === activeIndex ? "scale-110" : "opacity-75"
                  }`}
                />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 font-quicksand text-sm font-black text-fizzi-dark-purple shadow-lg">
                  {flavor.short}
                </span>
              </button>
            );
          })}
        </div>

        <div ref={canTiltRef} className="relative z-20 preserve-3d gpu-layer">
          <div className="absolute -inset-16 rounded-full blur-3xl" style={{ backgroundColor: activeFlavor.glow, opacity: 0.45 }} />
          <div className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-white/35 shadow-[0_0_80px_rgba(255,255,255,0.52)] animate-spin [animation-duration:18s] md:h-[470px] md:w-[470px]" />
          <div className="absolute left-1/2 top-1/2 h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[16px] border-fizzi-yellow/25 animate-spin [animation-direction:reverse] [animation-duration:24s] md:h-[610px] md:w-[610px]" />

          <div
            className="absolute -right-14 top-8 hidden rounded-full px-5 py-3 font-quicksand text-base font-black uppercase tracking-wide text-white shadow-[0_18px_38px_rgba(45,31,62,0.28)] md:block"
            style={{ backgroundColor: activeFlavor.color }}
          >
            {activeFlavor.name}
          </div>
          <div className="absolute -left-16 bottom-12 hidden rounded-full bg-white/95 px-5 py-3 font-quicksand text-base font-black uppercase tracking-wide text-fizzi-dark-purple shadow-[0_18px_38px_rgba(45,31,62,0.16)] md:block">
            Keep spinning
          </div>

          <div ref={canSpinRef} className="relative z-10 preserve-3d">
            <img
              ref={canRef}
              src={activeFlavor.src}
              alt={`${activeFlavor.name} Fizzi Can`}
              loading="lazy"
              decoding="async"
              className="w-56 object-contain drop-shadow-[0_44px_70px_rgba(45,31,62,0.42)] gpu-layer md:w-80 lg:w-96"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
