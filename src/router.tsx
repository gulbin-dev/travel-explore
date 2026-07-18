import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import NotFoundPage from "./components/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLoader from "./components/PageLoader";

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => {
      <NotFoundPage />;
    },
    defaultErrorComponent: ({ error }) => <ErrorBoundary error={error} />,
    defaultPendingComponent: () => <PageLoader />,
    defaultPendingMs: 1000,
    defaultPendingMinMs: 500,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
