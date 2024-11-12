import { useAuth } from "@/context/AuthContext";
import { Folder, Home, ListTodo, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const { currentUserQuery, signOutMutation } = useAuth();
  const navigate = useNavigate();

  const onSignOut = () => {
    signOutMutation.mutate(undefined, {
      onSuccess: (data) => {
        toast(data.message);
        currentUserQuery.refetch();
        navigate("/", { replace: true });
      },
    });
  };

  return (
    <aside
      className={`sticky inset-y-0 left-0 overflow-hidden py-5 pr-3 shadow transition-all duration-75 ${isOpen ? "w-[300px]" : "w-[90px]"}`}
    >
      <nav className="flex h-full flex-col justify-between">
        <div className="flex flex-col">
          <Link
            className="flex items-center gap-7 rounded-br-full rounded-tr-full py-3 pl-8 transition hover:bg-slate-200"
            to="/dashboard"
          >
            <Home /> {isOpen && <p>Home</p>}
          </Link>
          {currentUserQuery.data.role === "teacher" ? (
            <Link
              className="flex items-center gap-7 rounded-br-full rounded-tr-full py-3 pl-8 transition hover:bg-slate-200"
              to="/dashboard/to-review"
            >
              <Folder /> {isOpen && <p>To Review</p>}
            </Link>
          ) : (
            <Link
              className="flex items-center gap-7 rounded-br-full rounded-tr-full py-3 pl-8 transition hover:bg-slate-200"
              to="/dashboard/to-do"
            >
              <ListTodo /> {isOpen && <p>To Do</p>}
            </Link>
          )}
        </div>
        <div className="ml-8">
          {isOpen ? (
            <>
              <p>{currentUserQuery.data.role}</p>
              <p>{currentUserQuery.data.user}</p>
              <Button className="w-full" variant="outline" onClick={onSignOut}>
                <LogOut />
                Sign out
              </Button>
            </>
          ) : (
            <button className="" onClick={onSignOut}>
              <LogOut />
            </button>
          )}
        </div>
      </nav>
    </aside>
  );
}
