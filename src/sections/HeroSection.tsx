import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import BubbleBackground from "@/components/BubbleBackground";
import SodaCan from "@/components/SodaCan";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canLeftRef = useRef<HTMLImageElement>(null);
  const canRightRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const pupilRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sparkleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let removePointerInteraction = () => {};

    const ctx = gsap.context(() => {
      gsap.fromTo(
        canLeftRef.current,
        { x: -200, opacity: 0, rotate: -30 },
        { x: 0, opacity: 1, rotate: -15, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        canRightRef.current,
        { x: 200, opacity: 0, rotate: 30 },
        { x: 0, opacity: 1, rotate: 15, duration: 1.2, ease: "power3.out", delay: 0.5 }
      );
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.7 }
      );
      gsap.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1 }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", delay: 1.15 }
      );

      sparkleRefs.current.forEach((sparkle, i) => {
        if (!sparkle) return;
        gsap.fromTo(
          sparkle,
          { scale: 0, opacity: 0, rotate: -20 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.45,
            ease: "back.out(2)",
            delay: 0.95 + i * 0.08,
          }
        );
      });

      gsap.to(canLeftRef.current, {
        y: -80,
        rotate: -25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(canRightRef.current, {
        y: -60,
        rotate: 25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      const section = sectionRef.current;
      if (!section) return;

      const handlePointerMove = (event: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        const x = px - 0.5;
        const y = py - 0.5;

        gsap.to(mascotRef.current, {
          x: x * 34,
          y: y * 26,
          rotateY: x * 24,
          rotateX: y * -20,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });

        pupilRefs.current.forEach((pupil) => {
          if (!pupil) return;
          gsap.to(pupil, {
            x: x * 12,
            y: y * 10,
            duration: 0.28,
            ease: "power3.out",
            overwrite: "auto",
          });
        });

        gsap.to(textRef.current, {
          x: x * 18,
          y: y * 10,
          rotate: x * 1.2,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(canLeftRef.current, {
          x: x * -30,
          y: y * 18,
          rotate: -15 + x * -8,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(canRightRef.current, {
          x: x * 30,
          y: y * 18,
          rotate: 15 + x * 8,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const handlePointerLeave = () => {
        gsap.to(mascotRef.current, {
          x: 0,
          y: 0,
          rotateY: 0,
          rotateX: 0,
          duration: 0.75,
          ease: "elastic.out(1, 0.65)",
        });
        gsap.to(pupilRefs.current.filter(Boolean), {
          x: 0,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(textRef.current, {
          x: 0,
          y: 0,
          rotate: 0,
          duration: 0.5,
          ease: "power3.out",
        });
        gsap.to(canLeftRef.current, {
          x: 0,
          y: 0,
          rotate: -15,
          duration: 0.55,
          ease: "power3.out",
        });
        gsap.to(canRightRef.current, {
          x: 0,
          y: 0,
          rotate: 15,
          duration: 0.55,
          ease: "power3.out",
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
      className="relative min-h-screen w-full bg-[linear-gradient(135deg,#FFE64D_0%,#89E8FF_42%,#BDF34A_100%)] flex items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={mascotRef}
          className="absolute right-[13%] top-[20%] z-30 hidden h-28 w-28 rounded-[34px] bg-white/35 p-3 shadow-[0_24px_50px_rgba(45,31,62,0.18)] ring-1 ring-white/60 backdrop-blur-md preserve-3d gpu-layer md:block lg:right-[18%] lg:h-36 lg:w-36"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute -inset-5 rounded-full bg-fizzi-pink/35 blur-2xl animate-pulse" />
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[26px] bg-[linear-gradient(135deg,rgba(255,230,77,0.96),rgba(255,128,188,0.94)_52%,rgba(137,232,255,0.96))] shadow-[inset_0_0_24px_rgba(255,255,255,0.55)]">
            <span className="absolute -top-3 rounded-full bg-fizzi-dark-purple px-3 py-1 font-quicksand text-xs font-black uppercase text-white shadow-lg">
              fizz fox
            </span>
            <div className="flex gap-4">
              {[0, 1].map((eye) => (
                <span
                  key={eye}
                  className="relative grid h-8 w-8 place-items-center rounded-full bg-white shadow-[inset_0_2px_8px_rgba(45,31,62,0.18)] lg:h-10 lg:w-10"
                >
                  <span
                    ref={(el) => {
                      pupilRefs.current[eye] = el;
                    }}
                    className="block h-3 w-3 rounded-full bg-fizzi-dark-purple shadow-[0_0_0_3px_rgba(255,255,255,0.45)] lg:h-4 lg:w-4"
                  />
                </span>
              ))}
            </div>
            <div className="mt-4 h-3 w-12 rounded-b-full border-b-[6px] border-fizzi-dark-purple/85 lg:w-16" />
          </div>
        </div>
        {[
          { src: "/images/optimized/can-grape-256.png", cls: "left-[6%] bottom-[10%] hidden w-20 -rotate-12 opacity-80 md:block md:w-28", delay: "0.1s" },
          { src: "/images/optimized/can-watermelon-256.png", cls: "right-[7%] bottom-[12%] hidden w-20 rotate-12 opacity-80 md:block md:w-28", delay: "0.35s" },
        ].map((can) => (
          <img
            key={can.src}
            src={can.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className={`absolute ${can.cls} gpu-layer animate-float-slow drop-shadow-[0_18px_28px_rgba(45,31,62,0.24)]`}
            style={{ animationDelay: can.delay }}
          />
        ))}
        <div className="absolute inset-x-0 top-24 h-4 bg-white/35 animate-slide-loop" />
        <div className="absolute inset-x-0 bottom-24 h-3 bg-fizzi-coral/35 animate-slide-loop [animation-duration:12s]" />
        {["left-[14%] top-[28%]", "right-[18%] top-[22%]", "left-[24%] bottom-[24%]", "right-[25%] bottom-[30%]"].map((pos, i) => (
          <span
            key={pos}
            ref={(el) => { sparkleRefs.current[i] = el; }}
            className={`absolute ${pos} gpu-layer text-fizzi-dark-purple/70 font-fredoka text-2xl md:text-4xl animate-spark-rise`}
            style={{ animationDelay: `${i * 0.25}s` }}
          >
            +
          </span>
        ))}
      </div>
      <BubbleBackground count={22} />

      <div className="absolute top-0 left-0 right-0 h-20" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 pt-20 lg:px-6">
        <h1 className="font-fredoka text-4xl md:text-5xl font-bold text-fizzi-dark-purple mb-4 text-crisp">
          fizzi
        </h1>

        <div className="relative w-full flex flex-col items-center justify-center gap-6 py-8 md:py-12 lg:flex-row lg:gap-0">
          <SodaCan
            ref={canLeftRef}
            src="/images/optimized/can-black-cherry-512.png"
            alt="Black Cherry Fizzi Can"
            priority
            className="absolute left-0 md:left-[5%] w-32 md:w-48 lg:w-64 z-20 drop-shadow-[0_24px_45px_rgba(45,31,62,0.28)] animate-float-slow"
            style={{ transform: "rotate(-15deg)" }}
          />

          <div ref={textRef} className="relative z-10 text-center select-none px-4 sm:px-0">
            <span className="block font-fredoka text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold text-fizzi-coral leading-[0.95] text-pop-shadow fizzi-outline animate-color-shift">
              Be Bold.
            </span>
            <span className="block font-fredoka text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold text-fizzi-coral leading-[0.95] text-pop-shadow fizzi-outline animate-color-shift [animation-delay:0.35s]">
              Be You.
            </span>
          </div>

          <SodaCan
            ref={canRightRef}
            src="/images/optimized/can-lemon-lime-512.png"
            alt="Lemon Lime Fizzi Can"
            priority
            className="absolute right-0 md:right-[5%] w-32 md:w-48 lg:w-64 z-20 drop-shadow-[0_24px_45px_rgba(45,31,62,0.24)] animate-float-slow"
            style={{ transform: "rotate(15deg)" }}
          />
        </div>

        <div ref={taglineRef} className="text-center mt-4 md:mt-6 animate-pop-in">
          <h2 className="font-fredoka text-3xl md:text-[38px] font-bold text-fizzi-dark-purple mb-2 text-crisp">
            Five flavors we love. One heck of a sip.
          </h2>
          <p className="font-quicksand text-lg md:text-xl copy-crisp mb-6">
            Black cherry, sweet grape, zesty lime, juicy melon, bright strawberry — pick your vibe.
          </p>
          <a
            ref={ctaRef}
            href="#carousel"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#carousel")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="relative inline-block overflow-hidden bg-fizzi-coral text-white font-quicksand text-xl font-black px-10 py-4 rounded-full shadow-[0_20px_60px_rgba(255,79,46,0.35)] hover:-translate-y-1 hover:scale-105 hover:brightness-110 transition-all duration-300 gpu-layer animate-pop-in"
          >
            <span className="absolute inset-y-0 left-0 w-16 bg-white/35 animate-shimmer" />
            <span className="relative">Grab yours</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-fizzi-dark-purple/60" />
      </div>
    </section>
  );
}
