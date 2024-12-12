import AuthLayout from "@/app/layouts/auth-layout";
import SignFormCard from "@/features/authentication/signform-card";
import SignInForm from "@/features/authentication/sign-in-form";

export default function SignInPage() {
  return (
    <AuthLayout>
      <main className="h-screen">
        <div className="container flex h-full items-center justify-center">
          <SignFormCard
            title="Sign in to continue"
            footer="Don't have an account yet? Sign up"
            link="/sign-up"
          >
            <SignInForm />
          </SignFormCard>
        </div>
      </main>
    </AuthLayout>
  );
}
