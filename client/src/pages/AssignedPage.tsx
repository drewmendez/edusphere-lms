import ClassesFilter from "@/components/ClassesFilter";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { useGetAssignments } from "@/services/assignmentsServices";
import { Assignment } from "@/types/types";
import { ClipboardList } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function AssignedPage() {
  const { currentUser } = useCurrentUser();
  const params = useParams();
  const filter = params.filter;

  const { data: assignments } = useGetAssignments(
    currentUser.user_id,
    filter!,
    "assigned",
  );

  return (
    <div className="w-full max-w-[800px] space-y-4">
      <ClassesFilter path="to-do" status="assigned" />
      {assignments?.map((assignment) => (
        <AssignmentCard key={assignment.assignment_id} {...assignment} />
      ))}
    </div>
  );
}

type AssignmentCardProps = Assignment;

function AssignmentCard({
  banner_color,
  title,
  created_at,
  class_id,
  class_subject,
  class_section,
  assignment_id,
}: AssignmentCardProps) {
  return (
    <Link
      to={`/class/assignments/${class_id}/${assignment_id}`}
      className="block"
    >
      <div className="flex items-center justify-between rounded-lg border px-5 py-3 shadow">
        <div className="flex items-center gap-4">
          <div
            className="rounded-full p-2 text-white"
            style={{ background: banner_color }}
          >
            <ClipboardList />
          </div>
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-xs">
              {class_subject} - {class_section}
            </p>
          </div>
        </div>
        <p className="text-xs">Posted on {created_at}</p>
      </div>
    </Link>
  );
}
