import { useAuth } from "@/context/AuthContext";
import { Folder, Home, ListTodo, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";

const sidebarNavs = {
  teacher: [
    {
      icon: <Home />,
      link: "/dashboard",
      text: "Home",
    },
    {
      icon: <Folder />,
      link: "/dashboard/to-review",
      text: "To Review",
    },
  ],
  student: [
    {
      icon: <Home />,
      link: "/dashboard",
      text: "Home",
    },
    {
      icon: <ListTodo />,
      link: "/dashboard/to-do",
      text: "To Do",
    },
  ],
};

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const { currentUserQuery, signOutMutation } = useAuth();
  const navigate = useNavigate();

  const onSignOut = () => {
    signOutMutation.mutate(undefined, {
      onSuccess: async (response) => {
        await currentUserQuery.refetch();
        navigate("/", { replace: true });
        toast(response.message);
      },
    });
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 mt-[68px] overflow-hidden py-5 pr-3 shadow transition-all ${isOpen ? "w-[350px]" : "w-[82px]"}`}
    >
      <nav className="flex h-full flex-col justify-between">
        <div className="flex flex-col">
          {sidebarNavs[currentUserQuery.data?.role!].map((item, index) => (
            <Link
              className="flex items-center gap-7 overflow-hidden rounded-br-full rounded-tr-full py-3 pl-8 transition hover:bg-slate-200"
              to={item.link}
              key={index}
            >
              <div>{item.icon}</div>
              <p className="flex-shrink-0">{item.text}</p>
            </Link>
          ))}
        </div>
        <div className="ml-8">
          {isOpen ? (
            <>
              <p>{currentUserQuery.data?.role}</p>
              <p>{currentUserQuery.data?.user}</p>
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
