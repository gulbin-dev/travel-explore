import {
  FacebookIcon,
  InstagramIcon,
  LinkIcon,
  LocataionPinIcon,
} from "@utils/icons";
import { Link } from "@tanstack/react-router";
import ButtonCtaLink from "@/components/UI/ButtonCtaLink";
import { useAppSelector, useAppDispatch } from "@/hooks/redux-hooks";
import { setImageOnView } from "@utils/redux-toolkit/feature/viewImageSlice";
import Carousel from "./Carousel";
import type { ItemProp } from "@utils/types";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@utils/gsap";

function ImageViewerModal({
  item,
  onClose,
  containerRef,
  setIsFullScreen,
}: {
  item: ItemProp | null;
  onClose: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      ref={containerRef}
      className="bg-font-dark/90 pointer-events-none invisible fixed inset-0 z-50 flex min-h-screen w-screen flex-col overflow-scroll pb-6 opacity-0 backdrop-blur-sm"
    >
      <button
        onClick={onClose}
        className="pointer-events-auto fixed top-0 right-0 col-start-4 justify-self-end p-4 text-4xl font-bold text-white hover:text-gray-300"
      >
        X
      </button>

      <Carousel item={item} setIsFullScreen={setIsFullScreen} />
      <div className="text-primary relative col-span-full flex flex-1 flex-col">
        <header className="px-3 py-5">
          <div className="overflow-hidden">
            <div className="bg-cta desktop:block progress-scroll-bar__div--animate mb-3 hidden h-1 origin-left scale-x-0 rounded-2xl"></div>
          </div>

          <h2 id="name" className="text-size-xl">
            {item?.name}
          </h2>
          <div className="bg-cta desktop:hidden my-1 block h-0.5 rounded-2xl"></div>
          <p className="flex gap-0.5 pt-1">
            <span className="text-cta h-fit">{LocataionPinIcon}</span>
            {item?.details.location}
          </p>
        </header>

        <article className="px-3">
          <p className="duration-0!">{item?.details.description}</p>
          <p className="mt-3 duration-0!">{item?.details.activities}</p>
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
      </div>
    </div>
  );
}

export default function ImageViewerModalWrapper() {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const clickPosRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const dispatch = useAppDispatch();

  const isToggled = useAppSelector((state) => state.isImageOnView.isToggled);
  const activeItem = useAppSelector((state) => state.isImageOnView.activeItem);

  // Local state to keep the content hydrated during close animations
  const [displayItem, setDisplayItem] = useState<ItemProp | null>(null);

  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isFullScreen) dispatch(setImageOnView(null));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, isFullScreen]);

  // Sync state only when a real item is dispatched to open the modal
  useEffect(() => {
    if (activeItem) {
      setDisplayItem(activeItem);
    }
  }, [activeItem]);

  // 1. Globally track the last click/touch location before modal blocks it
  useEffect(() => {
    if (isToggled) return;

    const handlePointerDown = (e: PointerEvent) => {
      clickPosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [isToggled]);

  // 2. Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isToggled ? "hidden" : "scroll";
  }, [isToggled]);

  // 3. GSAP Animation timeline
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const { x, y } = clickPosRef.current;

      if (isToggled) {
        // OPEN ANIMATION
        gsap
          .timeline()
          .set(containerRef.current, {
            autoAlpha: 1,
            pointerEvents: "auto",
            clipPath: `circle(0% at ${x}px ${y}px)`,
          })
          .to(containerRef.current, {
            clipPath: `circle(150% at ${x}px ${y}px)`,
            duration: 0.8,
            ease: "power3.inOut",
          });
      } else {
        // CLOSE ANIMATION
        gsap.to(containerRef.current, {
          clipPath: `circle(0% at ${x}px ${y}px)`,
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(containerRef.current, {
              autoAlpha: 0,
              pointerEvents: "none",
            });
            // Safely clear the data once the closing animation is totally done
            setDisplayItem(null);
          },
        });
      }
    },
    { dependencies: [isToggled], scope: containerRef },
  );

  return (
    <ImageViewerModal
      containerRef={containerRef}
      item={displayItem} // Render using the local cached state
      onClose={() => dispatch(setImageOnView(null))}
      setIsFullScreen={setIsFullScreen}
    />
  );
}
