import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const { currentUserQuery } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  if (!currentUserQuery.data) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <>
      <header className="bg-bgWhite fixed inset-x-0 top-0 px-8 py-4 shadow">
        <Navbar setIsOpen={setIsOpen} />
      </header>
      <main className="bg-bgWhite flex h-screen pt-[68px]">
        <Sidebar isOpen={isOpen} />
        <Outlet />
      </main>
    </>
  );
}
