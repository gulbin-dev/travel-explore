"use client";

import { useAppSelector, useAppDispatch } from "@hooks/redux-hooks";
import { setMapOnView } from "@utils/redux-toolkit/feature/viewMapSlice";
import type { ItemProp } from "@utils/types";
import { gsap, useGSAP } from "@/utils/gsap";
import { useEffect, useRef, useState } from "react";

function MapWrapper({
  location,
  isMapToggled,
  onClose,
}: {
  location: ItemProp | null;
  isMapToggled: boolean;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [displayLocation, setDisplayLocation] = useState<ItemProp | null>(null);

  useEffect(() => {
    if (location) {
      setDisplayLocation(location);
    }
  }, [location]);

  useGSAP(
    () => {
      if (!containerRef.current || !backdropRef.current || !contentRef.current)
        return;

      if (isMapToggled) {
        gsap.set(containerRef.current, { pointerEvents: "auto" });

        const tl = gsap.timeline();
        tl.to(containerRef.current, { autoAlpha: 1, duration: 0.1 })
          .fromTo(
            backdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4, ease: "power2.out" },
            "<",
          )
          .fromTo(
            contentRef.current,
            { opacity: 0, y: 30, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.5)",
            },
            "-=0.2",
          );
      } else {
        gsap.set(containerRef.current, { pointerEvents: "none" });

        const tl = gsap.timeline({
          onComplete: () => {
            setDisplayLocation(null);
          },
        });

        tl.to(contentRef.current, {
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 0.3,
          ease: "power2.in",
        })
          .to(
            backdropRef.current,
            {
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            },
            "-=0.2",
          )
          .to(containerRef.current, {
            autoAlpha: 0,
            duration: 0.1,
          });
      }
    },
    { dependencies: [isMapToggled], scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none invisible fixed inset-0 z-50 flex w-full items-center justify-center opacity-0"
    >
      <div
        ref={backdropRef}
        onClick={onClose}
        className="desktop:block absolute inset-0 hidden cursor-pointer bg-black/60 backdrop-blur-sm"
      />
      <button
        onClick={onClose}
        className="text-size-xl bg-primary/10 absolute top-0 right-0 z-11 rounded-2xl p-3 backdrop-blur-sm"
      >
        X
      </button>
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-180 overflow-hidden rounded-xl bg-white shadow-2xl"
      >
        <iframe
          src={displayLocation?.details.mapLocation}
          width="100%"
          height="900"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
    </div>
  );
}

export default function ModalMapWrapper() {
  const dispatch = useAppDispatch();

  const isMapToggled = useAppSelector((state) => state.isMapOnView.isToggled);
  const location = useAppSelector((state) => state.isMapOnView.location);

  const handleClose = () => {
    dispatch(setMapOnView(null));
  };

  useEffect(() => {
    document.body.style.overflow = isMapToggled ? "hidden" : "scroll";
  }, [isMapToggled]);
  return (
    <MapWrapper
      location={location}
      isMapToggled={isMapToggled}
      onClose={handleClose}
    />
  );
}
