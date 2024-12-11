import ClassesFilter from "@/features/classes/components/classes-filter";
import ToReviewAssignmentsList from "@/features/assignments/components/to-review-assignments-list";

export default function ReviewedPage() {
  return (
    <div className="w-full max-w-[800px] space-y-4">
      <ClassesFilter path="to-review" status="reviewed" />
      <ToReviewAssignmentsList />
    </div>
  );
}
