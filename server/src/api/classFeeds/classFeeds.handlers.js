import { getClassFeeds } from "./classFeeds.services.js";

export const handleGetClassFeeds = async (req, res) => {
  try {
    const class_id = parseInt(req.params.class_id);

    const classFeeds = await getClassFeeds(class_id);

    return res.send(classFeeds);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};
