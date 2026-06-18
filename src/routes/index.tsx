import { createFileRoute } from "@tanstack/react-router";
import PageWrapper from "@/components/PageWrapper";
import ButtonCtaLink from "@/components/UI/ButtonCtaLink";
import Attribution from "@/components/UI/Attribution";
import TouristSpots from "./-index/TouristSpots";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <PageWrapper>
      <section className="relative z-1 flex h-screen">
        <div className="bg-font-dark/40 absolute inset-0 z-1"></div>
        <img
          src="/bg-image-1440.png"
          srcSet="/bg-image-480.png 480w, /bg-image-800.png 800w, /bg-image-1440.png 1440w, /bg-image-1440@2x.png 2880w"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
          alt=""
          className="absolute inset-0 -z-1 h-full w-full object-cover"
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
        <div className="desktop:mx-auto desktop:w-full z-2 mx-3 max-w-180 place-self-center">
          <h1 className="text-size-xxl flex flex-col">
            <span>Travel</span>
            <span>Eat</span>
            <span>Enjoy</span>
          </h1>

          <p className="mt-4 text-lg">
            <span>Explore the wonders of this nation</span>
          </p>

          <nav className="mt-5">
            <ul className="flex gap-1">
              <li>
                <ButtonCtaLink to="" className="bg-cta">
                  Explore
                </ButtonCtaLink>
              </li>
              <li>
                <ButtonCtaLink to="" className="bg-primary">
                  About
                </ButtonCtaLink>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <section className="text-font-dark mt-5">
        <h2 className="text-size-xl px-3">Experience Majestic Feeling</h2>
        <TouristSpots />
      </section>
    </PageWrapper>
  );
}
