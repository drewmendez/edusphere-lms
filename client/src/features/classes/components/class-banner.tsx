import { useCurrentUser } from "@/context/CurrentUserContext";
import { useGetClass } from "../queries/use-get-class";
import { useEffect } from "react";

interface ClassBannerProps {
  class_id: number;
  setAccentColor: React.Dispatch<React.SetStateAction<string>>;
}

export default function ClassBanner({
  class_id,
  setAccentColor,
}: ClassBannerProps) {
  const { currentUser } = useCurrentUser();
  const { data: classData } = useGetClass(class_id);

  useEffect(() => {
    setAccentColor(classData?.banner_color!);
  }, [classData]);

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
