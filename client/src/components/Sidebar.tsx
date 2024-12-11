import { ReactElement, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronRight, GraduationCap, User, UserRoundPen } from "lucide-react";

import SignOutDialog from "./signout-dialog";
import { cn } from "@/lib/utils";
import { SIDEBAR_ITEMS } from "@/constants/sidebar-items";
import { useCurrentUser } from "@/context/CurrentUserContext";
import { useGetClasses } from "@/services/classesServices";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const { currentUser } = useCurrentUser();

  const { pathname } = useLocation();

  return (
    <nav className="flex h-full flex-col justify-between">
      <div>
        <div className="flex flex-col">
          {SIDEBAR_ITEMS[currentUser.role].map((item, index) => (
            <SidebarLink key={index} {...item} pathname={pathname} />
          ))}
        </div>
        <div className="mt-2 flex flex-col border-t-2 pt-2">
          <ClassesDropdown
            role={currentUser.role}
            pathname={pathname}
            isOpen={isOpen}
          />
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-2 border-t-2 py-4">
        <UserDetails role={currentUser.role} user={currentUser.user} />
        <SignOutDialog />
      </div>
    </nav>
  );
}

function UserDetails({ role, user }: { role: string; user: string }) {
  return (
    <div className="flex items-center gap-5 pl-6">
      <div className="w-min rounded-full bg-gray-300 p-2">
        <User />
      </div>
      <div className="flex-shrink-0">
        <p className="text-sm capitalize">{role}</p>
        <p className="font-semibold">{user}</p>
      </div>
    </div>
  );
}

interface ClassesDropdownProps {
  role: string;
  pathname: string;
  isOpen: boolean;
}

function ClassesDropdown({ role, pathname, isOpen }: ClassesDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const params = useParams();
  const paramId = Number(params.class_id);

  const { data: classes } = useGetClasses();

  useEffect(() => {
    if (!isOpen) {
      setIsDropdownOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      <button
        className={cn(
          "mr-3 flex items-center overflow-hidden rounded-br-full rounded-tr-full py-3 pl-2 transition hover:bg-slate-200",
          !isOpen && "pointer-events-none",
        )}
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        <div className={cn("mr-2", isDropdownOpen && "rotate-90")}>
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
          <ClassLink
            key={item.class_id}
            {...item}
            paramId={paramId}
            pathname={pathname}
          />
        ))}
    </>
  );
}

interface ClassLinkProps {
  class_id: number;
  banner_color: string;
  class_subject: string;
  class_section: string;
  paramId: number;
  pathname: string;
}

function ClassLink({
  class_id,
  banner_color,
  class_subject,
  class_section,
  paramId,
  pathname,
}: ClassLinkProps) {
  return (
    <Link
      className={cn(
        "mr-3 flex items-center gap-7 overflow-hidden rounded-br-full rounded-tr-full py-2 pl-7 text-sm transition hover:bg-slate-200",
        paramId === class_id && pathname.includes("class") && "bg-blue-100",
      )}
      to={`/class/stream/${class_id}`}
    >
      <div
        className="flex size-8 items-center justify-center rounded-full font-semibold text-white"
        style={{ background: banner_color }}
      >
        {class_subject.charAt(0)}
      </div>
      <div className="flex flex-col font-semibold">
        <span className="line-clamp-1">{class_subject}</span>
        <span className="text-xs font-normal">{class_section}</span>
      </div>
    </Link>
  );
}

interface SidebarLinkProps {
  text: string;
  link: string;
  icon: ReactElement;
  pathname: string;
}

function SidebarLink({ text, link, icon, pathname }: SidebarLinkProps) {
  return (
    <Link
      className={cn(
        "mr-3 flex items-center gap-7 overflow-hidden rounded-br-full rounded-tr-full py-3 pl-8 transition hover:bg-slate-200",
        pathname.includes(link) && "bg-blue-100",
      )}
      to={link}
    >
      <div>{icon}</div>
      <p className="flex-shrink-0">{text}</p>
    </Link>
  );
}
