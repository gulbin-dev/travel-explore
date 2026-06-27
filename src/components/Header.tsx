import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { useGSAP, gsap } from "@utils/gsap";

const MenuSpan = function MenuSpan({ className }: { className?: string }) {
  return (
    <span
      className={`menu-icon__span bg-cta h-1 w-6 rounded-sm ${className}`}
    ></span>
  );
};

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  useGSAP(
    () => {
      const slices = gsap.utils.toArray<HTMLElement>(".menu-icon__span");
      gsap.defaults({ ease: "power2.out", duration: 0.3 });

      tl.current = gsap
        .timeline({ paused: true })
        .to(slices[0], { autoAlpha: 0, y: 10 })
        .to(slices[1], { rotate: 45, delay: 0.3 }, "<")
        .to(slices[2], { rotate: -45 }, "<")
        .to(slices[3], { autoAlpha: 0, y: -10 }, "<-=0.3")
        .fromTo(
          sidebarRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.5 },
          "<",
        );
    },
    { scope: headerRef },
  );

  useGSAP(() => {
    if (isSidebarOpen) tl.current?.play();
    else tl.current?.reverse();
  }, [isSidebarOpen]);

  // Toggle handler
  const { contextSafe } = useGSAP(() => {}, { scope: sidebarRef });
  const toggleSideBarHandler = contextSafe(() =>
    setIsSidebarOpen((prev) => !prev),
  );

  // Intercept sidebar link clicks to animate out first
  const handleSidebarNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    to: string,
  ) => {
    e.preventDefault();

    if (pathname === to) {
      setIsSidebarOpen(false);
      return;
    }

    // Direct the reverse timeline to navigate when finished
    if (tl.current) {
      tl.current.eventCallback("onReverseComplete", () => {
        setIsSidebarOpen(false);
        navigate({ to });
        // Clear callback to avoid unwanted firings on manual toggles
        tl.current?.eventCallback("onReverseComplete", null);
      });
      tl.current.reverse();
    } else {
      // Fallback if timeline isn't ready
      setIsSidebarOpen(false);
      navigate({ to });
    }
  };

  // Keep fallback guard: if path changes externally, close sidebar instantly
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 z-20 h-full max-h-12.5 w-full px-3 py-1.25"
      >
        <div className="bg-primary/10 absolute top-0 left-0 -z-1 h-full w-full shadow-[0px_-4px_4px_rgba(225,225,225,0.25)_inset] backdrop-blur-xs"></div>
        <div className="flex w-full max-w-180 items-center justify-between place-self-center">
          <img
            src="/logo-mobile.png"
            alt=""
            width={80}
            height={80}
            className="aspect-square"
          />
          <button
            onClick={toggleSideBarHandler}
            className="desktop:hidden flex max-h-6 flex-col justify-center gap-1.5"
          >
            <MenuSpan />
            <span className="relative h-1">
              <MenuSpan className="absolute top-0 left-0" />
              <MenuSpan className="absolute top-0 left-0" />
            </span>
            <MenuSpan />
          </button>

          <nav className="desktop:block desktop:text-size-sm text-primary hidden font-semibold">
            <ul className="flex gap-3">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div
        ref={sidebarRef}
        className="mobile-side-bar bg-primary/10 text-foreground-white tablet:hidden fixed top-0 left-0 z-10 h-screen w-full px-3 py-15 backdrop-blur-sm"
        style={{ transform: "translateX(100%)" }}
      >
        <nav className="mt-5">
          <ul className="text-size-xl text-primary flex flex-col items-end gap-3 font-bold">
            <li>
              <a href="/" onClick={(e) => handleSidebarNavigation(e, "/")}>
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                onClick={(e) => handleSidebarNavigation(e, "/about")}
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
