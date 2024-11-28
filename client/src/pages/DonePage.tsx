import ClassesFilter from "@/components/ClassesFilter";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { useGetAssignments } from "@/services/assignmentsServices";
import { Assignment } from "@/types/types";
import { ClipboardList } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function DonePage() {
  const { currentUser } = useCurrentUser();
  const params = useParams();
  const filter = params.filter;

  const { data: assignments, refetch: refetchAssignments } = useGetAssignments(
    currentUser?.user_id!,
    filter!,
    "done",
  );

  return (
    <div className="w-full max-w-[800px] space-y-4">
      <ClassesFilter
        path="to-do"
        status="done"
        refetchAssignments={refetchAssignments}
      />
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
  class_id,
  class_subject,
  class_section,
  assignment_id,
  given_points,
  points,
  submitted_at,
}: AssignmentCardProps) {
  return (
    <Link
      to={`/dashboard/assignments/${class_id}/${assignment_id}`}
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
        <div className="flex flex-col items-end gap-1">
          {given_points ? (
            <p className="text-sm font-semibold">
              Marked {given_points}/{points}
            </p>
          ) : (
            <p className="text-sm font-semibold">Handed in</p>
          )}
          <p className="text-xs">Submitted on {submitted_at}</p>
        </div>
      </div>
    </Link>
  );
}
