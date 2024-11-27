import ClassDropdown from "@/components/ClassDropdown";
import { useCurrentUser } from "@/context/CurrentUserContext";

import { useGetClasses } from "@/services/classesServices";
import { Class } from "@/types/types";
import { ClipboardList, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { data: classes } = useGetClasses();

  return (
    <section className="w-full p-6">
      <div className="flex flex-wrap gap-6">
        {classes?.map((item) => <ClassCard key={item.class_id} {...item} />)}
      </div>
    </section>
  );
}

type ClassCardProps = Class;

function ClassCard({
  class_id,
  class_subject,
  banner_color,
  class_section,
  class_teacher,
}: ClassCardProps) {
  const { currentUser } = useCurrentUser();

  return (
    <div className="flex h-[296px] w-[302px] flex-col overflow-hidden rounded-xl border-2 transition hover:shadow-md">
      <div
        className="flex justify-between p-5 text-white"
        style={{ background: banner_color }}
      >
        <div className="space-y-1">
          <Link to={`/dashboard/stream/${class_id}`}>
            <p className="line-clamp-1 cursor-pointer text-2xl hover:underline">
              {class_subject}
            </p>
          </Link>
          <p className="text-sm">{class_section}</p>
          {currentUser?.role === "student" && <p>{class_teacher}</p>}
        </div>
        <ClassDropdown
          class_id={class_id}
          class_subject={class_subject}
          class_section={class_section}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-5 text-slate-600"></div>
      <div className="flex justify-end gap-1 border-t-2 px-2 py-1">
        <Link
          className="rounded-full p-3 transition hover:bg-slate-200"
          to={`/dashboard/assignments/${class_id}`}
        >
          <ClipboardList />
        </Link>
        <Link
          className="rounded-full p-3 transition hover:bg-slate-200"
          to={`/dashboard/people/${class_id}`}
        >
          <Users />
        </Link>
      </div>
    </div>
  );
}
