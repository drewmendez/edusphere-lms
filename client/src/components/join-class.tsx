import { useState } from "react";
import { Plus } from "lucide-react";
import FormModal from "./form-modal";
import JoinClassForm from "./join-class-form";
import { Button } from "./ui/button";

export default function JoinClass() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Join a class"
      description="Ask your teacher for the class code, then enter it here."
      trigger={
        <Button>
          Join class <Plus />
        </Button>
      }
    >
      <JoinClassForm setIsOpen={setIsOpen} />
    </FormModal>
  );
}
