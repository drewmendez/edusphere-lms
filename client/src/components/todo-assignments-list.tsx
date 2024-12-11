import { useGetAssignments } from "@/services/assignmentsServices";
import { useParams } from "react-router-dom";
import AssignmentContainer from "./assignment-container";
import { Assignment } from "@/types/types";

export default function TodoAssignmentsList({ status }: { status: string }) {
  const params = useParams();
  const filter = params.filter;

  const { data: assignments } = useGetAssignments(filter!, status);

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
  created_at,
  class_id,
  class_subject,
  class_section,
  assignment_id,
  submitted_at,
  points,
  given_points,
}: AssignmentCardProps) {
  return (
    <AssignmentContainer class_id={class_id!} assignment_id={assignment_id}>
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-xs">
            {class_subject} - {class_section}
          </p>
        </div>
        {submitted_at ? (
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
        ) : (
          <p className="text-xs">Posted on {created_at}</p>
        )}
      </div>
    </AssignmentContainer>
  );
}
