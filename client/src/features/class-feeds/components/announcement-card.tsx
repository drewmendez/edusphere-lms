import { useCurrentUser } from "@/context/CurrentUserContext";
import { ClassFeed } from "../types";
import Dropdown from "@/components/dropdown";
import DeleteAnnouncement from "../components/delete-announcement";
import { EllipsisVertical } from "lucide-react";

interface AnnouncementCardProps extends ClassFeed {
  class_id: number;
}

export default function AnnouncementCard({
  creator_id,
  creator,
  created_at,
  content,
  id,
}: AnnouncementCardProps) {
  const { currentUser } = useCurrentUser();

  return (
    <div className="divide-y-2 rounded-lg border px-5 py-3 shadow">
      <div className="flex items-center justify-between py-3 first:pt-0">
        <div>
          <p className="font-semibold">{creator}</p>
          <p className="text-xs">{created_at}</p>
        </div>
        {(currentUser.role === "teacher" ||
          creator_id === currentUser.user_id) && (
          <Dropdown
            trigger={<EllipsisVertical className="cursor-pointer" />}
            dropdownItems={[<DeleteAnnouncement announcement_id={id} />]}
          />
        )}
      </div>
      <p className="whitespace-pre-wrap py-3 last:pb-0">{content}</p>
    </div>
  );
}
