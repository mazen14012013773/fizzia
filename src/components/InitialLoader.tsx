import { type CSSProperties, useEffect, useMemo, useState } from "react";
import SodaCan from "./SodaCan";

interface Props {
  onFinish?: () => void;
}

const canSrcs = [
  "/images/optimized/can-strawberry-256.png",
  "/images/optimized/can-lemon-lime-256.png",
  "/images/optimized/can-watermelon-256.png",
  "/images/optimized/can-black-cherry-256.png",
  "/images/optimized/can-grape-256.png",
];

const canNames = ["Strawberry", "Lemon Lime", "Watermelon", "Black Cherry", "Grape"];
const labelColors: Record<string, string> = {
  Strawberry: "from-[#FF5A84] to-[#FFB5D8]",
  "Lemon Lime": "from-[#F0E66A] to-[#A6FF7C]",
  Watermelon: "from-[#FF7C8E] to-[#7CE5A0]",
  "Black Cherry": "from-[#7C2D8C] to-[#FF4DB4]",
  Grape: "from-[#A04CF0] to-[#7DB1FF]",
};

const animClasses = [
  "anim-spin-fast",
  "anim-orbit",
  "anim-bounce",
  "anim-flip",
  "anim-pulse",
  "anim-wobble",
  "anim-tilt",
];

const shapeClasses = ["shape-default", "shape-slim", "shape-wide", "shape-rounded"];

type LoaderItemStyle = CSSProperties & {
  "--i": number;
};

export default function InitialLoader({ onFinish }: Props) {
  const [phase, setPhase] = useState<"spin" | "assemble" | "done">("spin");

  const items = useMemo(() => {
    return canSrcs.map((src, i) => ({
      src,
      name: canNames[i % canNames.length],
      anim: animClasses[i % animClasses.length],
      shape: shapeClasses[i % shapeClasses.length],
      delay: (i % 5) * 80 + Math.round((i * 37) % 100),
      burst: i % 2 === 0,
      hue: (i * 72) % 360,
    }));
  }, []);

  useEffect(() => {
    let t1: number | undefined;
    let t2: number | undefined;

    const startSequence = () => {
      t1 = window.setTimeout(() => setPhase("assemble"), 2600);
      t2 = window.setTimeout(() => {
        setPhase("done");
        onFinish?.();
      }, 4200);
    };

    if (document.readyState === "complete") startSequence();
    else window.addEventListener("load", startSequence, { once: true });

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", startSequence);
    };
  }, [onFinish]);

  if (phase === "done") return null;

  const total = items.length;

  return (
    <div className="loader-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-white via-[#fff6f0] to-[#f0f8ff] dark:from-[#07030b] dark:via-[#0b0811] dark:to-[#12061a]">
      <div className="absolute top-8 left-8 z-50">
        <h3 className="font-fredoka text-2xl font-bold text-fizzi-dark-purple">fizzi</h3>
      </div>
      <div className={`orbit-wrap relative ${phase === "assemble" ? "orbit-wrap-assemble" : "w-64 h-64 sm:w-[420px] sm:h-[140px]"}`}>
        <div className={`orbit ${phase === "spin" ? "orbit-spin" : ""} ${phase === "assemble" ? "orbit-assemble" : ""}`}>
          {items.map((it, i) => {
            const spinTransform = `rotate(${(360 / total) * i}deg) translateX(150px) rotate(-${(360 / total) * i}deg)`;
            const assembledTransform = `translateX(${(i - (total - 1) / 2) * 20}vw) translateY(0) scale(2.8)`;
            const style: LoaderItemStyle = phase === "assemble"
              ? { "--i": i, transform: assembledTransform }
              : { "--i": i, transform: spinTransform };

            return (
              <div
                key={it.src}
                className={`orbit-item absolute top-1/2 left-1/2 w-14 h-14 sm:w-20 sm:h-20 -translate-x-1/2 -translate-y-1/2 ${it.shape}`}
                style={style}
              >
              {it.burst && (
                <div
                  className="can-burst absolute inset-0 rounded-full pointer-events-none"
                  style={{ filter: `hue-rotate(${it.hue}deg)`, animationDelay: `${it.delay}ms` }}
                />
              )}

              <div className={`item-inner relative transition-all duration-700 ease-in-out ${phase === "spin" ? "item-rise" : ""}`} style={{ animationDelay: `${it.delay}ms` }}>
                <div className={`can-label absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r ${labelColors[it.name] ?? "from-white to-slate-100"} px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-black/15 backdrop-blur-sm transition-all duration-500 ease-out animate-label-pop`}>
                  {it.name}
                </div>
                <div
                  className={`can-item w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out ${
                    it.anim
                  } ${phase === "assemble" ? "can-open" : ""}`}
                  style={{ animationDelay: `${it.delay}ms`, boxShadow: `0 10px 30px hsla(${it.hue},90%,50%,0.12)`, transform: phase === "assemble" ? 'none' : undefined }}
                >
                  <div className="can-effect relative w-full h-full">
                    <div className="can-lid pointer-events-none" aria-hidden="true" />
                    {phase === "assemble" && (
                      <div className="can-vapor pointer-events-none" aria-hidden="true">
                        <span className="vapor-puff puff-1" />
                        <span className="vapor-puff puff-2" />
                        <span className="vapor-puff puff-3" />
                      </div>
                    )}
                    <SodaCan src={it.src} alt={`can-${i}`} className={`w-full h-full ${phase === "assemble" ? 'scale-[1.25]' : ''}`} animate={phase === "spin"} />
                  </div>
                </div>
              </div>
            </div>
          );
          })}
        </div>
      </div>
    </div>
  );
}
