import { useUnenrollToClass } from "@/services/enrollmentsServices";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export default function UnenrollClass({ class_id }: { class_id: number }) {
  const { mutate: unenrollToClass } = useUnenrollToClass();

  const onUnenrollToClass = () => {
    unenrollToClass(class_id, {
      onSuccess: (response) => {
        toast(response.message);
      },
    });
  };

  return (
    <button
      className="flex w-full items-center justify-between text-red-600"
      onClick={onUnenrollToClass}
    >
      Unenroll <LogOut size={18} />
    </button>
  );
}
