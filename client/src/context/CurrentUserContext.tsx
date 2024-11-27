import { useGetCurrentUser } from "@/services/authServices";
import { User } from "@/types/types";
import { createContext, ReactNode, useContext } from "react";

interface CurrentUserContext {
  currentUser: User | undefined;
  isFetchingCurrentUser: boolean;
}

const CurrentUserContext = createContext<CurrentUserContext | null>(null);

export default function CurrentUserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: currentUser, isFetching: isFetchingCurrentUser } =
    useGetCurrentUser();

  return (
    <CurrentUserContext.Provider value={{ currentUser, isFetchingCurrentUser }}>
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
