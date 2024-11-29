import ClassesFilter from "@/components/ClassesFilter";
import { useCurrentUser } from "@/context/CurrentUserContext";
import {
  useGetAssignments,
  useGetAssignmentSubmissionData,
} from "@/services/assignmentsServices";
import { Assignment } from "@/types/types";
import { ClipboardList } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function ReviewedPage() {
  const { currentUser } = useCurrentUser();
  const params = useParams();
  const filter = params.filter;

  const { data: assignments, refetch: refetchAssignments } = useGetAssignments(
    currentUser?.user_id!,
    filter!,
  );

  return (
    <div className="w-full max-w-[800px] space-y-4">
      <ClassesFilter
        path="to-review"
        status="reviewed"
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
}: AssignmentCardProps) {
  const { data: submissionData, isFetching } = useGetAssignmentSubmissionData(
    assignment_id,
    class_id!,
  );

  if (
    !(
      submissionData?.marked! > 0 &&
      submissionData?.handedIn === 0 &&
      submissionData.assigned === 0
    ) ||
    isFetching
  ) {
    return;
  }

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
        <div className="flex gap-5">
          <div>
            <p className="text-2xl font-semibold">{submissionData?.handedIn}</p>
            <p className="text-sm">Handed in</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">{submissionData?.assigned}</p>
            <p className="text-sm">Assigned</p>
          </div>
          <div>
            <p className="text-2xl font-semibold">{submissionData?.marked}</p>
            <p className="text-sm">Marked</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
