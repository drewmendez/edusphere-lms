import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouteLayout() {
  const { currentUser } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(true);

  if (!currentUser) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 bg-bgWhite px-8 py-4 shadow">
        <Navbar setIsOpen={setIsOpen} />
      </header>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        className={`flex min-h-screen bg-bgWhite pt-[68px] transition-all ${isOpen ? "pl-[310px]" : "pl-[82px]"}`}
      >
        <Outlet />
      </main>
    </>
  );
}
