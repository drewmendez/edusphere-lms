import ClassesFilter from "@/components/classes-filter";
import TodoAssignmentsList from "@/components/todo-assignments-list";

export default function DonePage() {
  return (
    <div className="w-full max-w-[800px] space-y-4">
      <ClassesFilter path="to-do" status="done" />
      <TodoAssignmentsList status="done" />
    </div>
  );
}
