import CreateAssignment from "@/components/CreateAssignment";
import { useAuth } from "@/context/AuthContext";
import { useGetAssignmentsInClass } from "@/services/assignmentsServices";
import { Assignment } from "@/types/types";
import { ClipboardList } from "lucide-react";
import { useParams } from "react-router-dom";

export default function ClassAssignmentsPage() {
  const { currentUserQuery } = useAuth();
  const role = currentUserQuery.data?.role;

  const params = useParams();
  const class_id = parseInt(params.class_id!);

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
          <AssignmentCard key={assignment.assignment_id} {...assignment} />
        ))}
      </div>
    </div>
  );
}

type AssignmentCardProps = Assignment;

function AssignmentCard({ title, created_at }: AssignmentCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3 shadow">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-primary p-2 text-white">
          <ClipboardList />
        </div>
        <p>{title}</p>
      </div>
      <p className="text-xs">{created_at}</p>
    </div>
  );
}
