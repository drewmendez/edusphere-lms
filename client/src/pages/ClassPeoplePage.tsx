import PeopleInClassList from "@/components/people-in-class-list";
import { useParams } from "react-router-dom";

export default function ClassPeoplePage() {
  const params = useParams();
  const class_id = parseInt(params.class_id!);

  return (
    <div className="w-full max-w-[800px]">
      <PeopleInClassList class_id={class_id} />
    </div>
  );
}
