import pool from "../../config/db.config.js";

export const getStudentsInClass = async (class_id) => {
  const [result] = await pool.query(
    `
    SELECT student_id
    FROM enrollments
    WHERE class_id = ?
    `,
    [class_id]
  );

  return result;
};
