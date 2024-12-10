import { Plus } from "lucide-react";
import FormField from "./FormField";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import { EnrollmentForm, EnrollmentFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useJoinClass } from "@/services/enrollmentsServices";
import { useState } from "react";
import { toast } from "sonner";
import { useCurrentUser } from "@/context/CurrentUserContext";

export default function JoinClass() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: joinClass } = useJoinClass();
  const { currentUser } = useCurrentUser();
  const student_id = currentUser.user_id;

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<EnrollmentForm>({
    resolver: zodResolver(EnrollmentFormSchema),
  });

  const onJoinClass = (enrollmentForm: EnrollmentForm) => {
    const enrollmentData = { ...enrollmentForm, student_id: student_id };

    joinClass(enrollmentData, {
      onSuccess: (response) => {
        setIsOpen(false);
        toast(response.message);
      },
      onError: (error) => {
        setError("class_code", {
          type: "server",
          message: error.response?.data.message,
        });
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          Join class <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" onCloseAutoFocus={() => reset()}>
        <DialogHeader>
          <DialogTitle>Join class</DialogTitle>
          <DialogDescription>
            Ask your teacher for the class code, then enter it here.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onJoinClass)}
        >
          <FormField
            label="Class code"
            placeholder="Enter 6-character code here"
            maxLength={6}
            {...register("class_code")}
            error={errors.class_code?.message}
          />
          <Button>Join</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
