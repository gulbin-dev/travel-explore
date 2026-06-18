import { Link } from "@tanstack/react-router";
import Card from "@/components/UI/Card";
import Attribution from "@/components/UI/Attribution";
import ButtonCtaLink from "@/components/UI/ButtonCtaLink";
import { data } from "@utils/land-sites";
import {
  FacebookIcon,
  InstagramIcon,
  LinkIcon,
  LocataionPinIcon,
} from "@utils/icons";

export default function TouristSpots() {
  return (
    <ul className="mt-5 flex flex-col gap-6">
      {data.map((item) => (
        <li key={item.id}>
          <div className="tablet:grid-cols-8 desktop:grid-cols-12 grid grid-cols-4 pb-3">
            <div className="relative col-span-full col-start-1 h-45 overflow-clip">
              <span className="font-playfair text-primary relative z-2 col-span-full col-start-1 text-[140px] leading-15">
                0{item.id}
              </span>
              <img
                src={item.images[0].image}
                loading="lazy"
                alt=""
                className="absolute inset-0 h-62.5 w-full object-cover"
              />
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
            <ul className="flex h-12 w-screen justify-end gap-1.5 px-3 py-1.5">
              <li>
                <img
                  src={
                    item.images[1]?.image || "/card-img/camiguin/camiguin.jpg"
                  }
                  width={96}
                  height={96}
                  className="aspect-square rounded-2xl object-cover"
                />
              </li>
              <li>
                <img
                  src={
                    item.images[2]?.image || "/card-img/camiguin/camiguin.jpg"
                  }
                  width={96}
                  height={96}
                  loading="lazy"
                  className="aspect-square rounded-2xl object-cover"
                />
              </li>
              <li>
                <img
                  src={
                    item.images[3]?.image || "/card-img/camiguin/camiguin.jpg"
                  }
                  width={96}
                  height={96}
                  loading="lazy"
                  className="aspect-square rounded-2xl object-cover"
                />
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
                <p className="flex gap-0.5 pt-1">
                  <span className="h-fit">{LocataionPinIcon}</span>
                  {item.details.location}
                </p>
              </header>

              <article className="line-clamp-6 px-3">
                <p>{item.details.description}</p>
                <p>{item.details.activities}</p>
              </article>
              <footer className="mt-4 flex justify-between px-3">
                <ButtonCtaLink to="" className="bg-cta text-primary font-bold">
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
  );
}
