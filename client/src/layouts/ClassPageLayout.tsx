import LayoutNav from "@/components/LayoutNav";
import { Outlet, useParams } from "react-router-dom";

const NAVLINKS = [
  {
    text: "Stream",
    path: "/class/stream/",
  },
  {
    text: "Assignments",
    path: "/class/assignments/",
  },
  {
    text: "People",
    path: "/class/people/",
  },
];

export default function ClassPageLayout() {
  const { class_id } = useParams();

  return (
    <section className="relative w-full">
      <LayoutNav navlinks={NAVLINKS} id={class_id!} />
      <div className="flex w-full items-center justify-center p-6">
        <Outlet />
      </div>
    </section>
  );
}
