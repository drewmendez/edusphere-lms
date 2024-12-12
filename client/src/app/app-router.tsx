import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "@/app/pages/landing";
import SignInPage from "@/app/pages/sign-in";
import SignUpPage from "@/app/pages/sign-up";
import DashboardPage from "@/app/pages/dashboard";
import ClassStreamPage from "@/app/pages/class-stream";
import ClassPeoplePage from "@/app/pages/class-people";
import ClassAssignmentsPage from "@/app/pages/class-assignments";
import AssignmentPage from "@/app/pages/assignment";
import AssignedPage from "@/app/pages/assigned";
import DonePage from "@/app/pages/done";
import NotReviewedPage from "@/app/pages/not-reviewed";
import ReviewedPage from "@/app/pages/reviewed";
import DashboardLayout from "@/app/layouts/dashboard-layout";
import ProtectedLayout from "@/app/layouts/protected-layout";
import ClassLayout from "@/app/layouts/class-layout";
import ToReviewLayout from "@/app/layouts/to-review-layout";
import TodoLayout from "@/app/layouts/todo-layout";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LandingPage />,
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

export default function AppRouter() {
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}
