import { Plus } from "lucide-react";
import CreateClassForm from "./create-class-form";
import FormModal from "./form-modal";
import { Button } from "./ui/button";
import { useState } from "react";

export default function CreateClass() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Create a class"
      description="Create a class where students can join, view assignments and submit their work."
      trigger={
        <Button>
          Create class <Plus />
        </Button>
      }
    >
      <CreateClassForm setIsOpen={setIsOpen} />
    </FormModal>
  );
}
