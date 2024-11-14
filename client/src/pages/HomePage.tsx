import Navbar from "@/components/Navbar";
import HomeImage from "../assets/home-image.jpg";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { currentUserQuery } = useAuth();

  if (currentUserQuery.data) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 bg-bgWhite py-4 shadow">
        <div className="container">
          <Navbar />
        </div>
      </header>
      <main className="h-screen bg-[#EEEFF2] pt-[68px]">
        <div className="container flex h-full items-center justify-center">
          <section className="flex flex-col items-center gap-10 md:flex-row">
            <div className="flex-1">
              <img src={HomeImage} alt="home-image" />
            </div>
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl font-bold text-slate-700 md:text-5xl">
                EduConnect: Empowering Learning, Anywhere
              </h1>
              <p className="text-slate-700">
                Join your classroom from anywhere. EduConnect simplifies
                learning with a single platform for assignments, resources, and
                class collaboration—designed to keep you connected and on track.
              </p>

              <Button size="lg">
                <Link className="flex items-center gap-2" to="/sign-in">
                  Get Started <ArrowRight />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
