import { forwardRef } from "react";

interface SodaCanProps {
  src: string;
  alt: string;
  className?: string;
  animate?: boolean;
  priority?: boolean;
  style?: React.CSSProperties;
}

const SodaCan = forwardRef<HTMLImageElement, SodaCanProps>(
  ({ src, alt, className = "", animate = true, priority = false, style }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`object-contain drop-shadow-lg gpu-layer ${animate ? "animate-float" : ""} ${className}`}
        style={style}
        draggable={false}
        role="img"
      />
    );
  }
);

SodaCan.displayName = "SodaCan";

export default SodaCan;
