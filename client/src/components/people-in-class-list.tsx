import { useCurrentUser } from "@/context/CurrentUserContext";
import { useGetPeopleInClass } from "@/services/classesServices";

export default function PeopleInClassList({ class_id }: { class_id: number }) {
  const { currentUser } = useCurrentUser();
  const { data: people } = useGetPeopleInClass(class_id);

  return (
    <>
      <div>
        <p className="mb-2 border-b-2 px-2 py-3 text-4xl">Teacher</p>
        <p className="px-2 py-3 text-lg">{people?.teacher?.user}</p>
      </div>

      <div>
        <p className="mb-3 flex items-center justify-between border-b-2 px-2 py-3 text-4xl">
          {currentUser.role === "teacher" ? "Students" : "Classmates"}
          <span className="text-base">{people?.numberOfStudents} Students</span>
        </p>
        <div className="divide-y-2">
          {people?.students.map((student, index) => (
            <p className="px-2 py-2 text-lg" key={index}>
              {student.user}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
