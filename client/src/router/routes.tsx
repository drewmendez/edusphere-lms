import HomePage from "@/pages/HomePage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import ClassStreamPage from "@/pages/ClassStreamPage";
import ClassPeoplePage from "@/pages/ClassPeoplePage";
import ClassAssignmentsPage from "@/pages/ClassAssignmentsPage";
import AssignmentPage from "@/pages/AssignmentPage";
import AssignedPage from "@/pages/AssignedPage";
import DonePage from "@/pages/DonePage";
import NotReviewedPage from "@/pages/NotReviewedPage";
import ReviewedPage from "@/pages/ReviewedPage";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ProtectedLayout from "@/components/layouts/protected-layout";
import ClassLayout from "@/components/layouts/class-layout";
import ToReviewLayout from "@/components/layouts/to-review-layout";
import TodoLayout from "@/components/layouts/todo-layout";

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
      element: (
        <ProtectedLayout>
          <DashboardLayout />
        </ProtectedLayout>
      ),
      children: [
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          element: <ClassLayout />,
          children: [
            {
              path: "/class/stream/:class_id",
              element: <ClassStreamPage />,
            },
            {
              path: "/class/assignments/:class_id",
              element: <ClassAssignmentsPage />,
            },
            {
              path: "/class/assignments/:class_id/:assignment_id",
              element: <AssignmentPage />,
            },
            {
              path: "/class/people/:class_id",
              element: <ClassPeoplePage />,
            },
          ],
        },
        {
          element: <ToReviewLayout />,
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
          element: <TodoLayout />,
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
