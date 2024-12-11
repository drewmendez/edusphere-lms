import AuthLayout from "@/components/layouts/auth-layout";
import SignFormCard from "@/components/signform-card";
import SignUpForm from "@/components/sign-up-form";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <main className="h-screen bg-bgWhite">
        <div className="container flex h-full items-center justify-center">
          <SignFormCard
            title="Sign up to continue"
            footer="Already have an account? Sign in"
            link="/sign-in"
          >
            <SignUpForm />
          </SignFormCard>
        </div>
      </main>
    </AuthLayout>
  );
}
