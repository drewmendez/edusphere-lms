import { useCurrentUser } from "@/context/CurrentUserContext";
import { useGetClass } from "@/services/classesServices";

export default function ClassBanner({ class_id }: { class_id: number }) {
  const { currentUser } = useCurrentUser();
  const { data: classData } = useGetClass(class_id);

  return (
    <div
      className="flex h-[250px] flex-col justify-between gap-2 rounded-xl p-6 text-white"
      style={{ background: classData?.banner_color }}
    >
      {currentUser.role === "teacher" && (
        <p>
          Class code:{" "}
          <span className="text-lg font-semibold">{classData?.class_code}</span>
        </p>
      )}

      <div className="mt-auto space-y-3">
        <p className="text-6xl">{classData?.class_subject}</p>
        <p className="text-lg font-semibold">{classData?.class_section}</p>
      </div>
    </div>
  );
}
