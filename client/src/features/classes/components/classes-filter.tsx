import { useGetClasses } from "../queries/use-get-classes";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface ClassesFilterProps {
  path: string;
  status: string;
}

export default function ClassesFilter({ path, status }: ClassesFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<{
    id: number | string;
    subject: string;
  }>();

  const { data: classes } = useGetClasses();
  const navigate = useNavigate();
  const params = useParams();
  const filterId = params?.filter!;

  const subject =
    classes?.find((item) => item.class_id === parseInt(filterId))
      ?.class_subject || "All classes";

  useEffect(() => {
    setFilter({ id: filterId, subject: subject });
  }, [subject]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="text flex max-w-[350px] cursor-pointer items-center justify-between rounded-md border-2 p-2 text-lg">
          <p>{filter?.subject}</p>
          <ChevronDown className={`${isOpen && "rotate-180"}`} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className={`flex w-[350px] cursor-pointer justify-between text-lg ${filter?.subject === "All classes" && "bg-muted"}`}
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
            className={`flex w-[350px] cursor-pointer justify-between text-lg ${filter?.id === item.class_id && "bg-muted"}`}
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
