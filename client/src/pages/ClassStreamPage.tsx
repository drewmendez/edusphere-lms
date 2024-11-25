import AnnouncementDropdown from "@/components/AnnouncementDropdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useCreateAnnouncement } from "@/services/announcementsServices";
import { useGetClass } from "@/services/classesServices";
import { useGetClassFeeds } from "@/services/classFeedsServices";
import { ClassFeed } from "@/types/types";
import { ClipboardList } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ClassStreamPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const params = useParams();
  const class_id = parseInt(params.class_id!);
  const { currentUserQuery } = useAuth();
  const role = currentUserQuery.data?.role;
  const announcer_id = currentUserQuery.data?.user_id;

  const { data: classData } = useGetClass(class_id);
  const { data: classFeeds, refetch: refetchClassFeeds } =
    useGetClassFeeds(class_id);
  const { mutate: createAnnouncement } = useCreateAnnouncement();

  const onPostAnnouncement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const announcementData = {
      class_id,
      announcement,
      announcer_id: announcer_id!,
    };
    createAnnouncement(announcementData, {
      onSuccess: (data) => {
        setIsOpen(false);
        setAnnouncement("");
        toast(data.message);
        refetchClassFeeds();
      },
    });
  };

  return (
    <div className="w-full max-w-[900px] space-y-6">
      <div
        className="flex h-[250px] flex-col justify-between gap-2 rounded-xl p-6 text-white"
        style={{ background: classData?.banner_color }}
      >
        {role === "teacher" && (
          <p>
            Class code:{" "}
            <span className="text-lg font-semibold">
              {classData?.class_code}
            </span>
          </p>
        )}

        <div className="mt-auto space-y-3">
          <p className="text-6xl">{classData?.class_subject}</p>
          <p className="text-lg font-semibold">{classData?.class_section}</p>
        </div>
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

      <div className="flex flex-col gap-6">
        {classFeeds?.map((classFeed) =>
          classFeed.type === "assignment" ? (
            <AssignmentFeed
              key={classFeed.feed_id}
              class_id={class_id}
              {...classFeed}
              accentColor={classData?.banner_color}
            />
          ) : (
            <AnnouncementFeed
              key={classFeed.feed_id}
              {...classFeed}
              role={role}
              announcer_id={announcer_id}
              class_id={class_id}
            />
          ),
        )}
      </div>
    </div>
  );
}

type FeedProps = ClassFeed & {
  class_id: number;
  accentColor?: string;
  role?: "teacher" | "student";
  announcer_id?: number;
};

function AssignmentFeed({
  id,
  content,
  creator,
  created_at,
  class_id,
  accentColor,
}: FeedProps) {
  return (
    <Link to={`/dashboard/assignments/${class_id}/${id}`}>
      <div className="flex items-center justify-between rounded-lg border px-5 py-3 shadow">
        <div className="flex items-center gap-2">
          <div
            className="rounded-full p-2 text-white"
            style={{ background: accentColor }}
          >
            <ClipboardList />
          </div>
          <p>
            <span className="font-semibold">{creator}</span> posted a new
            assignment: <span className="font-semibold">{content}</span>
          </p>
        </div>
        <p className="text-xs">{created_at}</p>
      </div>
    </Link>
  );
}

function AnnouncementFeed({
  id,
  content,
  creator,
  created_at,
  role,
  creator_id,
  announcer_id,
  class_id,
}: FeedProps) {
  return (
    <div className="divide-y-2 rounded-lg border px-5 py-3 shadow">
      <div className="flex items-center justify-between py-3 first:pt-0">
        <div>
          <p className="font-semibold">{creator}</p>
          <p className="text-xs">{created_at}</p>
        </div>
        {(role === "teacher" || creator_id === announcer_id) && (
          <AnnouncementDropdown announcement_id={id} class_id={class_id} />
        )}
      </div>
      <p className="whitespace-pre-wrap py-3 last:pb-0">{content}</p>
    </div>
  );
}
