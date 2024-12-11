import { useCurrentUser } from "@/context/CurrentUserContext";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

type AuthLayoutProps = PropsWithChildren;

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { currentUser } = useCurrentUser();

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
