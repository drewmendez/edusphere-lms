import pool from "../../config/db.config.js";

export const createAnnouncement = async (
  class_id,
  announcer_id,
  announcement
) => {
  await pool.query(
    `
    INSERT INTO announcements (class_id, announcer_id, announcement)
    VALUES (?,?,?)
    `,
    [class_id, announcer_id, announcement]
  );
};
