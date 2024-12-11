import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "./ui/button";
import FormField from "./FormField";
import { ClassForm, ClassFormSchema } from "@/types/types";

import { useCurrentUser } from "@/context/CurrentUserContext";
import { useCreateClass } from "@/services/classesServices";

interface CreateClassFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateClassForm({ setIsOpen }: CreateClassFormProps) {
  const { currentUser } = useCurrentUser();
  const teacher_id = currentUser.user_id;

  const {
    register,
    handleSubmit,
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
  );
}
