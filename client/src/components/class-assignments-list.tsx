import { useGetAssignmentsInClass } from "@/services/assignmentsServices";

import AssignmentContainer from "./assignment-container";
import { useCurrentUser } from "@/context/CurrentUserContext";
import Dropdown from "./dropdown";
import { EllipsisVertical } from "lucide-react";
import DeleteAssignment from "./delete-assignment";

export default function ClassAssignmentsList({
  class_id,
}: {
  class_id: number;
}) {
  const { currentUser } = useCurrentUser();
  const { data: assignments } = useGetAssignmentsInClass(class_id);

  return (
    <div className="flex flex-col gap-4">
      {assignments?.map((assignment) => (
        <AssignmentContainer
          key={assignment.assignment_id}
          class_id={class_id}
          assignment_id={assignment.assignment_id}
        >
          <div className="flex w-full items-center justify-between">
            <p className="font-semibold">{assignment.title}</p>
            <div className="flex items-center gap-4">
              <p className="text-xs">Posted on {assignment.created_at}</p>
              {currentUser.role === "teacher" && (
                <Dropdown
                  trigger={<EllipsisVertical className="cursor-pointer" />}
                  dropdownItems={[
                    <DeleteAssignment
                      assignment_id={assignment.assignment_id}
                    />,
                  ]}
                />
              )}
            </div>
          </div>
        </AssignmentContainer>
      ))}
    </div>
  );
}
