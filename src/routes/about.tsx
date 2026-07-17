import { createFileRoute } from "@tanstack/react-router";
import Attribution from "@components/UI/Attribution";
import { useEffect } from "react";
import Card from "@/components/UI/Card";
import { WebsiteIcon, GithubIcon } from "@/utils/icons";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  useEffect(() => {
    document.body.style.overflow = "";
  });
  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center gap-2">
        <div className="absolute inset-0 flex">
          <div className="bg-font-dark/10 absolute inset-0 z-2"></div>
          <img
            src="/footer-1440.webp"
            srcSet="/footer-480.webp 480w, /footer-800.webp 800w, /footer-1440.webp 1440w, /footer-1440@2x.webp 2880w"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
            loading="lazy"
            alt=""
            className="absolute inset-0 z-1 h-full w-full object-cover blur-[2px]"
          />
          <Attribution>
            <p>
              Photo by{" "}
              <a
                href="https://unsplash.com/@xlexes?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
              >
                <span className="text-cta underline">Alexes Gerard</span>
              </a>{" "}
              on{" "}
              <a
                href="https://unsplash.com/photos/city-skyline-under-blue-sky-during-daytime-vL2h7xYiIlk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
              >
                <span className="text-cta underline">Unsplash</span>
              </a>
            </p>
          </Attribution>
        </div>
        <div className="text-size-sm relative z-3 max-w-180 pt-15">
          <h1 className="text-size-xxl">Travel Explore Demo Website</h1>
          <p className="pt-3 text-right">
            Build by front-end developer, Joshua Glenn R. Gulbin
          </p>
          <div className="pt-5">
            <ul className="text-cta flex flex-wrap justify-center gap-3 font-bold">
              <li>
                <Card className="bg-font-dark/40! hover:bg-font-dark/20!">
                  <p className="flex items-center gap-1.5">
                    <span>{WebsiteIcon}</span>Portfolio Website
                  </p>
                </Card>
              </li>
              <li>
                <Card className="bg-font-dark/40! hover:bg-font-dark/20!">
                  <p className="flex items-center gap-1.5">
                    <span>{GithubIcon}</span>Github
                  </p>
                </Card>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
