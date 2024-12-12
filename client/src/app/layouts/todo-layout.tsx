import { useCurrentUser } from "@/context/CurrentUserContext";
import ContentNavbar from "../../components/content-navbar";
import { TODO_NAVBAR_LINKS } from "@/constants/content-navbar-links";
import { Outlet } from "react-router-dom";

export default function TodoLayout() {
  const { currentUser } = useCurrentUser();

  if (currentUser.role !== "student") {
    window.history.back();
  }

  return (
    <div className="relative w-full">
      <nav className="sticky inset-x-0 top-[68px] flex border-b-2 bg-bgWhite px-7">
        <ContentNavbar navlinks={TODO_NAVBAR_LINKS} />
      </nav>
      <div className="flex w-full items-center justify-center p-6">
        <Outlet />
      </div>
    </div>
  );
}
