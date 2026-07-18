import { gsap } from "gsap/dist/gsap";
import { Observer } from "gsap/dist/Observer";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(
  ScrollSmoother,
  ScrollTrigger,
  useGSAP,
  gsap,
  ScrollToPlugin,
  Observer,
);

const mediaQueries = {
  isMobileScreen: "(max-width: 480px)",
  isTabletScreen: "(min-width: 481px) and (max-width: 1279px)",
  isDesktopScreen: "(min-width: 1024px)",
  isReduceMotion: "(prefers-reduced-motion: reduce)",
};
export {
  gsap,
  mediaQueries,
  ScrollSmoother,
  ScrollTrigger,
  useGSAP,
  Observer,
  ScrollToPlugin,
};
