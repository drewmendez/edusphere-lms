import HomePage from "@/pages/HomePage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardPage from "@/pages/DashboardPage";
import ToReviewPage from "@/pages/ToReviewPage";
import ClassStreamPage from "@/pages/ClassStreamPage";
import ClassPageLayout from "@/pages/ClassPageLayout";
import ClassPeoplePage from "@/pages/ClassPeoplePage";
import ClassAssignmentsPage from "@/pages/ClassAssignmentsPage";

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
        element: <DashboardPage />,
      },
      {
        element: <ClassPageLayout />,
        children: [
          {
            path: "/dashboard/stream/:class_id",
            element: <ClassStreamPage />,
          },
          {
            path: "/dashboard/assignments/:class_id",
            element: <ClassAssignmentsPage />,
          },
          {
            path: "/dashboard/people/:class_id",
            element: <ClassPeoplePage />,
          },
        ],
      },
      {
        path: "/to-review",
        element: <ToReviewPage />,
      },
    ],
  },
]);
