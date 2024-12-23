import Navbar from "@/app/layouts/navbar";
import LandingImage from "@/assets/home-image.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AuthLayout from "@/app/layouts/auth-layout";

export default function LandingPage() {
  return (
    <AuthLayout>
      <header className="fixed inset-x-0 top-0 border-b-2 py-4">
        <div className="container">
          <Navbar />
        </div>
      </header>
      <main className="h-screen bg-background pt-[68px]">
        <div className="container flex h-full items-center justify-center">
          <section className="flex flex-col items-center gap-10 md:flex-row">
            <div className="flex-1">
              <img src={LandingImage} alt="home-image" />
            </div>
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl font-bold md:text-5xl md:leading-tight">
                Empowering Learning, One Class at a Time
              </h1>
              <p>
                EduSphere empowers teachers and students with tools to manage
                classes, assignments, and progress — simplifying education for
                everyone.
              </p>
              <Cta />
            </div>
          </section>
        </div>
      </main>
    </AuthLayout>
  );
}

function Cta() {
  return (
    <Button size="lg">
      <Link className="flex items-center gap-2" to="/sign-in">
        Get Started <ArrowRight />
      </Link>
    </Button>
  );
}
