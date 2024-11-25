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

export const deleteAnnouncement = async (announcement_id) => {
  await pool.query(
    `
    DELETE FROM announcements
    WHERE announcement_id = ?
    `,
    [announcement_id]
  );
};
