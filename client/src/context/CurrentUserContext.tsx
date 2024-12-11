import { useGetCurrentUser } from "@/lib/auth";
import { User } from "@/types/types";
import { createContext, ReactNode, useContext } from "react";

interface CurrentUserContext {
  currentUser: User;
}

const CurrentUserContext = createContext<CurrentUserContext | null>(null);

export default function CurrentUserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const {
    data: currentUser,
    isPending,
    isError,
    isFetching,
  } = useGetCurrentUser();

  if (isPending || isFetching)
    return (
      <p className="flex h-screen items-center justify-center">
        Authenticating...
      </p>
    );

  if (isError) return;

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be within CurrentUserContextProvider");
  }
  return context;
};
