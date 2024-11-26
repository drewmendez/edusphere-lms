import pool from "../../config/db.config.js";

export const createAnnouncement = async (
  class_id,
  announcer_id,
  announcement
) => {
  const query = `
    INSERT INTO announcements (class_id, announcer_id, announcement)
    VALUES (?,?,?)
  `;
  const values = [class_id, announcer_id, announcement];

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const deleteAnnouncement = async (announcement_id) => {
  const query = `
    DELETE FROM announcements
    WHERE announcement_id = ?
  `;
  const values = [announcement_id];

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};
