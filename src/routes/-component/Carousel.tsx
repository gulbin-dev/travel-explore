"use client";

import { Image } from "@unpic/react";
import { gsap, useGSAP, Observer, mediaQueries } from "@/utils/gsap";
import { useRef, useState, useEffect } from "react";
import LoadingChip from "@/components/UI/LoadingChip";
import ErrorChip from "@/components/UI/ErrorChip";
import { useAppDispatch, useAppSelector } from "@hooks/redux-hooks";
import { setFullScreenView } from "@utils/redux-toolkit/feature/viewImageSlice";
import useWindowSizeListener from "@/hooks/useWindowSizeListener";

function CarouselImage({ src }: { src: string }) {
  const [imageStatus, setImageStatus] = useState<
    "loading" | "error" | "loaded"
  >("loading");
  return (
    <div className="relative h-full w-full">
      {/* Overlay chips based on state */}
      {imageStatus === "loading" && <LoadingChip />}
      {imageStatus === "error" && <ErrorChip />}

      <Image
        src={src}
        layout="constrained"
        height={900}
        width={1280}
        alt=""
        loading="lazy"
        decoding="async"
        breakpoints={[
          380, 430, 560, 680, 768, 992, 1080, 1240, 1440, 2880, 3680,
        ]}
        className={`absolute inset-0 block h-full w-full object-cover transition-opacity duration-300 ${
          imageStatus === "loaded"
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onLoadStart={() => setImageStatus("loading")}
        onError={() => setImageStatus("error")}
        onLoad={() => setImageStatus("loaded")}
      />
    </div>
  );
}
export default function Carousel() {
  const [imageStatus, setImageStatus] = useState<
    "loading" | "error" | "loaded"
  >("loading");
  const activeItem = useAppSelector((state) => state.isImageOnView.activeItem);
  const fullScreenImage = useAppSelector(
    (state) => state.isImageOnView.fullScreenImageSource,
  );
  const isFullScreen = useAppSelector(
    (state) => state.isImageOnView.isFullScreen,
  );
  const dispatch = useAppDispatch();
  const windowSize = useWindowSizeListener();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);
  const positionRef = useRef({ x: 0, y: 0 });
  const dragOriginRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastTapTimeRef = useRef(0);
  const quickSetterXRef = useRef<((value: number) => void) | null>(null);
  const quickSetterYRef = useRef<((value: number) => void) | null>(null);
  const pinchStateRef = useRef<{
    initialDistance: number;
    initialScale: number;
    initialPosition: { x: number; y: number };
    initialCenter: { x: number; y: number };
  } | null>(null);

  const setContainerCursor = (cursor: string) => {
    if (imageContainerRef.current) {
      imageContainerRef.current.style.cursor = cursor;
    }
  };

  const resetZoom = () => {
    scaleRef.current = 1;
    positionRef.current = { x: 0, y: 0 };
    dragOriginRef.current = { x: 0, y: 0 };
    isDraggingRef.current = false;

    if (imageContainerRef.current) {
      gsap.killTweensOf(imageContainerRef.current, ["x", "y", "scale"]);
      gsap.set(imageContainerRef.current, {
        x: 0,
        y: 0,
        scale: 1,
      });
      setContainerCursor("default");
    }
  };

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
    positionRef.current = clampedPosition;

    quickSetterXRef.current?.(clampedPosition.x);
    quickSetterYRef.current?.(clampedPosition.y);
    return clampedPosition;
  };

  const applyScale = (
    nextScale: number,
    nextPosition?: { x: number; y: number },
  ) => {
    scaleRef.current = nextScale;

    if (!imageContainerRef.current) return { x: 0, y: 0 };

    gsap.to(imageContainerRef.current, {
      scale: nextScale,
      duration: 0.12,
      ease: "power3.out",
      overwrite: "auto",
    });

    if (nextScale <= 1) {
      const resetPosition = { x: 0, y: 0 };
      positionRef.current = resetPosition;
      quickSetterXRef.current?.(0);
      quickSetterYRef.current?.(0);
      setContainerCursor("default");
      return resetPosition;
    }

    setContainerCursor("grab");
    const resolvedPosition = nextPosition ?? positionRef.current;
    return applyPosition(nextScale, resolvedPosition);
  };

  // toggle fullScreenImage payload
  useEffect(() => {
    if (!isFullScreen) {
      resetZoom();
      dispatch(setFullScreenView(""));
      return;
    }
    dispatch(setFullScreenView(fullScreenImage));
  }, [isFullScreen]);

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
      return;
    }

    if (event.touches.length === 1) {
      const now = Date.now();
      const isDoubleTap = now - lastTapTimeRef.current < 280;
      lastTapTimeRef.current = now;

      if (isDoubleTap) {
        const nextScale = scaleRef.current > 1 ? 1 : 2;
        applyScale(nextScale, positionRef.current);
      }
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 2 || !pinchStateRef.current) return;

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

    if (nextScale === 1) return;

    const centerX = (firstTouch.clientX + secondTouch.clientX) / 2;
    const centerY = (firstTouch.clientY + secondTouch.clientY) / 2;
    const scaleRatio = nextScale / pinchStateRef.current.initialScale;
    const deltaX = centerX - pinchStateRef.current.initialCenter.x;
    const deltaY = centerY - pinchStateRef.current.initialCenter.y;

    applyPosition(nextScale, {
      x: pinchStateRef.current.initialPosition.x + deltaX * (scaleRatio - 1),
      y: pinchStateRef.current.initialPosition.y + deltaY * (scaleRatio - 1),
    });
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length < 2) {
      pinchStateRef.current = null;
    }
  };
  // Track index inside a ref to prevent component re-renders that reset GSAP
  const currentIndexRef = useRef(0);
  const isAnimating = useRef(false);

  // Bridge ref to allow React JSX button clicks to trigger inner GSAP functions
  const goToSlideRef = useRef<((targetIndex: number) => void) | null>(null);

  // Close fullscreen modal on Escape key press
  useEffect(() => {
    if (!isFullScreen) return;
    const handleKeyDownFullScreen = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(setFullScreenView(""));
    };
    window.addEventListener("keydown", handleKeyDownFullScreen);
    return () => window.removeEventListener("keydown", handleKeyDownFullScreen);
  }, [isFullScreen]);

  // image drag animation on full screen view
  useGSAP(
    () => {
      if (!isFullScreen || !imageContainerRef.current) return;

      quickSetterXRef.current = gsap.quickSetter(
        imageContainerRef.current,
        "x",
        "px",
      ) as (value: number) => void;
      quickSetterYRef.current = gsap.quickSetter(
        imageContainerRef.current,
        "y",
        "px",
      ) as (value: number) => void;

      const observer = Observer.create({
        target: imageContainerRef.current,
        type: "wheel,touch,pointer",
        preventDefault: false,
        tolerance: 10,
        onWheel: (self) => {
          const zoomFactor = 0.12;
          let nextScale =
            scaleRef.current + (self.deltaY < 0 ? zoomFactor : -zoomFactor);
          nextScale = Math.max(1, Math.min(nextScale, 5));

          self.event.preventDefault();
          applyScale(nextScale, positionRef.current);
        },
        onPress: (self) => {
          const x = self.x ?? 0;
          const y = self.y ?? 0;
          if (scaleRef.current > 1) {
            isDraggingRef.current = true;
            dragOriginRef.current = {
              x: x - positionRef.current.x,
              y: y - positionRef.current.y,
            };
            setContainerCursor("grabbing");
          }
        },
        onDrag: (self) => {
          if (!isDraggingRef.current || scaleRef.current <= 1) return;

          const x = self.x ?? 0;
          const y = self.y ?? 0;
          const nextPosition = {
            x: x - dragOriginRef.current.x,
            y: y - dragOriginRef.current.y,
          };
          applyPosition(scaleRef.current, nextPosition);
        },
        onDragEnd: () => {
          isDraggingRef.current = false;
          setContainerCursor(scaleRef.current > 1 ? "grab" : "default");
        },
      });

      return () => {
        observer.kill();
        gsap.killTweensOf(imageContainerRef.current, ["x", "y", "scale"]);
        quickSetterXRef.current = null;
        quickSetterYRef.current = null;
      };
    },
    { dependencies: [isFullScreen], scope: imageContainerRef },
  );

  // carousel animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mediaQueries, (context) => {
        const { isMobileScreen, isTabletScreen } = context.conditions ?? {};

        if (!activeItem) return;
        const currentIndex = activeItem.itemIndex;
        if (isMobileScreen || isTabletScreen) {
          const images =
            gsap.utils.toArray<HTMLLIElement>(".li--carousel-item");
          const spans = gsap.utils.toArray<HTMLSpanElement>(".span--indicator");

          if (images.length === 0) return;

          // Reset loop back to 0 if the item dataset changes entirely
          currentIndexRef.current = currentIndex;
          // Layer all images on top of each other and hide the inactive ones off-screen
          gsap.set(images, {
            xPercent: 100,
          });

          // Reset indicator scales
          gsap.set(spans, { scale: 0.75 });

          // Explicitly show the first index components
          gsap.set(images[currentIndex], { xPercent: 0 });
          gsap.set(spans[currentIndex], { scale: 1.5 });

          const totalItems = images.length;

          // Core function to transition from current slide to any targeted index slide
          const animateToSlide = (nextIndex: number, direction: number) => {
            if (isAnimating.current || nextIndex === currentIndexRef.current)
              return;

            isAnimating.current = true;

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
          });
          return () => {
            obs.kill();
            goToSlideRef.current = null;
          };
        }
      });
    },
    { dependencies: [activeItem, windowSize], scope: containerRef },
  );

  return (
    <>
      <div
        ref={containerRef}
        className="relative mt-10 aspect-video min-h-40 w-full overflow-hidden select-none"
      >
        <ul className="desktop:flex relative m-0 h-full w-full list-none p-0">
          {activeItem?.item.images.map((image, index) => (
            <li
              key={index}
              className="li--carousel-item desktop:relative absolute inset-0 h-full w-full place-content-center place-items-center"
            >
              <button
                type="button"
                onClick={() => dispatch(setFullScreenView(image.image))}
                className="absolute inset-0 z-1 block h-full w-full focus:outline-none md:cursor-zoom-in"
                aria-label="View image fullscreen"
              >
                <CarouselImage src={image.image} />
              </button>
            </li>
          ))}
        </ul>

        <div className="desktop:hidden absolute bottom-0 left-0 z-10 block w-full">
          <ul className="flex justify-center gap-1.5 pb-3">
            {activeItem?.item.images.map((_, index) => (
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
      {isFullScreen && (
        <div className="fixed inset-0 z-50 flex h-screen scrollbar-none items-center justify-center overflow-hidden bg-black/90 backdrop-blur-sm select-none">
          {/* Close Button */}
          <button
            type="button"
            className="fixed top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-xl font-bold text-white hover:text-gray-300 focus:outline-none"
            onClick={() => dispatch(setFullScreenView(""))}
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              touchAction: "none",
              transformOrigin: "center center",
            }}
          >
            {imageStatus === "loading" && <LoadingChip />}
            {imageStatus === "error" && <ErrorChip />}
            <Image
              src={fullScreenImage}
              layout="fullWidth"
              loading="lazy"
              decoding="async"
              height={1024}
              alt="Fullscreen presentation layout view"
              className={`absolute block h-full w-full object-contain transition-opacity duration-300 ${
                imageStatus === "loaded"
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
              draggable="false"
              onLoadStart={() => setImageStatus("loading")}
              onError={() => setImageStatus("error")}
              onLoad={() => setImageStatus("loaded")}
            />
          </div>
        </div>
      )}
    </>
  );
}
