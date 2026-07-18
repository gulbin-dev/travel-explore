import { Link } from "@tanstack/react-router";
import { WebsiteIcon, GithubIcon, EmailIcon } from "@/utils/icons";

export default function Footer() {
  return (
    <footer className="bg-primary text-font-dark relative flex min-h-50 justify-center overflow-hidden">
      <div className="tablet:grid-cols-8 desktop:grid-cols-12 relative z-1 grid max-w-180 grid-cols-4 grid-rows-[repeat(4,auto)] p-3">
        <Link to="/">
          <img
            src="/logo-mobile.png"
            alt=""
            width={80}
            height={80}
            className="row-start-1 aspect-square"
          />
        </Link>

        <p className="text-size-sm col-start-1 col-end-8 row-start-2 pt-2">
          Travel Expore is a demo website made by Front-end developer Joshua
          Glenn R. Gulbin. This demonstrates his front-end developing skill on
          building an optimize GSAP animated landing page.
        </p>
        <nav className="tablet:flex-row tablet:justify-between tablet:items-center col-start-1 col-end-9 row-start-3 my-3 flex flex-col items-start">
          <ul className="flex gap-1.5">
            <li>
              <a href="https://portfolio-gulbindev.vercel.app/" target="_blank">
                <WebsiteIcon className="text-cta hover:text-cta-hover size-6 hover:cursor-pointer" />
              </a>
            </li>
            <li>
              <a href="https://github.com/gulbin-dev" target="_blank">
                <GithubIcon className="text-cta hover:text-cta-hover size-6 hover:cursor-pointer" />
              </a>
            </li>
            <li>
              <a href="mailto:gulbindev@gmail.com" target="_blank">
                <EmailIcon className="text-cta hover:text-cta-hover size-6 hover:cursor-pointer" />
              </a>
            </li>
          </ul>
          <ul className="tablet:gap-4.5 mt-3 flex justify-between gap-1.5">
            <li>
              <Link
                to="/privacy-policy"
                target="_blank"
                className="hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms-conditions"
                target="_blank"
                className="hover:underline"
              >
                Terms and Conditions
              </Link>
            </li>
            <li></li>
          </ul>
        </nav>
        <p className="col-span-full row-start-4 place-self-center">
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
