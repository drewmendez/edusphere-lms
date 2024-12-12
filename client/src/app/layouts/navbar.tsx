import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

import { useCurrentUser } from "@/context/CurrentUserContext";
import CreateClass from "@/features/classes/components/create-class";
import JoinClass from "@/features/classes/components/join-class";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <Logo />
      <Navigations />
    </nav>
  );
}

function Navigations() {
  const { currentUser } = useCurrentUser();

  return (
    <div>
      {currentUser ? <SignedIn role={currentUser.role} /> : <NotSignedIn />}
    </div>
  );
}

function SignedIn({ role }: { role: string }) {
  if (role === "teacher") {
    return <CreateClass />;
  }
  return <JoinClass />;
}

function NotSignedIn() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" asChild>
        <Link to="/sign-up">Sign Up</Link>
      </Button>
      <Button asChild>
        <Link to="/sign-in">Sign In</Link>
      </Button>
    </div>
  );
}
