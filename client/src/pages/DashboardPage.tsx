import ClassDropdown from "@/components/ClassDropdown";
import { useAuth } from "@/context/AuthContext";

import { useGetClasses } from "@/services/classesServices";
import { useGetStudentsInClass } from "@/services/enrollmentsServices";
import { Class } from "@/types/types";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { currentUserQuery } = useAuth();
  const user_id = currentUserQuery.data?.user_id;
  const { data: classes } = useGetClasses(user_id!);

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
  class_code,
  banner_color,
  class_section,
  class_teacher,
}: ClassCardProps) {
  const { data: students } = useGetStudentsInClass(class_id);
  const { currentUserQuery } = useAuth();
  const role = currentUserQuery.data?.role;

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
          {role === "student" && <p>{class_teacher}</p>}
        </div>
        <ClassDropdown
          class_id={class_id}
          class_subject={class_subject}
          class_section={class_section}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-5 text-slate-600">
        {role === "teacher" && (
          <p className="text-sm">
            Class code:{" "}
            <span className="text-lg font-semibold">{class_code}</span>
          </p>
        )}

        <div className="mt-auto text-sm">
          <p>
            <span className="text-base">22</span> Assignments
          </p>
          <p>
            <span className="text-base">{students?.length}</span> Students
            enrolled
          </p>
        </div>
      </div>
    </div>
  );
}
