import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import FormField from "./FormField";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

import { type SignUpForm, SignUpFormSchema } from "@/types/types";
import { useSignUp } from "@/services/authServices";

export default function SignUpForm() {
  const { mutate: signUp } = useSignUp();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSignUp = (data: SignUpForm) => {
    signUp(data, {
      onSuccess: (data) => {
        toast(data.message);
        navigate("/sign-in", { replace: true });
      },
      onError: (error) => {
        if (error.response?.data.error === "email") {
          setError("email", {
            type: "server",
            message: error.response.data.message,
          });
        } else {
          setError("root", {
            type: "server",
            message: error.response?.data.message,
          });
        }
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSignUp)}>
      <FormField
        label="Firstname"
        placeholder="eg. Juan Antonio"
        {...register("firstname")}
        error={errors.firstname?.message}
      />
      <FormField
        label="Lastname"
        placeholder="eg. Dela Cruz"
        {...register("lastname")}
        error={errors.lastname?.message}
      />
      <div>
        <Label>Role</Label>
        <div className="flex w-full gap-4">
          <label className="flex flex-1 cursor-pointer gap-3 rounded-md border p-3 text-sm">
            <input
              className="accent-primary"
              type="radio"
              value="student"
              {...register("role")}
            />
            Student
          </label>
          <label className="flex flex-1 cursor-pointer gap-3 rounded-md border p-3 text-sm">
            <input
              className="accent-primary"
              type="radio"
              value="teacher"
              {...register("role")}
            />
            Teacher
          </label>
        </div>
        {errors.role && (
          <p className="mt-1 pl-1 text-xs italic text-red-600">
            {errors.role.message}
          </p>
        )}
      </div>
      <FormField
        label="Email"
        placeholder="eg. juandelacruz@email.com"
        {...register("email")}
        error={errors.email?.message}
      />
      <FormField
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />
      {errors.root && (
        <p className="mt-1 pl-1 text-xs italic text-red-600">
          {errors.root.message}
        </p>
      )}
      <Button className="w-full">Sign up</Button>
    </form>
  );
}
