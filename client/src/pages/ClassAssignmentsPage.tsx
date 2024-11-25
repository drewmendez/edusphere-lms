import AssignmentDropdown from "@/components/AssignmentDropdown";
import CreateAssignment from "@/components/CreateAssignment";
import { useAuth } from "@/context/AuthContext";
import { useGetAssignmentsInClass } from "@/services/assignmentsServices";
import { useGetClass } from "@/services/classesServices";
import { Assignment } from "@/types/types";
import { ClipboardList } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ClassAssignmentsPage() {
  const { currentUserQuery } = useAuth();
  const role = currentUserQuery.data?.role;

  const params = useParams();
  const class_id = parseInt(params.class_id!);

  const { data: classData } = useGetClass(class_id);
  const { data: assignments } = useGetAssignmentsInClass(class_id);

  return (
    <div className="w-full max-w-[800px]">
      {role === "teacher" && (
        <div className="mb-4">
          <CreateAssignment class_id={class_id} />
        </div>
      )}
      <div className="flex flex-col gap-4">
        {assignments?.map((assignment) => (
          <Link
            key={assignment.assignment_id}
            to={`/dashboard/assignments/${class_id}/${assignment.assignment_id}`}
          >
            <AssignmentCard
              {...assignment}
              accentColor={classData?.banner_color!}
              role={role!}
              class_id={class_id}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

type AssignmentCardProps = Assignment & {
  role: "teacher" | "student";
  accentColor: string;
  class_id: number;
};

function AssignmentCard({
  role,
  assignment_id,
  title,
  created_at,
  accentColor,
  class_id,
}: AssignmentCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border px-5 py-3 shadow">
      <div className="flex items-center gap-2">
        <div
          className="rounded-full p-2 text-white"
          style={{ background: accentColor }}
        >
          <ClipboardList />
        </div>
        <p>{title}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-xs">{created_at}</p>
        {role === "teacher" && (
          <AssignmentDropdown
            assignment_id={assignment_id}
            class_id={class_id}
          />
        )}
      </div>
    </div>
  );
}