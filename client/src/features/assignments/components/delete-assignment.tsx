import { useDeleteAssignment } from "../mutations/use-delete-assignment";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function DeleteAssignment({
  assignment_id,
}: {
  assignment_id: number;
}) {
  const { mutate: deleteAssignment } = useDeleteAssignment();

  const handleDeleteAssignment = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    deleteAssignment(assignment_id, {
      onSuccess: (response) => {
        toast(response.message);
      },
    });
  };

  return (
    <button
      className="flex w-full items-center justify-between text-red-600"
      onClick={handleDeleteAssignment}
    >
      Delete <Trash size={18} />
    </button>
  );
}
