"use client";

import type { ItemProp } from "@utils/types";
import { Image } from "@unpic/react";
import { gsap, useGSAP, Observer, mediaQueries } from "@/utils/gsap";
import { useRef, useState, useEffect } from "react";

export default function Carousel({
  item,
  setIsFullScreen,
}: {
  item: ItemProp | null;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(scale);
  const positionRef = useRef(position);
  const dragStartRef = useRef(dragStart);
  const isDraggingRef = useRef(isDragging);
  const lastTapTimeRef = useRef(0);
  const quickToXRef = useRef<((value: number) => void) | null>(null);
  const quickToYRef = useRef<((value: number) => void) | null>(null);
  const pinchStateRef = useRef<{
    initialDistance: number;
    initialScale: number;
    initialPosition: { x: number; y: number };
    initialCenter: { x: number; y: number };
  } | null>(null);

  const clampPosition = (
    nextScale: number,
    nextPosition: { x: number; y: number },
  ) => {
    if (nextScale <= 1) return { x: 0, y: 0 };

    const containerElement = imageContainerRef.current;

    if (!containerElement) return nextPosition;

    const containerRect = containerElement.getBoundingClientRect();
    const viewportElement = containerElement.parentElement;

    if (!viewportElement) return nextPosition;

    const viewportRect = viewportElement.getBoundingClientRect();
    const currentScale = scaleRef.current || 1;
    const baseWidth = containerRect.width / currentScale;
    const baseHeight = containerRect.height / currentScale;

    if (!baseWidth || !baseHeight) return nextPosition;

    const scaledWidth = baseWidth * nextScale;
    const scaledHeight = baseHeight * nextScale;
    const maxPositionX = Math.max(0, (scaledWidth - viewportRect.width) / 2);
    const maxPositionY = Math.max(0, (scaledHeight - viewportRect.height) / 2);
    const positionClampX = gsap.utils.clamp(-maxPositionX, maxPositionX);
    const positionClampY = gsap.utils.clamp(-maxPositionY, maxPositionY);

    return {
      x: positionClampX(nextPosition.x),
      y: positionClampY(nextPosition.y),
    };
  };

  const applyPosition = (
    nextScale: number,
    nextPosition: { x: number; y: number },
  ) => {
    const clampedPosition = clampPosition(nextScale, nextPosition);
    setPosition(clampedPosition);
    quickToXRef.current?.(clampedPosition.x);
    quickToYRef.current?.(clampedPosition.y);
    return clampedPosition;
  };

  const applyScale = (
    nextScale: number,
    nextPosition?: { x: number; y: number },
  ) => {
    setScale(nextScale);

    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        scale: nextScale,
        duration: 0.12,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    if (nextScale <= 1) {
      const resetPosition = { x: 0, y: 0 };
      setPosition(resetPosition);
      quickToXRef.current?.(0);
      quickToYRef.current?.(0);
      return resetPosition;
    }

    const resolvedPosition = nextPosition ?? positionRef.current;
    return applyPosition(nextScale, resolvedPosition);
  };

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    dragStartRef.current = dragStart;
  }, [dragStart]);

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  // Reset zoom and position when image closes or changes
  useEffect(() => {
    if (!fullscreenImage) {
      applyScale(1);
      setIsFullScreen(false);
    } else {
      setIsFullScreen(true);
    }
  }, [fullscreenImage]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      const [firstTouch, secondTouch] = [event.touches[0], event.touches[1]];
      pinchStateRef.current = {
        initialDistance: Math.hypot(
          secondTouch.clientX - firstTouch.clientX,
          secondTouch.clientY - firstTouch.clientY,
        ),
        initialScale: scaleRef.current,
        initialPosition: positionRef.current,
        initialCenter: {
          x: (firstTouch.clientX + secondTouch.clientX) / 2,
          y: (firstTouch.clientY + secondTouch.clientY) / 2,
        },
      };
      setIsDragging(false);
      return;
    }

    if (event.touches.length === 1) {
      const now = Date.now();
      const isDoubleTap = now - lastTapTimeRef.current < 280;
      lastTapTimeRef.current = now;

      if (isDoubleTap) {
        const nextScale = scaleRef.current > 1 ? 1 : 2;
        applyScale(nextScale, positionRef.current);
        setIsDragging(false);
        return;
      }

      if (scaleRef.current > 1) {
        // event.preventDefault();
        setIsDragging(true);
        setDragStart({
          x: event.touches[0].clientX - positionRef.current.x,
          y: event.touches[0].clientY - positionRef.current.y,
        });
      }
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (
      event.touches.length === 1 &&
      isDraggingRef.current &&
      scaleRef.current > 1
    ) {
      // event.preventDefault();
      const touch = event.touches[0];
      applyPosition(scaleRef.current, {
        x: touch.clientX - dragStartRef.current.x,
        y: touch.clientY - dragStartRef.current.y,
      });
      return;
    }

    if (event.touches.length === 2 && pinchStateRef.current) {
      const [firstTouch, secondTouch] = [event.touches[0], event.touches[1]];
      const distance = Math.hypot(
        secondTouch.clientX - firstTouch.clientX,
        secondTouch.clientY - firstTouch.clientY,
      );

      if (distance === 0) return;

      const nextScale = Math.max(
        1,
        Math.min(
          pinchStateRef.current.initialScale *
            (distance / pinchStateRef.current.initialDistance),
          5,
        ),
      );

      applyScale(nextScale, positionRef.current);

      if (nextScale === 1) {
        return;
      }

      const centerX = (firstTouch.clientX + secondTouch.clientX) / 2;
      const centerY = (firstTouch.clientY + secondTouch.clientY) / 2;
      const scaleRatio = nextScale / pinchStateRef.current.initialScale;
      const deltaX = centerX - pinchStateRef.current.initialCenter.x;
      const deltaY = centerY - pinchStateRef.current.initialCenter.y;

      applyPosition(nextScale, {
        x: pinchStateRef.current.initialPosition.x + deltaX * (scaleRatio - 1),
        y: pinchStateRef.current.initialPosition.y + deltaY * (scaleRatio - 1),
      });
      return;
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length < 2) {
      pinchStateRef.current = null;
    }

    if (event.touches.length === 0) {
      setIsDragging(false);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (scaleRef.current === 1) return;

    event.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: event.clientX - positionRef.current.x,
      y: event.clientY - positionRef.current.y,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    event.preventDefault();
    applyPosition(scaleRef.current, {
      x: event.clientX - dragStartRef.current.x,
      y: event.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Track index inside a ref to prevent component re-renders that reset GSAP
  const currentIndexRef = useRef(0);
  const isAnimating = useRef(false);

  // Bridge ref to allow React JSX button clicks to trigger inner GSAP functions
  const goToSlideRef = useRef<((targetIndex: number) => void) | null>(null);

  // Close fullscreen modal on Escape key press
  useEffect(() => {
    if (!fullscreenImage) return;
    const handleKeyDownFullScreen = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreenImage(null);
    };
    window.addEventListener("keydown", handleKeyDownFullScreen);
    return () => window.removeEventListener("keydown", handleKeyDownFullScreen);
  }, [fullscreenImage]);

  useGSAP(
    () => {
      if (!fullscreenImage || !imageContainerRef.current) return;

      quickToXRef.current = gsap.quickTo(imageContainerRef.current, "x", {
        duration: 0.12,
        ease: "power3.out",
      });
      quickToYRef.current = gsap.quickTo(imageContainerRef.current, "y", {
        duration: 0.12,
        ease: "power3.out",
      });
      const observer = Observer.create({
        target: imageContainerRef.current,
        type: "wheel,touch,pointer",
        preventDefault: false,

        onWheel: (self) => {
          const zoomFactor = 0.1;
          let nextScale =
            scaleRef.current + (self.deltaY < 0 ? zoomFactor : -zoomFactor);
          nextScale = Math.max(1, Math.min(nextScale, 5));

          self.event.preventDefault();
          applyScale(nextScale, positionRef.current);
        },
      });

      return () => {
        observer.kill();
        gsap.killTweensOf(imageContainerRef.current, ["x", "y", "scale"]);
        quickToXRef.current = null;
        quickToYRef.current = null;
      };
    },
    { dependencies: [fullscreenImage], scope: imageContainerRef },
  );

  // carousel animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        const { isMobileScreen, isTabletScreen } = context.conditions ?? {};
        if (isMobileScreen || isTabletScreen) {
          const images =
            gsap.utils.toArray<HTMLLIElement>(".li--carousel-item");
          const spans = gsap.utils.toArray<HTMLSpanElement>(".span--indicator");

          if (images.length === 0) return;

          // Reset loop back to 0 if the item dataset changes entirely
          currentIndexRef.current = 0;

          // Layer all images on top of each other and hide the inactive ones off-screen
          gsap.set(images, {
            xPercent: 100,
          });

          // Reset indicator scales

          gsap.set(spans, { scale: 0.75 });

          // Explicitly show the first index components
          gsap.set(images[0], { xPercent: 0 });
          gsap.set(spans[0], { scale: 1.5 });

          const totalItems = images.length;

          // Core function to transition from current slide to any targeted index slide
          const animateToSlide = (nextIndex: number, direction: number) => {
            if (isAnimating.current || nextIndex === currentIndexRef.current)
              return;

            isAnimating.current = true;
            const currentIndex = currentIndexRef.current;

            const currentImg = images[currentIndex];
            const currentSpan = spans[currentIndex];
            const nextImg = images[nextIndex];
            const nextSpan = spans[nextIndex];

            // Math calculates exit (-100% or 100%) and entry positions based on direction factor
            const outPercentage = -100 * direction;
            const inPercentage = 100 * direction;

            // Position the upcoming image right before transitioning it into view
            gsap.set(nextImg, { xPercent: inPercentage });

            const tl = gsap.timeline({
              onComplete: () => {
                currentIndexRef.current = nextIndex;
                isAnimating.current = false;
              },
            });

            tl.to(currentImg, {
              xPercent: outPercentage,
              duration: 0.6,
              ease: "power2.inOut",
            })
              .to(
                currentSpan,
                { scale: 0.75, duration: 0.6, ease: "power2.inOut" },
                "<",
              )
              .to(
                nextImg,
                { xPercent: 0, duration: 0.6, ease: "power2.inOut" },
                "<",
              )
              .to(
                nextSpan,
                { scale: 1.5, duration: 0.6, ease: "power2.inOut" },
                "<",
              );
          };

          // Swipe logic: Calculates next sequential step index safely
          const playNext = (direction: number) => {
            if (isAnimating.current || totalItems <= 1) return;
            const nextIndex =
              (currentIndexRef.current + direction + totalItems) % totalItems;
            animateToSlide(nextIndex, direction);
          };

          // Button layout logic: Determines sliding direction based on index positions
          goToSlideRef.current = (targetIndex: number) => {
            if (isAnimating.current || targetIndex === currentIndexRef.current)
              return;
            const direction = targetIndex > currentIndexRef.current ? 1 : -1;
            animateToSlide(targetIndex, direction);
          };

          const obs = Observer.create({
            target: containerRef.current,
            type: "touch,pointer",
            onLeft: () => playNext(1), // Swiping left moves to next item
            onRight: () => playNext(-1), // Swiping right moves to previous item
            tolerance: 10,
            preventDefault: false, // Set to false to allow natural page scrolling
          });
          return () => {
            obs.kill();
            goToSlideRef.current = null;
          };
        }
      });
    },
    { dependencies: [item], scope: containerRef },
  );

  return (
    <>
      <div
        ref={containerRef}
        className="relative mt-10 aspect-video min-h-40 w-full overflow-hidden select-none"
      >
        <ul className="desktop:flex relative m-0 h-full w-full list-none p-0">
          {item?.images.map((image, index) => (
            <li
              key={index}
              className="li--carousel-item desktop:relative absolute inset-0 h-full w-full"
            >
              <button
                type="button"
                onClick={() => setFullscreenImage(image.image)}
                className="absolute inset-0 block h-full w-full focus:outline-none md:cursor-zoom-in"
                aria-label="View image fullscreen"
              >
                <Image
                  src={image.image}
                  layout="constrained"
                  height={900}
                  width={1280}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  breakpoints={[
                    380, 430, 560, 680, 768, 992, 1080, 1240, 1440, 2880, 3680,
                  ]}
                  className="absolute inset-0 block h-full w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="desktop:hidden absolute bottom-0 left-0 z-10 block w-full">
          <ul className="flex justify-center gap-1.5 pb-3">
            {item?.images.map((_, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => goToSlideRef.current?.(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className="block p-2"
                >
                  <span className="bg-cta span--indicator block h-1 w-6 origin-center rounded-sm"></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Fullscreen Overlay Backdrop Container */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 flex scrollbar-none items-center justify-center overflow-hidden bg-black/90 backdrop-blur-sm select-none"
          onClick={() => setFullscreenImage(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            className="fixed top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-xl font-bold text-white hover:text-gray-300 focus:outline-none"
            onClick={() => setFullscreenImage(null)}
            aria-label="Close fullscreen view"
          >
            ✕
          </button>

          {/* Image Container */}
          <div
            ref={imageContainerRef}
            className="absolute inset-0 block h-full w-full transition-transform duration-100 ease-out will-change-transform"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.preventDefault()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              cursor:
                scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              touchAction: "none",
              transformOrigin: "center center",
            }}
          >
            <Image
              src={fullscreenImage}
              layout="fullWidth"
              loading="lazy"
              decoding="async"
              alt="Fullscreen presentation layout view"
              breakpoints={[
                380, 430, 560, 680, 768, 992, 1080, 1240, 1440, 2880, 3680,
              ]}
              className="h-full w-full object-cover shadow-2xl"
              draggable="false"
            />
          </div>
        </div>
      )}
    </>
  );
}
