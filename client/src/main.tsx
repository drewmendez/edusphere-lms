import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router/routes";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
import CurrentUserContextProvider from "./context/CurrentUserContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CurrentUserContextProvider>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
        <Toaster />
      </CurrentUserContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
