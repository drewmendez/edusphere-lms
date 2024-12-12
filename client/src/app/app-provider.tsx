import CurrentUserContextProvider from "@/context/CurrentUserContext";
import { ThemeProvider } from "@/context/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CurrentUserContextProvider>
          {children}
          <Toaster />
        </CurrentUserContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
