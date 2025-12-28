import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import "./index.css";

import { LocationProvider } from "./context/LocationContext.jsx";
import { SeatProvider } from "./context/SeatContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LocationProvider>
          <SeatProvider>
            <App />
          </SeatProvider>
        </LocationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
