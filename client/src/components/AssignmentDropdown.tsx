import { EllipsisVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  useDeleteAssignment,
  useGetAssignmentsInClass,
} from "@/services/assignmentsServices";
import { toast } from "sonner";

interface AssignmentDropdownProps {
  assignment_id: number;
  class_id: number;
}

export default function AssignmentDropdown({
  assignment_id,
  class_id,
}: AssignmentDropdownProps) {
  const { mutate: deleteAssignment } = useDeleteAssignment();
  const { refetch: refetchAssignments } = useGetAssignmentsInClass(class_id);

  const handleDeleteAssignment = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    deleteAssignment(assignment_id, {
      onSuccess: (response) => {
        toast(response.message);
        refetchAssignments();
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="-mr-2 rounded-full p-2 transition hover:bg-gray-200">
        <EllipsisVertical className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex cursor-pointer justify-between"
          onClick={handleDeleteAssignment}
        >
          Delete
          <Trash />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
