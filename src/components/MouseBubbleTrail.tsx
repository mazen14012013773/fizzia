import { useEffect, useRef } from "react";

const bubbleColors = [
  "rgba(255, 230, 77, 0.78)",
  "rgba(255, 128, 188, 0.72)",
  "rgba(31, 230, 168, 0.7)",
  "rgba(137, 232, 255, 0.72)",
  "rgba(255, 79, 46, 0.68)",
  "rgba(184, 140, 255, 0.72)",
];

export default function MouseBubbleTrail() {
  const layerRef = useRef<HTMLDivElement>(null);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const layer = layerRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (!layer || reduceMotion || coarsePointer) return;

    const spawnBubble = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastSpawnRef.current < 28) return;
      lastSpawnRef.current = now;

      const bubble = document.createElement("span");
      const size = Math.round(8 + Math.random() * 22);
      const driftX = `${Math.round((Math.random() - 0.5) * 90)}px`;
      const driftY = `${Math.round(-44 - Math.random() * 80)}px`;

      bubble.className = "mouse-bubble";
      bubble.style.left = `${event.clientX}px`;
      bubble.style.top = `${event.clientY}px`;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.setProperty("--bubble-x", driftX);
      bubble.style.setProperty("--bubble-y", driftY);
      bubble.style.background = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];

      layer.appendChild(bubble);
      window.setTimeout(() => bubble.remove(), 850);
    };

    window.addEventListener("pointermove", spawnBubble, { passive: true });

    return () => {
      window.removeEventListener("pointermove", spawnBubble);
      layer.replaceChildren();
    };
  }, []);

  return <div ref={layerRef} className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" />;
}
