import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useCreateAnnouncement } from "@/services/announcementsServices";
import { useGetClass } from "@/services/classesServices";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ClassStreamPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const params = useParams();
  const class_id = parseInt(params.class_id!);

  const { data: classData } = useGetClass(class_id);
  const { mutate: createAnnouncement } = useCreateAnnouncement();

  const onPostAnnouncement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = { class_id, announcement };
    createAnnouncement(payload, {
      onSuccess: (data) => {
        toast(data.message);
        setIsOpen(false);
      },
    });
  };

  return (
    <div className="w-full max-w-[900px] space-y-6">
      <div
        className="flex h-[250px] flex-col justify-end gap-2 rounded-xl bg-blue-400 p-6 text-white"
        style={{ background: classData?.banner_color }}
      >
        <p className="text-6xl">{classData?.class_subject}</p>
        <p className="text-lg font-semibold">{classData?.class_section}</p>
      </div>
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
    </div>
  );
}
