import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { currentNonce } from "./lib/csp";

export const getRouter = () => {
  const queryClient = new QueryClient();
  // On the server this is the current request's CSP nonce, so TanStack can stamp it
  // on its inline scripts. In the browser it is undefined.
  const nonce = currentNonce();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    ...(nonce ? { ssr: { nonce } } : {}),
  });

  return router;
};
