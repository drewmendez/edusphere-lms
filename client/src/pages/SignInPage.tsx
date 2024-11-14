import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Logo from "../assets/logo.png";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignInForm, SignInFormSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function SignInPage() {
  const { signInMutation, currentUserQuery } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(SignInFormSchema),
  });

  const onSignIn = (data: SignInForm) => {
    signInMutation.mutate(data, {
      onSuccess: async (response) => {
        await currentUserQuery.refetch();
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
                <p className="font-semibold">EduConnect</p>
              </div>
              <p className="text-sm">Sign in to continue</p>
            </div>
          </CardHeader>
          <CardContent>
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
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link
              className="text-xs text-slate-700 hover:underline"
              to="/sign-up"
            >
              Don't have an account yet? Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
