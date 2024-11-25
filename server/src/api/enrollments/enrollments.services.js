import pool from "../../config/db.config.js";

export const getClassId = async (class_code) => {
  const [result] = await pool.query(
    `
    SELECT class_id
    FROM classes
    WHERE class_code = ?
    `,
    [class_code]
  );

  return result[0];
};

export const getEnrollment = async (student_id, class_id) => {
  const [result] = await pool.query(
    `
    SELECT *
    FROM enrollments
    WHERE student_id = ? AND class_id = ?
    `,
    [student_id, class_id]
  );

  return result[0];
};

export const enrollToClass = async (student_id, class_id) => {
  await pool.query(
    `
    INSERT INTO enrollments (student_id, class_id)
    VALUES (?,?)
    `,
    [student_id, class_id]
  );
};

export const unenrollToClass = async (student_id, class_id) => {
  await pool.query(
    `
    DELETE FROM enrollments
    WHERE student_id = ? AND class_id = ?
    `,
    [student_id, class_id]
  );
};
