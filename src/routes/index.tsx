import { gsap, useGSAP, mediaQueries, ScrollTrigger } from "@utils/gsap";
import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import ButtonCtaLink from "@/components/UI/ButtonCtaLink";
import TouristSpots from "./-component/TouristSpots";
import Attribution from "@components/UI/Attribution";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  //  TODO: add reduce-motion
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        const { isDesktopScreen } = context.conditions ?? {};
        if (isDesktopScreen) {
          const animateInitialLoad = gsap.timeline({
            smoothChildTiming: true,
          });
          animateInitialLoad
            .to(
              ".heading__span--animate",
              {
                x: 0,
                opacity: 1,
                stagger: {
                  amount: 0.8,
                  from: "start",
                },
              },
              "-=0.3",
            )
            .to(".heading__p--animate", {
              y: 0,
              opacity: 1,
            })
            .to(".heading__nav-links--animate", {
              y: 0,
              opacity: 1,
              stagger: {
                amount: 0.5,
                from: "start",
              },
            });

          const animateScroll = gsap.timeline({
            scrollTrigger: {
              trigger: "#pin-hero",
              start: 0,
              end: "bottom top",
              scrub: true,
              fastScrollEnd: true,
            },
          });
          animateScroll
            .to(".heading__span--animate", {
              yPercent: -150,
            })
            .to(
              ".heading__p--animate",
              {
                yPercent: -100,
              },
              "<",
            )
            .to(
              ".heading__nav-links--animate",
              {
                yPercent: -350,
              },
              "<",
            )
            .to(
              ".hero-bg__img--animate",
              {
                duration: 1,
                keyframes: {
                  "20%": {
                    scale: 1.2,
                  },
                  "100%": {
                    scale: 1.5,
                  },
                },
              },
              "<",
            );

          const moveOnScroll = gsap.quickTo(".hero-bg__img--animate", "y", {
            duration: 0.4,
            ease: "power2.out",
          });

          const animateMoveOnScroll = ({ progress }: { progress: number }) => {
            const maxTravelDistance = 300; // Total pixels the image will move from start to end

            // Map progress (0 to 1) directly to your travel distance
            moveOnScroll(progress * maxTravelDistance);
          };

          ScrollTrigger.create({
            trigger: "#pin-hero",
            start: 0,
            end: "bottom+=9116 top",
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
              // Pass progress instead of direction once past the 10% threshold
              if (self.progress >= 0.1) {
                animateMoveOnScroll({ progress: self.progress });
              } else {
                moveOnScroll(0); // Smoothly reset if they scroll back to the very top
              }
            },
            onToggle: (self) => {
              if (!self.isActive) moveOnScroll(0);
            },
          });

          // pin to handle children element's exit animation
          ScrollTrigger.create({
            trigger: "#container__div",
            start: 0,
            end: "50% top",
            pin: true,
            pinnedContainer: "#pin-hero",
          });
        }
      });
    },
    { dependencies: [] },
  );

  return (
    <>
      <section className="relative flex h-screen">
        <div id="pin-hero" className="absolute inset-0 h-screen w-screen">
          <div className="bg-font-dark/40 absolute inset-0 z-1"></div>
          <img
            src="/bg-image-1440.webp"
            srcSet="/bg-image-480.webp 480w, /bg-image-800.webp 800w, /bg-image-1440.webp 1440w, /bg-image-1440@2x.webp 2880w"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
            alt=""
            className="hero-bg__img--animate absolute inset-0 h-full w-full object-cover"
          />{" "}
          <Attribution>
            <p>
              Photo by{" "}
              <a
                href="https://unsplash.com/@zilch?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
              >
                <span className="text-cta underline">Eibner Saliba</span>
              </a>{" "}
              on{" "}
              <a
                href="https://unsplash.com/photos/landscape-photography-of-island-with-boats-3T9dDY0WqDI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
              >
                <span className="text-cta underline">Unsplash</span>
              </a>
            </p>
          </Attribution>
        </div>
        <div
          id="container__div"
          className="desktop:w-full desktop:mx-auto relative z-10 mx-3 max-w-180 place-self-center pb-3"
        >
          <h1 className="text-size-xxl flex flex-col">
            <span className="container__span overflow-hidden">
              <span className="heading__span--animate desktop:-translate-x-full desktop:opacity-0 block">
                Travel
              </span>
            </span>
            <span className="container__span overflow-hidden">
              <span className="heading__span--animate desktop:-translate-x-full desktop:opacity-0 block">
                Eat
              </span>
            </span>
            <span className="container__span overflow-hidden">
              <span className="heading__span--animate desktop:-translate-x-full desktop:opacity-0 block">
                Enjoy
              </span>
            </span>
          </h1>

          <p id="" className="mt-4 overflow-hidden text-lg">
            <span className="heading__p--animate desktop:translate-y-full desktop:opacity-0 block">
              Explore the wonders of this nation
            </span>
          </p>

          <nav className="mt-5">
            <ul className="flex gap-1 overflow-hidden p-3">
              <li className="heading__nav-links--animate desktop:translate-y-full desktop:opacity-0">
                <ButtonCtaLink to="" className="bg-cta">
                  Explore
                </ButtonCtaLink>
              </li>
              <li className="heading__nav-links--animate desktop:translate-y-full desktop:opacity-0">
                <ButtonCtaLink to="" className="bg-primary">
                  About
                </ButtonCtaLink>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <ClientOnly>
        <TouristSpots />
      </ClientOnly>
    </>
  );
}
