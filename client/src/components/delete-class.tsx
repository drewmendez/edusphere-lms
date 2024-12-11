import { Trash } from "lucide-react";
import { toast } from "sonner";

import { useDeleteClass } from "@/services/classesServices";

export default function DeleteClass({ class_id }: { class_id: number }) {
  const { mutate: deleteClass } = useDeleteClass();

  const onDeleteClass = () => {
    deleteClass(class_id, {
      onSuccess: (response) => {
        toast(response.message);
      },
    });
  };

  return (
    <button
      className="flex w-full items-center justify-between text-red-600"
      onClick={onDeleteClass}
    >
      Delete <Trash size={18} />
    </button>
  );
}
