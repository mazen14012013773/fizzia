import { useMemo } from "react";

interface BubbleConfig {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
}

interface BubbleBackgroundProps {
  count?: number;
  className?: string;
}

function seededRange(seed: number, min: number, max: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  const fraction = value - Math.floor(value);
  return min + fraction * (max - min);
}

export default function BubbleBackground({ count = 40, className = "" }: BubbleBackgroundProps) {
  const bubbles = useMemo<BubbleConfig[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: seededRange(i + 1, 10, 40),
      left: seededRange(i + 101, 0, 100),
      delay: seededRange(i + 201, 0, 15),
      duration: seededRange(i + 301, 8, 20),
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full border border-white/40 bg-white/10 animate-bubble-float"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: "-50px",
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
