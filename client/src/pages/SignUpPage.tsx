import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Logo from "../assets/logo.png";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignUpForm, SignUpFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function SignUpPage() {
  const { signUpMutation, currentUserQuery } = useAuth();
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
    signUpMutation.mutate(data, {
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

  if (currentUserQuery.data) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="h-screen bg-bgWhite">
      <div className="container flex h-full items-center justify-center">
        <Card className="w-full max-w-[400px]">
          <CardHeader>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <img className="size-9" src={Logo} alt="" />
                <p className="font-semibold">EduSphere</p>
              </div>
              <p className="text-sm">Sign up to continue</p>
            </div>
          </CardHeader>
          <CardContent>
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
                <Label>Role *</Label>
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
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              className="text-xs text-slate-700 hover:underline"
              to="/sign-in"
            >
              Already have an account? Sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
