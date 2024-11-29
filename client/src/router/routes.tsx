import HomePage from "@/pages/HomePage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRouteLayout from "../layouts/ProtectedRouteLayout";
import DashboardPage from "@/pages/DashboardPage";
import ClassStreamPage from "@/pages/ClassStreamPage";
import ClassPageLayout from "@/layouts/ClassPageLayout";
import ClassPeoplePage from "@/pages/ClassPeoplePage";
import ClassAssignmentsPage from "@/pages/ClassAssignmentsPage";
import AssignmentPage from "@/pages/AssignmentPage";
import AssignedPage from "@/pages/AssignedPage";
import ToDoPageLayout from "@/layouts/ToDoPageLayout";
import DonePage from "@/pages/DonePage";
import ToReviewPageLayout from "@/layouts/ToReviewPageLayout";
import NotReviewedPage from "@/pages/NotReviewedPage";
import ReviewedPage from "@/pages/ReviewedPage";

export const router = createBrowserRouter(
  [
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
      element: <ProtectedRouteLayout />,
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
              path: "/dashboard/assignments/:class_id/:assignment_id",
              element: <AssignmentPage />,
            },
            {
              path: "/dashboard/people/:class_id",
              element: <ClassPeoplePage />,
            },
          ],
        },
        {
          element: <ToReviewPageLayout />,
          children: [
            {
              path: "/to-review/not-reviewed/:filter",
              element: <NotReviewedPage />,
            },
            {
              path: "/to-review/reviewed/:filter",
              element: <ReviewedPage />,
            },
          ],
        },
        {
          element: <ToDoPageLayout />,
          children: [
            {
              path: "/to-do/assigned/:filter",
              element: <AssignedPage />,
            },
            {
              path: "/to-do/done/:filter",
              element: <DonePage />,
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);
