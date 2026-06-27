import { useGSAP, ScrollSmoother } from "@utils/gsap";
import { useRef } from "react";
import { store } from "@/utils/redux-toolkit/store";
import { Provider } from "react-redux";
import ImageViewerModalWrapper from "@/routes/-component/ImageViewerModalWrapper";
import { ClientOnly } from "@tanstack/react-router";
import ModalMapWrapper from "@/routes/-component/ModalMapWrapper";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      ScrollSmoother.create({
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
        speed: 0.5,
      });
    },
    { dependencies: [], scope: containerRef },
  );
  return (
    <Provider store={store}>
      <ClientOnly>
        <ImageViewerModalWrapper />
        <ModalMapWrapper />
      </ClientOnly>
      <div ref={containerRef} id="smooth-wrapper">
        <div id="smooth-content">
          <main className="bg-primary text-primary font-open-sans">
            {children}
          </main>
        </div>
      </div>
    </Provider>
  );
}
