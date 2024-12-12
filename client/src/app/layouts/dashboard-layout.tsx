import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import Sidebar from "./sidebar";
import { cn } from "@/lib/utils";
import Navbar from "./navbar";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 flex gap-6 border-b-2 bg-background px-8 py-4">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu />
        </button>
        <div className="flex-1">
          <Navbar />
        </div>
      </header>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-10 mt-[68px] overflow-hidden overflow-y-auto border-r-2 pt-5 transition-all",
          isOpen ? "w-[310px]" : "w-[82px]",
        )}
      >
        <Sidebar isOpen={isOpen} />
      </aside>
      <main
        className={cn(
          "flex min-h-screen pt-[68px] transition-all",
          isOpen ? "pl-[310px]" : "pl-[82px]",
        )}
      >
        <Outlet />
      </main>
    </>
  );
}
