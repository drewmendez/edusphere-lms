import { useGetAssignment } from "@/services/assignmentsServices";

export default function AssignmentDetails({
  assignment_id,
}: {
  assignment_id: number;
}) {
  const { data: assignment } = useGetAssignment(assignment_id);

  return (
    <>
      <div className="flex flex-col gap-2 pb-5">
        <p className="text-5xl">{assignment?.title}</p>
        <p className="text-sm">
          <span>{assignment?.creator}</span> •{" "}
          <span>{assignment?.created_at}</span>
        </p>
        <p>{assignment?.points} points</p>
      </div>

      <div className="py-5">
        <p className="whitespace-pre-wrap">{assignment?.description}</p>
      </div>
    </>
  );
}
