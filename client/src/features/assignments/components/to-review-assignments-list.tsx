import { useGetAssignments } from "../queries/use-get-assignments";
import { useGetAssignmentSubmissionData } from "../queries/use-get-assignment-submdata";
import { useLocation, useParams } from "react-router-dom";
import AssignmentContainer from "../../../components/assignment-container";
import { Assignment } from "../types";

export default function ToReviewAssignmentsList() {
  const params = useParams();
  const filter = params.filter;

  const { data: assignments } = useGetAssignments(filter!);

  return (
    <div className="flex flex-col gap-4">
      {assignments?.map((assignment) => (
        <AssignmentCard key={assignment.assignment_id} {...assignment} />
      ))}
    </div>
  );
}

type AssignmentCardProps = Assignment;

function AssignmentCard({
  title,
  class_id,
  class_subject,
  class_section,
  assignment_id,
  banner_color,
}: AssignmentCardProps) {
  const { data: submissionData, isFetching } = useGetAssignmentSubmissionData(
    assignment_id,
    class_id!,
  );

  const { pathname } = useLocation();

  if (pathname.includes("not-reviewed")) {
    if (
      (submissionData?.marked! > 0 &&
        submissionData?.handedIn === 0 &&
        submissionData.assigned === 0) ||
      isFetching
    ) {
      return;
    }
  } else {
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
  }

  return (
    <AssignmentContainer
      class_id={class_id!}
      assignment_id={assignment_id}
      accentColor={banner_color!}
    >
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-xs">
            {class_subject} - {class_section}
          </p>
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
    </AssignmentContainer>
  );
}
