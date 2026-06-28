import { useEffect, useRef } from "react";
import gsap from "gsap";

interface FeatureSectionProps {
  kicker: string;
  heading: string;
  description: string;
  canImage: string;
  companionImage?: string;
  canAlt: string;
  backgroundColor: string;
  accentColor: string;
  layout: "text-left" | "text-right";
  id?: string;
}

export default function FeatureSection({
  kicker,
  heading,
  description,
  canImage,
  companionImage,
  canAlt,
  backgroundColor,
  accentColor,
  layout,
  id,
}: FeatureSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0, rotate: -1 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.9,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        canRef.current,
        { y: 90, opacity: 0, scale: 0.75, rotate: layout === "text-right" ? -14 : 14 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: "elastic.out(1, 0.6)",
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [layout]);

  const textContent = (
    <div ref={contentRef} className="flex-1 max-w-lg relative z-10">
      <span
        className="inline-flex mb-5 rounded-full bg-white/90 px-5 py-2 font-quicksand text-base md:text-lg font-black text-fizzi-dark-purple shadow-[0_12px_24px_rgba(45,31,62,0.12)] animate-pop-in"
        style={{ color: accentColor }}
      >
        {kicker}
      </span>
      <h2 className="font-fredoka text-5xl md:text-7xl font-bold text-white leading-tight text-pop-shadow">
        {heading}
      </h2>
      <p className="font-quicksand text-xl md:text-2xl copy-crisp-light mt-6">
        {description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        {["real fruit", "prebiotic fizz", "20 calories"].map((label, index) => (
          <span
            key={label}
            className="rounded-full bg-fizzi-dark-purple px-4 py-2 font-quicksand text-base font-black text-white shadow-[0_10px_22px_rgba(45,31,62,0.18)] animate-pop-in"
            style={{ animationDelay: `${index * 0.12}s` }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );

  const canContent = (
    <div className="flex-1 relative flex min-h-[360px] items-center justify-center">
      <div
        className="absolute h-64 w-64 rounded-full bg-white/35 blur-2xl animate-pulse"
        style={{ boxShadow: `0 0 120px ${accentColor}` }}
      />
      <div
        className="absolute h-72 w-72 rounded-full border-[18px] border-white/30 animate-spin"
        style={{ animationDuration: "18s" }}
      />
      {companionImage && (
        <img
          src={companionImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute right-[8%] top-8 hidden w-24 rotate-12 object-contain opacity-80 drop-shadow-[0_18px_28px_rgba(45,31,62,0.22)] animate-float gpu-layer md:block md:w-32"
        />
      )}
      <img
        ref={canRef}
        src={canImage}
        alt={canAlt}
        loading="lazy"
        decoding="async"
        className="relative z-10 w-52 object-contain drop-shadow-[0_34px_48px_rgba(45,31,62,0.34)] animate-float-slow gpu-layer hover:scale-110 hover:rotate-3 transition-transform duration-300 md:w-72 lg:w-80"
        draggable={false}
      />
    </div>
  );

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 overflow-hidden"
      style={{ background: backgroundColor }}
    >
      <div className="absolute inset-x-0 top-0 h-2 bg-white/45" />
      <div className="absolute -left-12 top-8 flex w-[200%] animate-slide-loop text-white/18 font-fredoka text-6xl md:text-8xl font-bold whitespace-nowrap pointer-events-none">
        <span className="mx-8">{kicker.toUpperCase()}</span>
        <span className="mx-8">WOW FIZZ</span>
        <span className="mx-8">{kicker.toUpperCase()}</span>
        <span className="mx-8">WOW FIZZ</span>
      </div>
      <div className="absolute bottom-8 left-0 flex w-[200%] animate-slide-loop text-fizzi-dark-purple/10 font-fredoka text-5xl md:text-7xl font-bold whitespace-nowrap pointer-events-none [animation-direction:reverse]">
        <span className="mx-8">CRISP</span>
        <span className="mx-8">BRIGHT</span>
        <span className="mx-8">JUICY</span>
        <span className="mx-8">FRESH</span>
      </div>
      <div
        className={`max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-16 ${
          layout === "text-right" ? "md:flex-row-reverse" : ""
        }`}
      >
        {textContent}
        {canContent}
      </div>
    </section>
  );
}
