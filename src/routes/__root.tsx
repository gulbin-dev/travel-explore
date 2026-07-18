import {
  HeadContent,
  Scripts,
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import appCss from "../styles.css?url";
import Header from "@components/Header";
import Footer from "@components/Footer";
import PageWrapper from "@components/PageWrapper";
import { useEffect, useState } from "react";
import PageLoader from "@/components/PageLoader";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Travel Explore | Demo Website",
      },
      {
        name: "description",
        content: "A demo project made by Joshua Glenn R. Gulbin (GulbinDev).",
      },
      {
        author: "Joshua Glenn R. Gulbin",
        url: "https://www.linkedin.com/in/joshua-glenn-gulbin/",
      },
      {
        creator: "Joshua Glenn R. Gulbin",
      },
      {
        applicationname: "Travel Explore | Demo Website",
      },
      { property: "og:title", content: "Travel Explore | Demo Website" },
      {
        property: "og:description",
        content: "A demo project made by Joshua Glenn R. Gulbin (GulbinDev).",
      },
      { property: "og:image", content: "" },
      { property: "og:type", content: "article" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
      },
    ],
  }),
  loader: () => void 0,
  shellComponent: RootDocument,
});

function RootDocument() {
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setIsPageReady(true);
      return;
    }

    const handleLoad = () => {
      setIsPageReady(true);
    };

    window.addEventListener("load", handleLoad, { once: true });

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {!isPageReady ? (
          <PageLoader />
        ) : (
          <>
            <Header />
            <PageWrapper>
              <Outlet />
              <Footer />
            </PageWrapper>
          </>
        )}

        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
