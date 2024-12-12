import { ClipboardList } from "lucide-react";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface AssignmentCardProps extends PropsWithChildren {
  class_id: number;
  assignment_id: number;
  accentColor: string;
}

export default function AssignmentContainer({
  class_id,
  assignment_id,
  accentColor,
  children,
}: AssignmentCardProps) {
  return (
    <Link to={`/class/assignments/${class_id}/${assignment_id}`}>
      <div className="flex items-center gap-5 rounded-lg px-5 py-3 ring-2 ring-border transition-all hover:ring-foreground">
        <div
          className="rounded-full p-2 text-white"
          style={{ background: accentColor }}
        >
          <ClipboardList />
        </div>
        {children}
      </div>
    </Link>
  );
}
