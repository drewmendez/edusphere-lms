import { useCurrentUser } from "@/context/CurrentUserContext";
import ContentNavbar from "../../components/content-navbar";
import { TO_REVIEW_NAVBAR_NAVLINKS } from "@/constants/content-navbar-links";
import { Outlet } from "react-router-dom";

export default function ToReviewLayout() {
  const { currentUser } = useCurrentUser();

  if (currentUser.role !== "teacher") {
    window.history.back();
  }

  return (
    <div className="relative w-full">
      <nav className="sticky inset-x-0 top-[68px] flex border-b-2 bg-bgWhite px-7">
        <ContentNavbar navlinks={TO_REVIEW_NAVBAR_NAVLINKS} />
      </nav>
      <div className="flex w-full items-center justify-center p-6">
        <Outlet />
      </div>
    </div>
  );
}
