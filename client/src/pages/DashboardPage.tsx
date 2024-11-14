import ClassDropdown from "@/components/ClassDropdown";

import { useGetClasses } from "@/services/classesServices";
import { useGetStudentsInClass } from "@/services/enrollmentsServices";

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

interface ClassCardProps {
  class_id: number;
  class_subject: string;
  class_code: string;
  banner_color: string;
  class_section: string;
}

function ClassCard({
  class_id,
  class_subject,
  class_code,
  banner_color,
  class_section,
}: ClassCardProps) {
  const { data: students } = useGetStudentsInClass(class_id);

  return (
    <div className="flex h-[296px] w-[302px] flex-col overflow-hidden rounded-xl border-2">
      <div
        className="flex justify-between p-5 text-white"
        style={{ background: banner_color }}
      >
        <div className="space-y-2">
          <p className="line-clamp-1 text-2xl">{class_subject}</p>
          <p>{class_section}</p>
        </div>
        <ClassDropdown
          class_id={class_id}
          class_subject={class_subject}
          class_section={class_section}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-5 text-slate-600">
        <p className="text-sm">
          Class code:{" "}
          <span className="text-xl font-semibold">{class_code}</span>
        </p>
        <div>
          <p>
            <span className="text-2xl">22</span> Assignments
          </p>
          <p>
            <span className="text-2xl">{students?.length}</span> Students
            enrolled
          </p>
        </div>
      </div>
    </div>
  );
}
