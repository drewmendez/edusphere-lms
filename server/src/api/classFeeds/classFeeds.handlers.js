import { getClassFeeds } from "./classFeeds.services.js";

export const handleGetClassFeeds = async (req, res) => {
  try {
    const class_id = parseInt(req.params.class_id);

    const result = await getClassFeeds(class_id);

    const classFeeds = result.map((item) => ({
      feed_id: item.feed_id,
      content: item.content,
      type: item.type,
      creator: `${item.firstname} ${item.lastname}`,
      created_at: new Intl.DateTimeFormat("en-US", {
        weekday: "short", // Short weekday, e.g., "Sat"
        year: "numeric", // Four-digit year
        month: "short", // Short month, e.g., "Nov"
        day: "2-digit", // Two-digit day
        hour: "numeric", // Hour
        minute: "2-digit", // Two-digit minutes
        hour12: true,
      }).format(item.created_at),
    }));

    return res.send(classFeeds);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};
