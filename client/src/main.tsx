import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router/routes";
import AuthContextProvider from "./context/AuthContext";
import "./index.css";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
        <Toaster />
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
