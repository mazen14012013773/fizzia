import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        badgeRef.current,
        { scale: 0, rotate: -180 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[60vh] bg-fizzi-coral flex flex-col items-center justify-center py-16 md:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,230,77,0.28),transparent_35%,rgba(137,232,255,0.25)_70%,transparent)] animate-color-shift" />
      {[12, 24, 36, 48, 60, 72, 84].map((left, i) => (
        <span
          key={left}
          className="absolute bottom-10 h-3 w-3 rounded-full bg-fizzi-yellow/70 animate-spark-rise"
          style={{ left: `${left}%`, animationDelay: `${i * 0.22}s` }}
        />
      ))}
      <div ref={textRef} className="relative w-full text-center px-4">
        <div className="font-fredoka text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold text-fizzi-yellow leading-[0.9] select-none text-pop-shadow">
          <span className="block">SIP ON SOMETHING</span>
          <span className="block text-7xl sm:text-8xl md:text-9xl lg:text-[120px] mt-2">THAT FEELS GOOD</span>
        </div>

        <div
          ref={badgeRef}
          className="absolute bottom-0 right-[5%] md:right-[15%] w-20 h-20 md:w-28 md:h-28 animate-spin"
        >
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <defs>
              <path
                id="circlePath"
                d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
              />
            </defs>
            <circle cx="60" cy="60" r="55" fill="white" />
            <text fill="#E85D3E" fontSize="14" fontFamily="Fredoka" fontWeight="600">
              <textPath href="#circlePath">
                Love your life &#9829; Love your life &#9829; Love your life &#9829;
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        <span className="font-fredoka text-3xl md:text-4xl font-bold text-fizzi-orange">
          fizzi
        </span>
      </div>
    </section>
  );
}
