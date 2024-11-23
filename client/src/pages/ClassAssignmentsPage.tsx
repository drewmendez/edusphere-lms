import CreateAssignment from "@/components/CreateAssignment";
import { useAuth } from "@/context/AuthContext";
import { useGetAssignmentsInClass } from "@/services/assignmentsServices";
import { useGetClass } from "@/services/classesServices";
import { Assignment } from "@/types/types";
import { ClipboardList } from "lucide-react";
import { useParams } from "react-router-dom";

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
      <div className="space-y-4">
        {assignments?.map((assignment) => (
          <AssignmentCard
            key={assignment.assignment_id}
            {...assignment}
            accentColor={classData?.banner_color}
          />
        ))}
      </div>
    </div>
  );
}

type AssignmentCardProps = Assignment & {
  accentColor?: string;
};

function AssignmentCard({
  title,
  created_at,
  accentColor,
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
      <p className="text-xs">{created_at}</p>
    </div>
  );
}
