import ClassesFilter from "@/features/classes/components/classes-filter";
import TodoAssignmentsList from "@/features/assignments/components/todo-assignments-list";

export default function DonePage() {
  return (
    <div className="w-full max-w-[800px] space-y-4">
      <ClassesFilter path="to-do" status="done" />
      <TodoAssignmentsList status="done" />
    </div>
  );
}
