import HomePage from "@/pages/HomePage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "@/pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
