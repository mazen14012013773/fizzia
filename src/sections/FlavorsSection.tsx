import { useEffect, useRef } from "react";
import gsap from "gsap";
import BubbleBackground from "@/components/BubbleBackground";

const canData = [
  {
    src: "/images/optimized/can-strawberry-512.png",
    alt: "Strawberry Lemon",
    label: "Berry Snap",
    note: "sweet pop",
    color: "#FF80BC",
    className: "left-[4%] top-[4%] w-28 md:left-[10%] md:top-[8%] md:w-44",
    rotate: -12,
  },
  {
    src: "/images/optimized/can-black-cherry-512.png",
    alt: "Black Cherry",
    label: "Dark Pop",
    note: "cherry drama",
    color: "#5E2133",
    className: "right-[10%] top-[0%] w-28 md:right-[20%] md:top-[4%] md:w-48",
    rotate: 10,
  },
  {
    src: "/images/optimized/can-grape-512.png",
    alt: "Grape",
    label: "Grape Glow",
    note: "purple rush",
    color: "#B88CFF",
    className: "left-[34%] top-[28%] w-32 md:left-[36%] md:top-[24%] md:w-52",
    rotate: -7,
  },
  {
    src: "/images/optimized/can-lemon-lime-512.png",
    alt: "Lemon Lime",
    label: "Lime Zing",
    note: "citrus snap",
    color: "#BDF34A",
    className: "left-[10%] bottom-[2%] w-28 md:left-[16%] md:bottom-[4%] md:w-44",
    rotate: 8,
  },
  {
    src: "/images/optimized/can-watermelon-512.png",
    alt: "Watermelon",
    label: "Melon Wave",
    note: "summer splash",
    color: "#1FE6A8",
    className: "right-[6%] bottom-[5%] w-32 md:right-[8%] md:bottom-[7%] md:w-52",
    rotate: -9,
  },
];

export default function FlavorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const playgroundRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let removePointerInteraction = () => {};

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { x: -70, opacity: 0, rotate: -2 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.75,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { y: 80, opacity: 0, scale: 0.72, rotate: -10 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.85,
          ease: "elastic.out(1, 0.65)",
          stagger: 0.08,
          scrollTrigger: {
            trigger: playgroundRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const section = sectionRef.current;
      if (!section) return;

      const handlePointerMove = (event: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          const depth = [38, -28, 20, -34, 30][index] ?? 22;
          gsap.to(card, {
            x: x * depth,
            y: y * depth * 0.72,
            rotate: canData[index].rotate + x * 8,
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
          });
        });

        gsap.to(headingRef.current, {
          x: x * 18,
          y: y * 10,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const handlePointerLeave = () => {
        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          gsap.to(card, {
            x: 0,
            y: 0,
            rotate: canData[index].rotate,
            duration: 0.65,
            ease: "elastic.out(1, 0.7)",
          });
        });
        gsap.to(headingRef.current, { x: 0, y: 0, duration: 0.45, ease: "power3.out" });
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
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-fizzi-lime via-fizzi-blue/70 to-fizzi-mint py-20"
    >
      <BubbleBackground count={18} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(255,128,188,0.48),transparent_22%),radial-gradient(circle_at_75%_22%,rgba(184,140,255,0.48),transparent_24%),radial-gradient(circle_at_68%_82%,rgba(255,230,77,0.46),transparent_25%)] animate-color-shift" />
      <div className="absolute top-2 left-0 flex w-[200%] animate-slide-loop text-fizzi-dark-purple/10 font-fredoka text-7xl font-bold whitespace-nowrap pointer-events-none md:text-9xl">
        <span className="mx-8">FIVE FLAVORS</span>
        <span className="mx-8">PICK YOUR VIBE</span>
        <span className="mx-8">FIVE FLAVORS</span>
        <span className="mx-8">PICK YOUR VIBE</span>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-10rem)] w-full max-w-7xl items-center gap-10 px-6 md:grid-cols-[0.85fr_1.15fr] md:px-12">
        <div ref={headingRef} className="relative z-20 text-left">
          <span className="mb-5 inline-flex rounded-full bg-white/90 px-5 py-2 font-quicksand text-base font-black uppercase tracking-wide text-fizzi-dark-purple shadow-[0_14px_28px_rgba(45,31,62,0.12)]">
            pick your mood
          </span>
          <h2 className="font-fredoka text-5xl font-bold leading-[0.98] text-fizzi-dark-purple text-pop-shadow md:text-7xl lg:text-[84px]">
            Pick your flavor,
            <br />
            find your mood
          </h2>
          <p className="mt-6 max-w-md font-quicksand text-xl copy-crisp">
            Each can is a little mood. Which one's calling your name?
          </p>
          <div className="mt-7 grid max-w-md grid-cols-2 gap-3">
            {canData.slice(0, 4).map((can, i) => (
              <span
                key={can.label}
                className="rounded-full bg-white/90 px-4 py-2 font-quicksand text-base font-black shadow-[0_12px_26px_rgba(45,31,62,0.12)] animate-pop-in"
                style={{ animationDelay: `${i * 0.1}s`, color: can.color }}
              >
                {can.label}
              </span>
            ))}
          </div>
        </div>

        <div
          ref={playgroundRef}
          className="relative min-h-[560px] w-full rounded-[36px] border border-white/25 bg-white/10 shadow-[inset_0_0_70px_rgba(255,255,255,0.18)] backdrop-blur-[2px]"
        >
          <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[18px] border-white/25 animate-spin [animation-duration:28s]" />
          <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-dashed border-white/45 animate-spin [animation-direction:reverse] [animation-duration:36s]" />

          {canData.map((can, i) => (
            <div
              key={can.alt}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`group absolute ${can.className} gpu-layer cursor-pointer`}
              style={{ rotate: `${can.rotate}deg` }}
            >
              <div
                className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100 md:h-44 md:w-44"
                style={{ backgroundColor: can.color, opacity: 0.52 }}
              />
              <div className="relative rounded-[28px] bg-white/18 p-3 shadow-[0_28px_48px_rgba(45,31,62,0.18)] ring-1 ring-white/35 backdrop-blur transition-all duration-300 group-hover:-translate-y-5 group-hover:scale-110 group-hover:bg-white/30 group-hover:shadow-[0_36px_70px_rgba(45,31,62,0.28)]">
                <img
                  src={can.src}
                  alt={can.alt}
                  loading="lazy"
                  decoding="async"
                  className="relative w-full object-contain drop-shadow-[0_24px_36px_rgba(45,31,62,0.28)]"
                  draggable={false}
                />
                <div className="absolute -bottom-8 left-1/2 min-w-max -translate-x-1/2 rounded-full bg-white px-4 py-2 text-center font-quicksand text-sm font-black uppercase shadow-[0_14px_30px_rgba(45,31,62,0.18)] transition-transform duration-300 group-hover:scale-110">
                  <span style={{ color: can.color }}>{can.label}</span>
                </div>
                <div
                  className="absolute -right-5 top-4 rotate-12 rounded-full px-3 py-1 font-quicksand text-xs font-black uppercase text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100"
                  style={{ backgroundColor: can.color }}
                >
                  {can.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
