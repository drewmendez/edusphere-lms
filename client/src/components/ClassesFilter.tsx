import { useGetClasses } from "@/services/classesServices";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ClassesFilterProps {
  path: string;
  status: string;
  refetchAssignments: () => void;
}

export default function ClassesFilter({
  path,
  status,
  refetchAssignments,
}: ClassesFilterProps) {
  const { data: classes } = useGetClasses();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState({ id: -1, subject: "All classes" });

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="text flex max-w-[350px] cursor-pointer items-center justify-between border border-gray-400 p-2 text-lg">
          <p>{filter.subject}</p>
          <ChevronDown className={`${isOpen && "rotate-180"}`} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          textValue="All classes"
          className={`flex w-[350px] cursor-pointer justify-between text-lg ${filter.subject === "All classes" && "bg-blue-100"}`}
          onClick={() => {
            setFilter({ id: -1, subject: "All classes" });
            navigate(`/${path}/${status}/all`);
            refetchAssignments();
          }}
        >
          All classes
        </DropdownMenuItem>
        {classes?.map((item) => (
          <DropdownMenuItem
            key={item.class_id}
            className={`flex w-[350px] cursor-pointer justify-between text-lg ${filter.id === item.class_id && "bg-blue-100"}`}
            onClick={() => {
              setFilter({ id: item.class_id, subject: item.class_subject });
              navigate(`/${path}/${status}/${item.class_id}`);
              refetchAssignments();
            }}
          >
            {item.class_subject}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
