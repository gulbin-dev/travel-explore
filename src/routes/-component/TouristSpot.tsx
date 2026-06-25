import {
  FacebookIcon,
  InstagramIcon,
  LinkIcon,
  LocataionPinIcon,
} from "@utils/icons";
import { Link } from "@tanstack/react-router";
import Card from "@/components/UI/Card";
import { CardThumbnail } from "./Thumbnail";
import Attribution from "@/components/UI/Attribution";
import ButtonCtaLink from "@/components/UI/ButtonCtaLink";
import { Image } from "@unpic/react";
import type { ItemProp } from "@utils/types";
import { gsap, useGSAP, mediaQueries, ScrollTrigger } from "@utils/gsap";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { setImageOnView } from "@/utils/redux-toolkit/feature/viewImageSlice";

export default function TouristSpot({ item }: { item: ItemProp }) {
  const containerRef = useRef<HTMLLIElement | null>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "0px 0px 250px 0px",
    triggerOnce: true,
  });

  const dispatch = useAppDispatch();
  // this will only run when the element scope is in view
  // this reduce long thread tasks on mainthread when page load
  useGSAP(
    () => {
      if (!inView) return;
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        const { isDesktopScreen } = context.conditions ?? {};
        if (isDesktopScreen) {
          const touristSpots =
            gsap.utils.toArray<HTMLLIElement>(".container__div"); // toArray is use to containerize querySelector
          touristSpots.forEach((li) => {
            const divPinCounter = li.querySelector(".pin__div--counter");
            const spanPinCounter = li.querySelector(".span__pin--counter");
            const card = li.querySelector(".card__div");
            const imgParallax = li.querySelector(".img--parallax");
            const divParallaxContainerClip = li.querySelector(
              ".parralax-container__div--clip",
            );
            const divParralaxView = li.querySelector(".div__parralaxView");
            const progressScrollBarDiv = li.querySelector(
              ".progress-scroll-bar__div--animate",
            );

            const setParallaxY = gsap.quickTo(divParralaxView, "y", {
              duration: 0.8,
              ease: "power1.out",
            });
            const moveImage = gsap.quickTo(imgParallax, "y", {
              duration: 0.3,
              ease: "power1.out",
            });
            const scaleProgressBar = gsap.quickTo(
              progressScrollBarDiv,
              "scaleX",
              { duration: 0.1, ease: "none" },
            );
            const animateCard = gsap.to(
              card,

              {
                opacity: 1,
                duration: 0.2,
                paused: true,
              },
            );
            const animateSpanCounter = gsap.to(spanPinCounter, {
              y: 0,
              overwrite: true,
              paused: true,
            });
            const animateProgressScrollBarDiv = (progress: number) => {
              const scaleX = progress * 2;
              console.log(scaleX);
              scaleProgressBar(scaleX);
            };
            const animateParallaxImage = (progress: number) => {
              const parallaxRange = 180;

              const targetY = progress * parallaxRange - parallaxRange / 2;

              moveImage(targetY);
            };

            ScrollTrigger.create({
              trigger: li,
              start: "top 30%",
              end: "bottom+=100% 30%",
              pin: divPinCounter,
              pinSpacing: false,
              fastScrollEnd: true,
              scrub: 1,
              onEnter: () => animateSpanCounter.play(),
              onEnterBack: () => animateSpanCounter.play(),
              onUpdate: (self) => {
                if (self.progress > 0.6 && self.direction === 1) {
                  animateSpanCounter.reverse();
                }
              },
              onLeave: () => animateSpanCounter.reverse(),
              onLeaveBack: () => animateSpanCounter.reverse(),
            });
            gsap.to(divParralaxView, {
              opacity: 1,
              overwrite: true,

              scrollTrigger: {
                trigger: divParralaxView,
                start: "top center",
                endTrigger: li,
                end: "center 20%",
                fastScrollEnd: true,
                toggleActions: "play reverse play reverse",
              },
            });

            ScrollTrigger.create({
              trigger: divParallaxContainerClip,
              start: "top 30%",
              endTrigger: li,
              end: "bottom-=40% top",
              pin: true,
              pinSpacing: false,
              scrub: true,
              onUpdate: (self) => {
                const elementHeight = 584;
                const targetY = -(elementHeight * self.progress);
                setParallaxY(targetY);
              },
            });

            ScrollTrigger.create({
              trigger: li,
              start: "top 30%",
              end: "bottom top",
              pin: card,
              scrub: 1,
              onEnter: () => animateCard.play(),
              onEnterBack: () => animateCard.play(),
              onLeave: () => {
                moveImage(60);
                animateCard.reverse();
              },
              onLeaveBack: () => {
                moveImage(-60);
                animateCard.reverse();
              },
              onUpdate: (self) => {
                animateParallaxImage(self.progress);
              },
            });

            ScrollTrigger.create({
              trigger: li,
              start: "top 30%",
              end: "bottom top",
              scrub: true,
              onUpdate: (self) => {
                animateProgressScrollBarDiv(self.progress);
              },
            });
            ScrollTrigger.refresh(); // expect refresh trigger after ScrollTrigger initialization
          });
        }
      });
    },
    { dependencies: [inView], scope: containerRef },
  );

  return (
    <li
      ref={(el) => {
        containerRef.current = el;
        ref(el);
      }}
      className="relative h-full"
    >
      <div className="container__div tablet:grid-cols-8 desktop:grid-cols-12 grid grid-cols-4 pb-3">
        <div className="desktop:col-start-2 desktop:col-end-5 desktop:h-[80vh] desktop:grid desktop:grid-cols-subgrid desktop:grid-rows-[140px_140px_1fr] desktop:justify-between relative col-span-full col-start-1 h-45">
          <div className="pin__div--counter desktop:row-start-1 desktop:p-0 relative z-2 overflow-hidden p-3">
            <span className="span__pin--counter font-playfair text-red desktop:block desktop:translate-y-[-120%] text-primary relative text-[140px] leading-15">
              0{item.id}
            </span>
          </div>
          <div className="parralax-container__div--clip desktop:relative desktop:row-start-3 desktop:col-start-1 desktop:col-span-full desktop:duration-0 h-full w-full overflow-hidden">
            <div className="div__parralaxView desktop:relative desktop:opacity-0 absolute inset-0 h-full overflow-hidden">
              <div className="relative h-[120%] w-[120%]">
                <Image
                  src={item.images[0].image}
                  layout="constrained"
                  alt=""
                  height={960}
                  aspectRatio={1 / 1}
                  loading="lazy"
                  decoding="async"
                  breakpoints={[
                    380, 430, 560, 680, 768, 992, 1080, 1240, 1440, 2880, 3680,
                  ]}
                  className="img--parallax absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div className="bg-font-dark/25 absolute inset-0 z-1"></div>
              <Attribution>
                <p>
                  Photo by{" "}
                  <a
                    href={item.images[0].attribution.photographer.profile}
                    target="_blank"
                  >
                    <span className="text-cta underline">
                      {item.images[0].attribution.photographer.name}
                    </span>
                  </a>{" "}
                  on{" "}
                  <a href={item.images[0].attribution.source} target="_blank">
                    <span className="text-cta underline">Unsplash</span>
                  </a>
                </p>
              </Attribution>
            </div>
          </div>
        </div>
        <ul className="desktop:hidden flex h-12 w-screen justify-end gap-1.5 px-3 py-1.5">
          <li>
            <button
              className="relative z-1"
              onClick={() => {
                dispatch(setImageOnView(item));
              }}
            >
              <CardThumbnail src={item.images[1]?.image} />
            </button>
          </li>
          <li>
            <button
              className="relative z-1"
              onClick={() => {
                dispatch(setImageOnView(item));
              }}
            >
              <CardThumbnail src={item.images[2]?.image} />
            </button>
          </li>
          <li>
            <button
              className="relative z-1"
              onClick={() => {
                dispatch(setImageOnView(item));
              }}
            >
              <CardThumbnail src={item.images[3]?.image} />
            </button>
          </li>
        </ul>
        <div className="desktop:col-start-6 desktop:col-end-12 col-span-full col-start-1">
          <Card
            role="region"
            aria-labelledby="name"
            className="card__div desktop:bg-primary/10 desktop:backdrop-blur-2xl desktop:p-3 desktop:rounded-2xl desktop:text-primary desktop:opacity-0 duration-0! will-change-transform"
          >
            <header className="px-3 py-5">
              <div className="overflow-hidden">
                <div className="bg-cta desktop:block progress-scroll-bar__div--animate mb-3 hidden h-1 origin-left scale-x-0 rounded-2xl"></div>
              </div>

              <h2 id="name" className="text-size-xl">
                {item.name}
              </h2>
              <div className="bg-cta desktop:hidden my-1 block h-0.5 rounded-2xl"></div>
              <p className="flex gap-0.5 pt-1">
                <span className="h-fit">{LocataionPinIcon}</span>
                {item.details.location}
              </p>
            </header>

            <article className="line-clamp-6 px-3">
              <p className="duration-0!">{item.details.description}</p>
              <p className="duration-0!">{item.details.activities}</p>
            </article>
            <footer className="tablet:justify-normal desktop:gap-6 mt-4 flex justify-between px-3">
              <ButtonCtaLink to="" className="bg-cta text-primary">
                See Map
              </ButtonCtaLink>

              <ul aria-label="Social links" className="flex gap-3">
                <li>
                  <Link to="/">
                    <FacebookIcon />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <InstagramIcon />
                  </Link>
                </li>
                <li>
                  <Link to="/">{LinkIcon}</Link>
                </li>
              </ul>
            </footer>
          </Card>
        </div>
      </div>
    </li>
  );
}
