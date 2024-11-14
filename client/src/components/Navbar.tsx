import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { Menu, Plus } from "lucide-react";
import CreateClass from "./CreateClass";

interface NavbarProps {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ setIsOpen }: NavbarProps) {
  const { currentUserQuery } = useAuth();

  const { pathname } = useLocation();

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center font-semibold">
        {currentUserQuery.data && (
          <button className="mr-6" onClick={() => setIsOpen!((prev) => !prev)}>
            <Menu />
          </button>
        )}
        <img className="mr-4 size-9" src={Logo} alt="classroom logo" />
        EduConnect
      </div>
      <div className="flex items-center gap-4">
        {currentUserQuery.data ? (
          pathname === "/dashboard" && (
            <>
              {currentUserQuery.data.role === "teacher" ? (
                <CreateClass />
              ) : (
                <Button>
                  Join class
                  <Plus />
                </Button>
              )}
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
