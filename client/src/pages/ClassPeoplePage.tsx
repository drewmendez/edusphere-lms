import { useCurrentUser } from "@/context/CurrentUserContext";
import { useGetPeopleInClass } from "@/services/classesServices";
import { useParams } from "react-router-dom";

export default function ClassPeoplePage() {
  const { currentUser } = useCurrentUser();
  const role = currentUser?.role;
  const currentUserId = currentUser?.user_id;

  const { class_id } = useParams();
  const parsedClassId = parseInt(class_id!);
  const { data: people } = useGetPeopleInClass(parsedClassId);

  const teacher = people?.find((user) => user.role === "teacher");
  const students =
    role === "teacher"
      ? people?.filter((user) => user.role !== "teacher")
      : people?.filter(
          (user) => user.role !== "teacher" && user.user_id !== currentUserId,
        );

  return (
    <div className="w-full max-w-[800px]">
      <div>
        <p className="mb-2 border-b-2 px-2 py-3 text-4xl">Teacher</p>
        <p className="px-2 py-3 text-lg">{teacher?.user}</p>
      </div>

      <div>
        <p className="mb-3 flex items-center justify-between border-b-2 px-2 py-3 text-4xl">
          {role === "teacher" ? "Students" : "Classmates"}
          <span className="text-base">{people?.length! - 1} Students</span>
        </p>
        <div className="divide-y-2">
          {students?.map((student, index) => (
            <p className="px-2 py-2 text-lg" key={index}>
              {student.user}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
