import { gsap } from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const mediaQueries = {
  isMobileScreen: "(max-width: 480px)",
  isTabletScreen: "(min-width: 481px and max-width: 990px)",
  isDesktopScreen: "(min-width: 901px)",
};
export { gsap, mediaQueries, ScrollSmoother, ScrollTrigger, useGSAP };
