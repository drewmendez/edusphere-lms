import { Link, useParams } from "react-router-dom";
import { useGetClasses } from "../queries/use-get-classes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, GraduationCap, UserRoundPen } from "lucide-react";

interface ClassesDropdownProps {
  role: string;
  pathname: string;
  isOpen: boolean;
}

export default function ClassesDropdown({
  role,
  pathname,
  isOpen,
}: ClassesDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const params = useParams();
  const paramId = Number(params.class_id);

  const { data: classes } = useGetClasses();

  useEffect(() => {
    if (!isOpen) {
      setIsDropdownOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      <button
        className={cn(
          "mr-3 flex items-center overflow-hidden rounded-br-full rounded-tr-full py-3 pl-2 transition hover:bg-muted",
          !isOpen && "pointer-events-none",
        )}
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        <div className={cn("mr-2", isDropdownOpen && "rotate-90")}>
          <ChevronRight size={18} />
        </div>
        <div className="mr-7">
          {role === "teacher" ? <UserRoundPen /> : <GraduationCap />}
        </div>
        <span className="flex-shrink-0">
          {role === "teacher" ? "Teaching" : "Enrolled"}
        </span>
      </button>
      {isDropdownOpen &&
        classes?.map((item) => (
          <ClassLink
            key={item.class_id}
            {...item}
            paramId={paramId}
            pathname={pathname}
          />
        ))}
    </>
  );
}

interface ClassLinkProps {
  class_id: number;
  banner_color: string;
  class_subject: string;
  class_section: string;
  paramId: number;
  pathname: string;
}

function ClassLink({
  class_id,
  banner_color,
  class_subject,
  class_section,
  paramId,
  pathname,
}: ClassLinkProps) {
  return (
    <Link
      className={cn(
        "mr-3 flex items-center gap-7 overflow-hidden rounded-br-full rounded-tr-full py-2 pl-7 text-sm transition hover:bg-muted",
        paramId === class_id && pathname.includes("class") && "bg-muted",
      )}
      to={`/class/stream/${class_id}`}
    >
      <div
        className="flex size-8 items-center justify-center rounded-full font-semibold text-white"
        style={{ background: banner_color }}
      >
        {class_subject.charAt(0)}
      </div>
      <div className="flex flex-col font-semibold">
        <span className="line-clamp-1">{class_subject}</span>
        <span className="text-xs font-normal">{class_section}</span>
      </div>
    </Link>
  );
}
