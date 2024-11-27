import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import CreateClass from "./CreateClass";
import JoinClass from "./JoinClass";
import { useCurrentUser } from "@/context/CurrentUserContext";

interface NavbarProps {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ setIsOpen }: NavbarProps) {
  const { currentUser } = useCurrentUser();

  const { pathname } = useLocation();

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center font-semibold">
        {currentUser && (
          <button className="mr-6" onClick={() => setIsOpen!((prev) => !prev)}>
            <Menu />
          </button>
        )}
        <img className="mr-4 size-9" src={Logo} alt="classroom logo" />
        EduSphere
      </div>
      <div className="flex items-center gap-4">
        {currentUser ? (
          pathname === "/dashboard" && (
            <>
              {currentUser.role === "teacher" ? <CreateClass /> : <JoinClass />}
            </>
          )
        ) : (
          <>
            <Button variant="outline" asChild>
              <Link to="/sign-up">Sign Up</Link>
            </Button>
            <Button asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
