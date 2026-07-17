import { useRef } from "react";
import { gsap, useGSAP, mediaQueries, ScrollTrigger } from "@utils/gsap";
import TouristSpot from "./TouristSpot";
import { data } from "@utils/land-sites";

export default function TouristSpots() {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        const { isDesktopScreen, isReduceMotion } = context.conditions ?? {};
        if (!isDesktopScreen) return;
        if (isReduceMotion) ScrollTrigger.defaults({ fastScrollEnd: true });

        // .header__spanText_animate animation on view
        gsap.to(".header__spanText_animate", {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: ".header__animate",
            start: "top 15%",
            end: "bottom 15%",
            anticipatePin: 2,
            scrub: true,
          },
        });

        // .header__spanText_animate pin
        ScrollTrigger.create({
          trigger: ".header__animate",
          start: "top 15%",
          pin: true,
          pinSpacing: false,
          end: () => ScrollTrigger.maxScroll(window) * 0.85, // use 85% window scroll progress to trigger end pin
        });
      });
    },
    { scope: containerRef },
  );
  return (
    <section
      ref={containerRef}
      className="text-font-dark tourist-spot__section relative z-50 mt-5 min-h-143.75"
    >
      <h2 className="header__animate text-size-xl desktop:text-size-xxl desktop:text-primary overflow-hidden px-3 py-1 duration-0!">
        <span className="header__spanText_animate desktop:translate-y-[-115%] desktop:duration-0! desktop:opacity-100 desktop:motion-reduce:opacity-0 desktop:block desktop:motion-reduce:translate-y-0">
          Experience Majestic Feeling
        </span>
      </h2>
      <ul className="end-trigger__ul relative mt-5 flex flex-col gap-6">
        {data.map((item) => (
          <TouristSpot key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
