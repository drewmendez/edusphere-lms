import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const { currentUserQuery } = useAuth();

  if (!currentUserQuery.data) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
