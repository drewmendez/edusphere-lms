import CurrentUserContextProvider from "@/context/CurrentUserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrentUserContextProvider>
        {children}
        <Toaster />
      </CurrentUserContextProvider>
    </QueryClientProvider>
  );
}
