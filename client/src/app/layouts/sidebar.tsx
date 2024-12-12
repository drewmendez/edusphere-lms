import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { User } from "lucide-react";

import SignOutDialog from "@/features/authentication/signout-dialog";
import { cn } from "@/lib/utils";
import { SIDEBAR_ITEMS } from "@/constants/sidebar-items";
import { useCurrentUser } from "@/context/CurrentUserContext";
import ClassesDropdown from "@/features/classes/components/classes-dropdown";

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
      <div className="w-min rounded-full bg-muted p-2">
        <User />
      </div>
      <div className="flex-shrink-0">
        <p className="text-sm capitalize">{role}</p>
        <p className="font-semibold">{user}</p>
      </div>
    </div>
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
        "mr-3 flex items-center gap-7 overflow-hidden rounded-br-full rounded-tr-full py-3 pl-8 transition hover:bg-muted",
        pathname.includes(link) && "bg-muted text-primary",
      )}
      to={link}
    >
      <div>{icon}</div>
      <p className="flex-shrink-0">{text}</p>
    </Link>
  );
}
