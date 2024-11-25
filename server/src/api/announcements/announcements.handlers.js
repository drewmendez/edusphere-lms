import {
  createAnnouncement,
  deleteAnnouncement,
} from "./announcements.services.js";

export const handleCreateAnnouncement = async (req, res) => {
  const { class_id, announcement, announcer_id } = req.body;

  if (!class_id || !announcement || !announcer_id) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
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

export const handleDeleteAnnouncement = async (req, res) => {
  try {
    const announcement_id = parseInt(req.params.announcement_id);

    await deleteAnnouncement(announcement_id);

    return res.status(201).json({
      success: true,
      message: "Announcement deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};
