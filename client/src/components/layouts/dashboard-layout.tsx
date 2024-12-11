import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import Sidebar from "../Sidebar";
import { cn } from "@/lib/utils";
import Navbar from "../navbar";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-10 flex gap-6 bg-bgWhite px-8 py-4 shadow">
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu />
        </button>
        <div className="flex-1">
          <Navbar />
        </div>
      </header>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-10 mt-[68px] overflow-hidden overflow-y-auto pt-5 shadow transition-all",
          isOpen ? "w-[310px]" : "w-[82px]",
        )}
      >
        <Sidebar isOpen={isOpen} />
      </aside>
      <main
        className={cn(
          "flex min-h-screen bg-bgWhite pt-[68px] transition-all",
          isOpen ? "pl-[310px]" : "pl-[82px]",
        )}
      >
        <Outlet />
      </main>
    </>
  );
}
