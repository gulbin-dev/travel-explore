import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP, gsap, Observer);

const mediaQueries = {
  isMobileScreen: "(max-width: 480px)",
  isTabletScreen: "(min-width: 481px) and (max-width: 1279px)",
  isDesktopScreen: "(min-width: 1280px)",
  isReduceMotion: "(prefers-reduced-motion: reduce)",
};
export { gsap, mediaQueries, ScrollSmoother, ScrollTrigger, useGSAP, Observer };
