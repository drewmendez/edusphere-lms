import { Edit } from "lucide-react";

interface EditClassProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditClass({ setIsOpen }: EditClassProps) {
  return (
    <button
      className="flex w-full items-center justify-between"
      onClick={() => setIsOpen(true)}
    >
      Edit <Edit size={18} />
    </button>
  );
}
