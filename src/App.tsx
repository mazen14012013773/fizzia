import { Suspense, lazy, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import ErrorBoundary from "@/components/ErrorBoundary";
import MouseBubbleTrail from "@/components/MouseBubbleTrail";
import SiteEnergy from "@/components/SiteEnergy";
import HeroSection from "@/sections/HeroSection";
import InitialLoader from "@/components/InitialLoader";

const FlavorsSection = lazy(() => import("@/sections/FlavorsSection"));
const RotatingCanSection = lazy(() => import("@/sections/RotatingCanSection"));
const FlavorCarouselSection = lazy(() => import("@/sections/FlavorCarouselSection"));
const FeatureSection = lazy(() => import("@/sections/FeatureSection"));
const MarqueeSection = lazy(() => import("@/sections/MarqueeSection"));
const Footer = lazy(() => import("@/sections/Footer"));

function LoadingSection() {
  return (
    <div className="min-h-[45vh] flex items-center justify-center bg-fizzi-yellow">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-[5px] border-fizzi-dark-purple/20 border-b-fizzi-coral" />
        <p className="mt-4 font-quicksand text-fizzi-dark-purple">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const timers = [120, 450, 1000, 1800].map((delay) => window.setTimeout(refresh, delay));

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    document.addEventListener("load", refresh, true);
    document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      document.removeEventListener("load", refresh, true);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="relative overflow-x-hidden bg-white transition-colors duration-500 dark:bg-[#100817]">
        {initialLoading && <InitialLoader onFinish={() => setInitialLoading(false)} />}
        <SiteEnergy />
        <MouseBubbleTrail />
        <Navigation />

        <main className="theme-stage relative">
          <HeroSection />

          <Suspense fallback={<LoadingSection />}>
            <FlavorsSection />
          </Suspense>

          <Suspense fallback={<LoadingSection />}>
            <RotatingCanSection />
          </Suspense>

          <Suspense fallback={<LoadingSection />}>
            <FlavorCarouselSection />
          </Suspense>

          <div id="features">
            <Suspense fallback={<LoadingSection />}>
              <FeatureSection
                kicker="Strawberry Lemon"
                heading="Soft Sweet. Big Spark."
                description="Strawberry meets lemon in a bright, fizzy hug. Prebiotics, real fruit, and that first-sip feeling that wakes you right up."
                canImage="/images/optimized/can-strawberry-512.png"
                companionImage="/images/optimized/can-lemon-lime-256.png"
                canAlt="Strawberry Lemon Fizzi"
                backgroundColor="linear-gradient(135deg, #FFE64D 0%, #FF80BC 58%, #89E8FF 100%)"
                accentColor="#FF4F2E"
                layout="text-left"
              />

              <FeatureSection
                kicker="Black Cherry"
                heading="Dark Cherry Drama"
                description="Deep, juicy cherry with a clean finish. Rich color, bold taste, barely any calories — and a can that stands out from across the room."
                canImage="/images/optimized/can-black-cherry-512.png"
                companionImage="/images/optimized/can-grape-256.png"
                canAlt="Black Cherry Fizzi"
                backgroundColor="linear-gradient(135deg, #5E2133 0%, #B88CFF 48%, #FF80BC 100%)"
                accentColor="#FFE64D"
                layout="text-right"
              />

              <FeatureSection
                kicker="Watermelon Lime"
                heading="Fresh Like Summer"
                description="Watermelon, citrus, and a crisp fizzy finish. It's the taste of summer — before you even pop the tab."
                canImage="/images/optimized/can-watermelon-512.png"
                companionImage="/images/optimized/can-lemon-lime-256.png"
                canAlt="Watermelon Fizzi"
                backgroundColor="linear-gradient(135deg, #BDF34A 0%, #1FE6A8 45%, #89E8FF 100%)"
                accentColor="#D91E72"
                layout="text-left"
              />
            </Suspense>
          </div>

          <Suspense fallback={<LoadingSection />}>
            <MarqueeSection />
          </Suspense>
        </main>

        <Suspense fallback={<div />}>
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
