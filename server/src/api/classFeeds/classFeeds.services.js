import pool from "../../config/db.config.js";

export const getClassFeeds = async (class_id) => {
  const [result] = await pool.query(
    `
    SELECT CONCAT("T1-", announcements.announcement_id) AS feed_id, announcements.announcement AS content, announcements.created_at, users.firstname, users.lastname, "announcement" AS type
    FROM announcements
    JOIN users ON announcements.announcer_id = users.user_id
    WHERE announcements.class_id = ?
    UNION ALL
    SELECT CONCAT("T2-", assignments.assignment_id) AS feed_id, assignments.title AS content, assignments.created_at, users.firstname, users.lastname, "assignment" AS type
    FROM assignments
    JOIN users ON assignments.creator_id = users.user_id
    WHERE assignments.class_id = ?
    ORDER BY created_at DESC;
    `,
    [class_id, class_id]
  );

  return result;
};
