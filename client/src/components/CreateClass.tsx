import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClassForm, ClassFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import { useCreateClass } from "@/services/classesServices";
import { useState } from "react";
import { toast } from "sonner";
import { useCurrentUser } from "@/context/CurrentUserContext";

export default function CreateClass() {
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser } = useCurrentUser();
  const teacher_id = currentUser.user_id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClassForm>({
    resolver: zodResolver(ClassFormSchema),
  });

  const { mutate: createClass } = useCreateClass();

  const onCreateClass = (classForm: ClassForm) => {
    const classData = { ...classForm, teacher_id: teacher_id };

    createClass(classData, {
      onSuccess: (response) => {
        setIsOpen(false);
        toast(response.message);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          Create class <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" onCloseAutoFocus={() => reset()}>
        <DialogHeader>
          <DialogTitle>Create a class</DialogTitle>
          <DialogDescription>
            Create a class where students can join, view assignments and submit
            their work.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onCreateClass)}
        >
          <div className="space-y-3">
            <FormField
              label="Subject"
              {...register("class_subject")}
              placeholder="eg. Mathematics"
              error={errors.class_subject?.message}
            />
            <FormField
              label="Section"
              {...register("class_section")}
              placeholder="eg. 12-Appreciation"
              error={errors.class_section?.message}
            />
          </div>
          <Button>Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
