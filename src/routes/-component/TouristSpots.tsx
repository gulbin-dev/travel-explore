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
        const { isDesktopScreen } = context.conditions ?? {};
        if (!isDesktopScreen) return;
        ScrollTrigger.defaults({ fastScrollEnd: true });

        gsap.to(".header__spanText_animate", {
          y: 0,
          scrollTrigger: {
            trigger: ".header__animate",
            start: "top 15%",
            end: "bottom 15%",
            anticipatePin: 2,
            scrub: true,
          },
        });
        const touristSpots =
          gsap.utils.toArray<HTMLLIElement>(".container__div");
        const lastLi = touristSpots[touristSpots.length - 1];

        ScrollTrigger.create({
          trigger: ".header__animate",
          start: "top 15%",
          pin: true,
          pinSpacing: false,
          endTrigger: lastLi,
          end: "bottom top",
        });
      });
    },
    { scope: containerRef },
  );
  return (
    <section
      ref={containerRef}
      className="text-font-dark tourist-spot__section relative z-50 mt-5 min-h-screen"
    >
      <h2 className="header__animate text-size-xl desktop:text-size-xxl desktop:text-primary overflow-hidden px-3 py-1 duration-0!">
        <span className="header__spanText_animate desktop:translate-y-[-115%] desktop:duration-0! desktop:block">
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
