import ClassAssignmentsList from "@/components/class-assignments-list";
import CreateAssignment from "@/components/create-assignment";
import { useCurrentUser } from "@/context/CurrentUserContext";

import { useParams } from "react-router-dom";

export default function ClassAssignmentsPage() {
  const { currentUser } = useCurrentUser();

  const params = useParams();
  const class_id = parseInt(params.class_id!);

  return (
    <div className="w-full max-w-[800px]">
      {currentUser.role === "teacher" && (
        <div className="mb-4">
          <CreateAssignment class_id={class_id} />
        </div>
      )}
      <ClassAssignmentsList class_id={class_id} />
    </div>
  );
}
