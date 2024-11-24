import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useDeleteClass,
  useEditClass,
  useGetClasses,
} from "@/services/classesServices";
import { Edit, EllipsisVertical, LogOut, Trash } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import FormField from "./FormField";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { ClassForm, ClassFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUnenrollToClass } from "@/services/enrollmentsServices";

interface ClassDropdownProps {
  class_id: number;
  class_subject: string;
  class_section: string;
}

export default function ClassDropdown({
  class_id,
  class_subject,
  class_section,
}: ClassDropdownProps) {
  const { currentUserQuery } = useAuth();
  const role = currentUserQuery.data?.role;
  const student_id = currentUserQuery.data?.user_id;

  const [isOpen, setIsOpen] = useState(false);
  const { refetch: refetchClasses } = useGetClasses();
  const { mutate: deleteClass } = useDeleteClass();
  const { mutate: updateClass } = useEditClass(class_id);
  const { mutate: unenrollToClass } = useUnenrollToClass(student_id!);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassForm>({
    resolver: zodResolver(ClassFormSchema),
    defaultValues: {
      class_subject,
      class_section,
    },
  });

  const onDeleteClass = () => {
    deleteClass(class_id, {
      onSuccess: (response) => {
        toast(response.message);
        refetchClasses();
      },
    });
  };

  const onUpdateClass = (classForm: ClassForm) => {
    const classData = { ...classForm, class_id };

    updateClass(classData, {
      onSuccess: (response) => {
        setIsOpen(false);
        toast(response.message);
        refetchClasses();
      },
    });
  };

  const onUnenrollToClass = () => {
    unenrollToClass(class_id, {
      onSuccess: (response) => {
        toast(response.message);
        refetchClasses();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {role === "teacher" ? (
            <>
              <DialogTrigger asChild>
                <DropdownMenuItem className="flex cursor-pointer justify-between">
                  Edit <Edit />
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem
                className="flex cursor-pointer justify-between"
                onClick={onDeleteClass}
              >
                Delete <Trash />
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem
              className="flex cursor-pointer justify-between"
              onClick={onUnenrollToClass}
            >
              Unenroll <LogOut />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent className="sm:max-w-md" onCloseAutoFocus={() => reset()}>
        <DialogHeader>
          <DialogTitle>Edit class</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onUpdateClass)}
        >
          <div className="space-y-3">
            <FormField
              label="Subject"
              {...register("class_subject")}
              error={errors.class_subject?.message}
            />
            <FormField
              label="Section"
              {...register("class_section")}
              error={errors.class_section?.message}
            />
          </div>
          <div className="ml-auto space-x-3">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
