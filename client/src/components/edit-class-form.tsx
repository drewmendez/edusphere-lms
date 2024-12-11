import { useEditClass } from "@/services/classesServices";
import { ClassForm, ClassFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FormField from "./FormField";
import { Button } from "./ui/button";

interface EditClassFormProps {
  class_id: number;
  class_subject: string;
  class_section: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditClassForm({
  class_id,
  class_subject,
  class_section,
  setIsOpen,
}: EditClassFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassForm>({
    resolver: zodResolver(ClassFormSchema),
    defaultValues: {
      class_subject,
      class_section,
    },
  });

  const { mutate: updateClass } = useEditClass(class_id);

  const onUpdateClass = (classForm: ClassForm) => {
    const classData = { ...classForm, class_id };

    updateClass(classData, {
      onSuccess: (response) => {
        setIsOpen(false);
        toast(response.message);
      },
    });
  };

  return (
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
  );
}
