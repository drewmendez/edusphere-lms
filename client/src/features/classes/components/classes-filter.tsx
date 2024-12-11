import { useGetClasses } from "../queries/use-get-classes";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ClassesFilterProps {
  path: string;
  status: string;
}

export default function ClassesFilter({ path, status }: ClassesFilterProps) {
  const { data: classes } = useGetClasses();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<{
    id: number | string;
    subject: string;
  }>({ id: "all", subject: "All classes" });

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
          className={`flex w-[350px] cursor-pointer justify-between text-lg ${filter.subject === "All classes" && "bg-blue-100"}`}
          onClick={() => {
            setFilter({ id: "all", subject: "All classes" });
            navigate(`/${path}/${status}/all`);
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
            }}
          >
            {item.class_subject}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
