import { useParams } from "react-router-dom";

import AnnouncementForm from "@/features/class-feeds/components/announcement-form";
import ClassBanner from "@/features/classes/components/class-banner";
import ClassFeedList from "@/features/class-feeds/components/class-feed-list";

export default function ClassStreamPage() {
  const params = useParams();
  const class_id = parseInt(params.class_id!);

  return (
    <div className="w-full max-w-[900px] space-y-6">
      <ClassBanner class_id={class_id} />
      <AnnouncementForm class_id={class_id} />
      <ClassFeedList class_id={class_id} />
    </div>
  );
}
