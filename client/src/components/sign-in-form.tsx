import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import FormField from "./FormField";
import { Button } from "./ui/button";

import { type SignInForm, SignInFormSchema } from "@/types/types";
import { useSignIn } from "@/services/authServices";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(SignInFormSchema),
  });

  const { mutate: signIn } = useSignIn();
  const navigate = useNavigate();

  const onSignIn = (data: SignInForm) => {
    signIn(data, {
      onSuccess: (response) => {
        navigate("/dashboard", { replace: true });
        toast(response.message);
      },
      onError: (error) => {
        if (error.response?.data.error === "email") {
          setError("email", {
            type: "server",
            message: error.response.data.message,
          });
        } else if (error.response?.data.error === "password") {
          setError("password", {
            type: "server",
            message: error.response?.data.message,
          });
        } else {
          setError("root", {
            type: "server",
            message: error.message,
          });
        }
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSignIn)}>
      <FormField
        label="Email"
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
      <Button className="w-full">Sign in</Button>
    </form>
  );
}
