import ClassesFilter from "@/features/classes/components/classes-filter";
import TodoAssignmentsList from "@/features/assignments/components/todo-assignments-list";

export default function AssignedPage() {
  return (
    <div className="w-full max-w-[800px] space-y-4">
      <ClassesFilter path="to-do" status="assigned" />
      <TodoAssignmentsList status="assigned" />
    </div>
  );
}
