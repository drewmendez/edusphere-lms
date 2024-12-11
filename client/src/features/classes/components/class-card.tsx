import { useCurrentUser } from "@/context/CurrentUserContext";
import { Link } from "react-router-dom";
import { ClipboardList, EllipsisVertical, Users } from "lucide-react";
import { Class } from "../types";
import Dropdown from "@/components/dropdown";
import DeleteClass from "./delete-class";
import EditClass from "./edit-class";
import { useState } from "react";
import FormModal from "@/components/form-modal";
import EditClassForm from "./edit-class-form";
import UnenrollClass from "./unenroll-class";

type ClassCardProps = Class;

export default function ClassCard({
  class_id,
  class_subject,
  banner_color,
  class_section,
  class_teacher,
}: ClassCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { currentUser } = useCurrentUser();

  return (
    <div className="flex h-[296px] w-[302px] flex-col overflow-hidden rounded-xl border-2 transition hover:shadow-md">
      <div
        className="flex justify-between p-5 text-white"
        style={{ background: banner_color }}
      >
        <div className="space-y-1">
          <Link to={`/class/stream/${class_id}`}>
            <p className="line-clamp-1 cursor-pointer text-2xl hover:underline">
              {class_subject}
            </p>
          </Link>
          <p className="text-sm">{class_section}</p>
          {currentUser.role === "student" && <p>{class_teacher}</p>}
        </div>

        <Dropdown
          trigger={
            <EllipsisVertical className="flex-shrink-0 cursor-pointer" />
          }
          dropdownItems={
            currentUser.role === "teacher"
              ? [
                  <EditClass setIsOpen={setIsEditOpen} />,
                  <DeleteClass class_id={class_id} />,
                ]
              : [<UnenrollClass class_id={class_id} />]
          }
        />
        <FormModal
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          title="Edit class"
        >
          <EditClassForm
            class_id={class_id}
            class_subject={class_subject}
            class_section={class_section}
            setIsOpen={setIsEditOpen}
          />
        </FormModal>
      </div>
      <div className="flex flex-1 flex-col justify-between p-5 text-slate-600"></div>
      <div className="flex justify-end gap-1 border-t-2 px-2 py-1">
        <Link
          className="rounded-full p-3 transition hover:bg-slate-200"
          to={`/class/assignments/${class_id}`}
        >
          <ClipboardList />
        </Link>
        <Link
          className="rounded-full p-3 transition hover:bg-slate-200"
          to={`/class/people/${class_id}`}
        >
          <Users />
        </Link>
      </div>
    </div>
  );
}
