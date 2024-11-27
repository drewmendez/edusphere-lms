import { useGetCurrentUser } from "@/services/authServices";
import { User } from "@/types/types";
import { createContext, ReactNode, useContext } from "react";

interface CurrentUserContext {
  currentUser: User | undefined;
}

const CurrentUserContext = createContext<CurrentUserContext | null>(null);

export default function CurrentUserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: currentUser, isFetching: isFetchingCurrentUser } =
    useGetCurrentUser();

  if (isFetchingCurrentUser)
    return (
      <p className="flex h-screen items-center justify-center">
        Authenticating...
      </p>
    );

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
