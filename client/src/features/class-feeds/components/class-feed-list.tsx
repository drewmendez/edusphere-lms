import { useGetClassFeeds } from "../queries/use-get-classfeeds";
import AssignmentContainer from "@/components/assignment-container";
import AnnouncementCard from "./announcement-card";

interface ClassFeedListProps {
  class_id: number;
  accentColor: string;
}

export default function ClassFeedList({
  class_id,
  accentColor,
}: ClassFeedListProps) {
  const { data: classFeeds } = useGetClassFeeds(class_id);

  return (
    <div className="flex flex-col gap-6">
      {classFeeds?.map((classFeed) =>
        classFeed.type === "assignment" ? (
          <AssignmentContainer
            key={classFeed.feed_id}
            assignment_id={classFeed.id}
            class_id={class_id}
            accentColor={accentColor}
          >
            <div className="flex w-full items-center justify-between">
              <p>
                <span className="font-semibold">{classFeed.creator}</span>
                posted a new assignment:
                <span className="font-semibold">{classFeed.content}</span>
              </p>
              <p className="text-xs">{classFeed.created_at}</p>
            </div>
          </AssignmentContainer>
        ) : (
          <AnnouncementCard
            key={classFeed.feed_id}
            {...classFeed}
            class_id={class_id}
          />
        ),
      )}
    </div>
  );
}
