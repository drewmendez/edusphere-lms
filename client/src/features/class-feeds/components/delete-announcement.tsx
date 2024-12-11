import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useDeleteAnnouncement } from "../mutations/use-delete-announcement";

export default function DeleteAnnouncement({
  announcement_id,
}: {
  announcement_id: number;
}) {
  const { mutate: deleteAnnouncement } = useDeleteAnnouncement();

  const handleDeleteAnnouncement = () => {
    deleteAnnouncement(announcement_id, {
      onSuccess: (response) => {
        toast(response.message);
      },
    });
  };

  return (
    <button
      className="flex w-full items-center justify-between text-red-600"
      onClick={handleDeleteAnnouncement}
    >
      Delete <Trash size={18} />
    </button>
  );
}
