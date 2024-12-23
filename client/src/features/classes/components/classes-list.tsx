import ClassCard from "./class-card";
import { useGetClasses } from "../queries/use-get-classes";

export default function ClassesList() {
  const { data: classes } = useGetClasses();

  return (
    <div className="flex flex-wrap gap-6">
      {classes?.map((item) => <ClassCard key={item.class_id} {...item} />)}
    </div>
  );
}
