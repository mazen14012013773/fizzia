import { useEffect, useRef } from "react";

const burstWords = ["POP", "FIZZ", "WOW", "ZING"];

export default function SiteEnergy() {
  const progressRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }
    };

    const moveHalo = (event: PointerEvent) => {
      if (!haloRef.current || reduceMotion || coarsePointer) return;
      haloRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };

    const spawnBurst = (event: PointerEvent) => {
      if (reduceMotion) return;

      const burst = document.createElement("span");
      burst.className = "site-click-burst";
      burst.textContent = burstWords[Math.floor(Math.random() * burstWords.length)];
      burst.style.left = `${event.clientX}px`;
      burst.style.top = `${event.clientY}px`;
      burst.style.color = ["#ff4f2e", "#2d1f3e", "#7a35c6", "#0f9f77"][Math.floor(Math.random() * 4)];

      document.body.appendChild(burst);
      window.setTimeout(() => burst.remove(), 700);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    window.addEventListener("pointermove", moveHalo, { passive: true });
    window.addEventListener("pointerdown", spawnBurst, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.removeEventListener("pointermove", moveHalo);
      window.removeEventListener("pointerdown", spawnBurst);
    };
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 z-[10000] h-1.5 w-full bg-white/20">
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-[linear-gradient(90deg,#ff4f2e,#ffe64d,#1fe6a8,#89e8ff,#b88cff)] shadow-[0_0_18px_rgba(255,79,46,0.65)]"
        />
      </div>
      <div
        ref={haloRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.5),rgba(255,128,188,0.22)_34%,transparent_70%)] mix-blend-screen blur-sm md:block"
      />
    </>
  );
}
