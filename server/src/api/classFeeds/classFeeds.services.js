import pool from "../../config/db.config.js";
import { formatDate } from "../../utils/helpers.js";

export const getClassFeeds = async (class_id) => {
  const query = `
    SELECT CONCAT("T1-", announcements.announcement_id) AS feed_id, announcements.announcement_id AS id, announcements.announcement AS content, announcements.created_at, users.user_id AS creator_id, CONCAT(users.firstname, " ", users.lastname) AS creator, "announcement" AS type
    FROM announcements
    JOIN users ON announcements.announcer_id = users.user_id
    WHERE announcements.class_id = ?
    UNION ALL
    SELECT CONCAT("T2-", assignments.assignment_id) AS feed_id, assignments.assignment_id AS id, assignments.title AS content, assignments.created_at, users.user_id AS creator_id, CONCAT(users.firstname, " ", users.lastname) AS creator, "assignment" AS type
    FROM assignments
    JOIN users ON assignments.creator_id = users.user_id
    WHERE assignments.class_id = ?
    ORDER BY created_at DESC
  `;
  const values = [class_id, class_id];

  try {
    const [rows] = await pool.query(query, values);

    const classFeeds = rows.map((row) => ({
      ...row,
      created_at: formatDate(row.created_at),
    }));

    return classFeeds;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};
