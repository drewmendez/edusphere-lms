import { EllipsisVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useDeleteAnnouncement } from "@/services/announcementsServices";
import { toast } from "sonner";
import { useGetClassFeeds } from "@/services/classFeedsServices";

interface AnnouncementDropdownProps {
  announcement_id: number;
  class_id: number;
}

export default function AnnouncementDropdown({
  announcement_id,
  class_id,
}: AnnouncementDropdownProps) {
  const { mutate: deleteAnnouncement } = useDeleteAnnouncement();
  const { refetch: refetchClassFeeds } = useGetClassFeeds(class_id);

  const handleDeleteAnnouncement = () => {
    deleteAnnouncement(announcement_id, {
      onSuccess: (response) => {
        toast(response.message);
        refetchClassFeeds();
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="-mr-2 rounded-full p-2 transition hover:bg-gray-200">
        <EllipsisVertical className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex cursor-pointer justify-between"
          onClick={handleDeleteAnnouncement}
        >
          Delete
          <Trash />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
