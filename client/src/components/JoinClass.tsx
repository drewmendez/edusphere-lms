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
import { ClassCodeForm, ClassCodeFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useJoinClass } from "@/services/enrollmentsServices";
import { useState } from "react";
import { toast } from "sonner";

export default function JoinClass() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: joinClass } = useJoinClass();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<ClassCodeForm>({
    resolver: zodResolver(ClassCodeFormSchema),
  });

  const onJoinClass = (classCodeData: ClassCodeForm) => {
    joinClass(classCodeData, {
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
