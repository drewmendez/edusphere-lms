import {
  ChevronRight,
  Folder,
  GraduationCap,
  Home,
  ListTodo,
  UserRoundPen,
} from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";

import SignOutDialog from "./SignOutDialog";
import { useEffect, useState } from "react";
import { useGetClasses } from "@/services/classesServices";
import { useCurrentUser } from "@/context/CurrentUserContext";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { currentUser } = useCurrentUser();
  const role = currentUser?.role;
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const { data: classes } = useGetClasses();

  const sidebarNavs = {
    teacher: [
      {
        icon: <Home />,
        link: "/dashboard",
        text: "Home",
      },
      {
        icon: <Folder />,
        link: "/to-review/not-reviewed/all",
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
        link: `/to-do/assigned/all`,
        text: "To Do",
      },
    ],
  };

  const { pathname } = useLocation();
  const params = useParams();

  useEffect(() => {
    if (!isOpen) {
      setIsDropdownOpen(false);
    }
  }, [isOpen]);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-10 mt-[68px] overflow-hidden overflow-y-auto py-5 shadow transition-all ${isOpen ? "w-[310px]" : "w-[82px]"}`}
    >
      <nav className="flex h-full flex-col justify-between">
        <div>
          <div className="flex flex-col">
            {sidebarNavs[role!].map((item, index) => (
              <Link
                className={`mr-3 flex items-center gap-7 overflow-hidden rounded-br-full rounded-tr-full py-3 pl-8 transition hover:bg-slate-200 ${pathname === item.link && "bg-blue-100"}`}
                to={item.link}
                key={index}
              >
                <div>{item.icon}</div>
                <p className="flex-shrink-0">{item.text}</p>
              </Link>
            ))}
          </div>
          <div className="mt-2 flex flex-col border-t-2 pt-2">
            <button
              className="mr-3 flex items-center overflow-hidden rounded-br-full rounded-tr-full py-3 pl-2 transition hover:bg-slate-200"
              onClick={() => {
                if (!isOpen) {
                  setIsOpen(true);
                }
                setIsDropdownOpen(!isDropdownOpen);
              }}
            >
              <div className={`mr-2 ${isDropdownOpen && "rotate-90"}`}>
                <ChevronRight size={18} />
              </div>
              <div className="mr-7">
                {role === "teacher" ? <UserRoundPen /> : <GraduationCap />}
              </div>
              <span className="flex-shrink-0">
                {role === "teacher" ? "Teaching" : "Enrolled"}
              </span>
            </button>
            {isDropdownOpen &&
              classes?.map((item) => (
                <Link
                  key={item.class_id}
                  className={`mr-3 flex items-center gap-7 overflow-hidden rounded-br-full rounded-tr-full py-2 pl-7 text-sm transition hover:bg-slate-200 ${Number(params.class_id!) === item.class_id && pathname.includes("dashboard") && "bg-blue-100"}`}
                  to={`dashboard/stream/${item.class_id}`}
                >
                  <div
                    className="flex size-8 items-center justify-center rounded-full font-semibold text-white"
                    style={{ background: item.banner_color }}
                  >
                    {item.class_subject.charAt(0)}
                  </div>
                  <div className="flex flex-col font-semibold">
                    <span className="line-clamp-1">{item.class_subject}</span>
                    <span className="text-xs font-normal">
                      {item.class_section}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className="mt-2 flex flex-col border-t-2 pt-2">
          <SignOutDialog />
        </div>
      </nav>
    </aside>
  );
}
