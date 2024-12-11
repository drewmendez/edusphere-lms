import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSignOut } from "@/lib/auth";

export default function SignOutDialog() {
  const { mutate: signOut } = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(undefined, {
      onSuccess: (response) => {
        navigate("/", { replace: true });
        toast(response.message);
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="mr-3 flex items-center gap-7 overflow-hidden rounded-br-full rounded-tr-full py-3 pl-8 transition hover:bg-red-100">
          <div>
            <LogOut />
          </div>
          <span className="flex-shrink-0">Sign out</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you really want to sign out?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription></AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={handleSignOut}
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
