import { cn } from "@/lib/utils";
import { useCreateAnnouncement } from "../mutations/use-create-announcement";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AnnouncementForm({ class_id }: { class_id: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const { mutate: createAnnouncement } = useCreateAnnouncement();

  const onPostAnnouncement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const announcementData = {
      class_id,
      announcement,
    };
    createAnnouncement(announcementData, {
      onSuccess: (data) => {
        setIsOpen(false);
        setAnnouncement("");
        toast(data.message);
      },
    });
  };

  return (
    <form
      className={cn(
        "h-[62px] cursor-pointer overflow-hidden rounded-xl border p-5 text-slate-400 shadow transition duration-75 hover:text-black",
        isOpen && "h-auto cursor-default",
      )}
      onClick={() => setIsOpen(true)}
      onSubmit={onPostAnnouncement}
    >
      <p className={cn("text-sm", isOpen && "hidden")}>
        Announce something to your class
      </p>
      <div className={cn("hidden", isOpen && "flex flex-col gap-6")}>
        <Textarea
          className="resize-none"
          placeholder="Announce something to your class"
          rows={6}
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
        />
        <div className="ml-auto space-x-3">
          <Button
            variant="secondary"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              setAnnouncement("");
            }}
          >
            Cancel
          </Button>
          <Button disabled={!announcement.trim().length}>Post</Button>
        </div>
      </div>
    </form>
  );
}
