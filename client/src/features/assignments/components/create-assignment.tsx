import { useState } from "react";
import FormModal from "@/components/form-modal";
import CreateAssignmentForm from "./create-assignment-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CreateAssignment({ class_id }: { class_id: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <Button>
          Create <Plus />
        </Button>
      }
      title="Create an assignment"
      description="Create an assignment for your students to work with."
    >
      <CreateAssignmentForm class_id={class_id} setIsOpen={setIsOpen} />
    </FormModal>
  );
}
