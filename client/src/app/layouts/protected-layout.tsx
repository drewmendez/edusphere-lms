import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "@/context/CurrentUserContext";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { currentUser } = useCurrentUser();

  if (!currentUser) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
