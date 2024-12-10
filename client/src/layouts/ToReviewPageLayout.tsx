import LayoutNav from "@/components/LayoutNav";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { Outlet, useParams } from "react-router-dom";

const NAVLINKS = [
  {
    text: "To Review",
    path: "/to-review/not-reviewed/all",
  },
  {
    text: "Reviewed",
    path: "/to-review/reviewed/all",
  },
];

export default function ToReviewPageLayout() {
  const { student_id } = useParams();

  const { currentUser } = useCurrentUser();

  if (currentUser.role !== "teacher") {
    window.history.back();
  }

  return (
    <section className="relative w-full">
      <LayoutNav navlinks={NAVLINKS} id={student_id!} />
      <div className="flex w-full items-center justify-center p-6">
        <Outlet />
      </div>
    </section>
  );
}
