import { useParams } from "react-router-dom";
import AssignmentDetails from "@/components/assignment-details";
import SubmissionDetails from "@/components/submission-details";

export default function AssignmentPage() {
  const params = useParams();
  const assignment_id = parseInt(params.assignment_id!);

  return (
    <div className="w-full max-w-[800px] divide-y-2">
      <AssignmentDetails assignment_id={assignment_id} />
      <SubmissionDetails assignment_id={assignment_id} />
    </div>
  );
}
