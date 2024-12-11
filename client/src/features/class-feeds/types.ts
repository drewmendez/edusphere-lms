export type AnnouncementData = {
  class_id: number;
  announcement: string;
};

export type ClassFeed = {
  feed_id: number;
  id: number;
  content: string;
  type: "announcement" | "assignment";
  creator_id: number;
  creator: string;
  created_at: string;
};
