import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "./ui/button";
import FormField from "./form-field";

import { EnrollmentForm, EnrollmentFormSchema } from "@/types/types";
import { useJoinClass } from "@/services/enrollmentsServices";

interface JoinClassFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JoinClassForm({ setIsOpen }: JoinClassFormProps) {
  const { mutate: joinClass } = useJoinClass();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EnrollmentForm>({
    resolver: zodResolver(EnrollmentFormSchema),
  });

  const onJoinClass = (enrollmentForm: EnrollmentForm) => {
    joinClass(enrollmentForm, {
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
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onJoinClass)}>
      <FormField
        label="Class code"
        placeholder="Enter 6-character code here"
        maxLength={6}
        {...register("class_code")}
        error={errors.class_code?.message}
      />
      <Button>Join</Button>
    </form>
  );
}
