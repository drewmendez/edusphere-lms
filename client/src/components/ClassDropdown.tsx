import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteClass } from "@/services/classesServices";
import { Edit, EllipsisVertical, Trash } from "lucide-react";
import { toast } from "sonner";

interface ClassDropdownProps {
  class_id: number;
}

export default function ClassDropdown({ class_id }: ClassDropdownProps) {
  const { mutate: deleteClass } = useDeleteClass();

  const onDeleteClass = () => {
    deleteClass(class_id, {
      onSuccess: (response) => toast(response.message),
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex cursor-pointer justify-between">
          Edit <Edit />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex cursor-pointer justify-between"
          onClick={onDeleteClass}
        >
          Delete <Trash />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
