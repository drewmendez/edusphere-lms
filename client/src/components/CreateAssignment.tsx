import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import FormField from "./FormField";
import TextareaField from "./TextareaField";
import { useForm } from "react-hook-form";
import { AssignmentForm, AssignmentFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateAssignment,
  useGetAssignmentsInClass,
} from "@/services/assignmentsServices";
import { useState } from "react";
import { toast } from "sonner";
import { useCurrentUser } from "@/context/CurrentUserContext";

interface CreateAssignmentProps {
  class_id: number;
}

export default function CreateAssignment({ class_id }: CreateAssignmentProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser } = useCurrentUser();
  const creator_id = currentUser?.user_id;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignmentForm>({
    resolver: zodResolver(AssignmentFormSchema),
    defaultValues: {
      points: 100,
    },
  });

  const { mutate: createAssignment } = useCreateAssignment();
  const { refetch: refetchAssignments } = useGetAssignmentsInClass(class_id);

  const onCreateAssignment = (assignmentData: AssignmentForm) => {
    createAssignment(
      { ...assignmentData, class_id, creator_id: creator_id! },
      {
        onSuccess: (response) => {
          setIsOpen(false);
          toast(response.message);
          refetchAssignments();
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          Create <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" onCloseAutoFocus={() => reset()}>
        <DialogHeader>
          <DialogTitle>Create an assignment</DialogTitle>
          <DialogDescription>
            Create an assignment for your students to work with.
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
}
