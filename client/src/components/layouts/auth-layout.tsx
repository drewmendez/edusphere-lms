import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "@/context/CurrentUserContext";

type AuthLayoutProps = PropsWithChildren;

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { currentUser } = useCurrentUser();

  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
