import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import ObserverPkg from "gsap/Observer";
import ScrollSmootherPkg from "gsap/ScrollSmoother";

import type { Observer as ObserverType } from "gsap/Observer";
import type { ScrollSmoother as ScrollSmootherType } from "gsap/ScrollSmoother";

const Observer = (ObserverPkg as any).Observer || ObserverPkg;
const ScrollSmoother =
  (ScrollSmootherPkg as any).ScrollSmoother || ScrollSmootherPkg;

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, Observer);

const mediaQueries = {
  isMobileScreen: "(max-width: 480px)",
  isTabletScreen: "(min-width: 481px) and (max-width: 1279px)",
  isDesktopScreen: "(min-width: 1280px)",
  isReduceMotion: "(prefers-reduced-motion: reduce)",
};

const TypedObserver = Observer as unknown as typeof ObserverType;
const TypedScrollSmoother =
  ScrollSmoother as unknown as typeof ScrollSmootherType;

export {
  gsap,
  mediaQueries,
  TypedScrollSmoother as ScrollSmoother,
  ScrollTrigger,
  useGSAP,
  TypedObserver as Observer,
};
