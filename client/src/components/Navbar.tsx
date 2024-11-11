import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function Navbar() {
  const { signOutMutation, currentUserQuery } = useAuth();
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
    <header className="bg-bgWhite fixed inset-x-0 top-0 py-4 shadow">
      <div className="container">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-4 font-semibold">
            <img className="size-9" src={Logo} alt="classroom logo" />
            EduConnect
          </div>
          <div className="flex items-center gap-4">
            {currentUserQuery.data ? (
              <>
                <p className="text-sm">{currentUserQuery.data.user}</p>
                <Button variant="outline" onClick={onSignOut}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline">
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
                <Button>
                  <Link to="/sign-in">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
