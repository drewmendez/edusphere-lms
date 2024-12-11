import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useSubmitGrade } from "../mutations/use-submit-grade";
import { toast } from "sonner";

interface AddPointsProps {
  assignment_completion_id: number;
  points: number;
  refetchSubmissions: () => void;
}

export default function AddPoints({
  assignment_completion_id,
  points,
}: AddPointsProps) {
  const [grade, setGrade] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: submitGrade } = useSubmitGrade(assignment_completion_id);

  const handleSubmitGrade = () => {
    if (grade > points || grade <= 0) return;

    submitGrade(
      { given_points: grade },
      {
        onSuccess: (response) => {
          toast(response.message);
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="absolute -right-20 top-2 rounded-md bg-primary px-3 py-1 text-center text-sm text-white">
          Grade
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-min space-y-2"
        onCloseAutoFocus={() => setGrade(0)}
      >
        <div className="flex items-center gap-1">
          <Input
            className="px-1 text-right font-semibold"
            value={grade || ""}
            onChange={(e) => setGrade(Number(e.target.value))}
          />
          <p className="text-sm font-semibold tracking-widest">/{points}</p>
        </div>

        <Button className="w-full" onClick={handleSubmitGrade}>
          Submit
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
