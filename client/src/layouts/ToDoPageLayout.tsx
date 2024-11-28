import LayoutNav from "@/components/LayoutNav";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { Outlet, useParams } from "react-router-dom";

const NAVLINKS = [
  {
    text: "Assigned",
    path: "/to-do/assigned/all",
  },
  {
    text: "Done",
    path: "/to-do/done/all",
  },
];

export default function ToDoPageLayout() {
  const { student_id } = useParams();

  const { currentUser } = useCurrentUser();

  if (currentUser?.role !== "student") {
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
