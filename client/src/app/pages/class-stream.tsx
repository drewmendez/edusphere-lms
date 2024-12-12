import { useParams } from "react-router-dom";

import AnnouncementForm from "@/features/class-feeds/components/announcement-form";
import ClassBanner from "@/features/classes/components/class-banner";
import ClassFeedList from "@/features/class-feeds/components/class-feed-list";
import { useState } from "react";

export default function ClassStreamPage() {
  const params = useParams();
  const class_id = parseInt(params.class_id!);
  const [accentColor, setAccentColor] = useState("");

  return (
    <div className="w-full max-w-[900px] space-y-6">
      <ClassBanner class_id={class_id} setAccentColor={setAccentColor} />
      <AnnouncementForm class_id={class_id} />
      <ClassFeedList class_id={class_id} accentColor={accentColor} />
    </div>
  );
}
