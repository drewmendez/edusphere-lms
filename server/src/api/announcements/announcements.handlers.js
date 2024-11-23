import { createAnnouncement } from "./announcements.services.js";

export const handleCreateAnnouncement = async (req, res) => {
  const { class_id, announcement } = req.body;

  if (!class_id || !announcement) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const announcer_id = parseInt(req.params.announcer_id);

    await createAnnouncement(class_id, announcer_id, announcement);

    return res.status(201).json({
      success: true,
      message: "Announcement posted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};
