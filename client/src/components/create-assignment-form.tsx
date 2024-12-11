import { useCurrentUser } from "@/context/CurrentUserContext";
import { useCreateAssignment } from "@/services/assignmentsServices";
import { AssignmentForm, AssignmentFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FormField from "./form-field";
import { Button } from "./ui/button";
import TextareaField from "./textarea-field";

interface CreateAssignmentFormProps {
  class_id: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateAssignmentForm({
  class_id,
  setIsOpen,
}: CreateAssignmentFormProps) {
  const { currentUser } = useCurrentUser();
  const creator_id = currentUser.user_id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignmentForm>({
    resolver: zodResolver(AssignmentFormSchema),
    defaultValues: {
      points: 100,
    },
  });

  const { mutate: createAssignment } = useCreateAssignment();

  const onCreateAssignment = (assignmentData: AssignmentForm) => {
    createAssignment(
      { ...assignmentData, class_id, creator_id: creator_id },
      {
        onSuccess: (response) => {
          setIsOpen(false);
          toast(response.message);
        },
      },
    );
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(onCreateAssignment)}
    >
      <div className="space-y-3">
        <FormField
          label="Title"
          {...register("title")}
          error={errors.title?.message}
        />
        <TextareaField
          className="resize-none"
          rows={6}
          label="Instructions"
          {...register("description")}
          error={errors.description?.message}
        />
        <FormField
          className="w-1/4"
          label="Points"
          type="number"
          min={1}
          {...register("points", { valueAsNumber: true })}
          error={errors.points?.message}
        />
      </div>
      <Button>Assign</Button>
    </form>
  );
}
