import Button from "@/components/UI/Button";
import { memo, useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { gsap, useGSAP } from "@utils/gsap";
import { FacebookIcon, InstagramIcon, LinkIcon } from "@utils/icons";

function ShareableLinks() {
  const shareable__ul = useRef<HTMLUListElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [isToggledShareLinks, setIsToggledShareLinks] =
    useState<boolean>(false);

  // --- Share URL links box animation ---
  useGSAP(
    () => {
      tl.current = gsap.timeline({ paused: true }).to(shareable__ul.current, {
        opacity: 1,
        yPercent: -40,
        duration: 0.3,
        ease: "power1.out",
      });
    },
    { scope: shareable__ul },
  );

  // --- Toggle Share Url links box ---
  useGSAP(
    () => {
      if (!tl.current) return;

      if (isToggledShareLinks) {
        tl.current.play();
        return;
      }
      tl.current.reverse();
    },
    {
      dependencies: [isToggledShareLinks],
      revertOnUpdate: true,
      scope: shareable__ul,
    },
  );

  return (
    <div className="relative w-1/3">
      <Button
        onClick={() => setIsToggledShareLinks((prev) => !prev)}
        className="bg-primary relative z-1 border"
      >
        Share
      </Button>

      <ul
        ref={shareable__ul}
        aria-label="Social links"
        className="bg-primary/10 absolute bottom-5 left-0 flex gap-2.5 rounded-2xl p-3 opacity-0 backdrop-blur-2xl"
      >
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
    </div>
  );
}

export default memo(ShareableLinks);
