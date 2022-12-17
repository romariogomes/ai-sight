import React from "react";
import ReactDOM from "react-dom";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      refetchOnMount: false,
    },
  },
  queryCache: new QueryCache({}),
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
