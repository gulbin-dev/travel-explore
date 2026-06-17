import { createFileRoute, Link } from "@tanstack/react-router";
import PageWrapper from "@components/PageWrapper";
import ButtonCtaLink from "@components/UI/ButtonCtaLink";
import { data } from "@utils/land-sites";
import Card from "@components/UI/Card";
import { FacebookIcon, InstagramIcon, LinkIcon } from "@/-utils/icons";

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
        />
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
        <ul className="mt-5 flex flex-col gap-6">
          {data.map((item) => (
            <li key={item.id}>
              <div className="tablet:grid-cols-8 desktop:grid-cols-12 grid grid-cols-4 pb-3">
                <div className="relative col-span-full col-start-1 h-45 overflow-clip">
                  <span className="font-playfair text-primary relative z-2 col-span-full col-start-1 text-[140px] leading-15">
                    0{item.id}
                  </span>
                  <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 h-62.5 w-full object-cover"
                  />
                  <div className="bg-font-dark/25 absolute inset-0 z-1"></div>
                </div>
                <ul className="flex h-12 w-screen justify-end gap-1.5 px-3 py-1.5">
                  <li>
                    <div className="h-12 w-12 rounded-2xl bg-gray-500"></div>
                  </li>
                  <li>
                    <div className="h-12 w-12 rounded-2xl bg-gray-500"></div>
                  </li>
                  <li>
                    <div className="h-12 w-12 rounded-2xl bg-gray-500"></div>
                  </li>
                </ul>
                <Card
                  role="region"
                  aria-labelledby="name"
                  className="col-span-full col-start-1"
                >
                  <header className="px-3 py-5">
                    <h2 id="name" className="text-size-xl">
                      {item.name}
                    </h2>
                    <div className="bg-cta my-1 h-0.5 rounded-2xl"></div>
                    <p className="pt-1">{item.details.location}</p>
                  </header>

                  <article className="line-clamp-6 px-3">
                    <p>{item.details.description}</p>
                    <p>{item.details.activities}</p>
                  </article>
                  <footer className="mt-4 flex justify-between px-3">
                    <ButtonCtaLink
                      to=""
                      className="bg-cta text-primary font-bold"
                    >
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
            </li>
          ))}
        </ul>
      </section>
    </PageWrapper>
  );
}
