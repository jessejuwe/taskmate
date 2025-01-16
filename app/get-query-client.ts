import {
  isServer,
  defaultShouldDehydrateQuery,
  QueryClient,
  type QueryClientConfig,
} from "@tanstack/react-query";

const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable refetching on window focus
      refetchOnReconnect: false,
      retry: 0, // Number of retries before failing the query
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    dehydrate: {
      // include pending queries in dehydration
      shouldDehydrateQuery: (query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === "pending",
    },
    mutations: {
      onSuccess: () => console.log("Mutation success!"),
      onError: (error) => console.error("Mutation error:", error),
      onSettled: () => console.log("Mutation settled"),
    },
  },
};

function makeQueryClient() {
  return new QueryClient(queryConfig);
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function resetQueryQlient() {
  const queryClient = getQueryClient();
  queryClient.clear();
  if (browserQueryClient) {
    browserQueryClient.clear();
  }
}
