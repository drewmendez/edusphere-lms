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

export const getEnrollments = async (student_id) => {
  const [result] = await pool.query(
    `
    SELECT class_id
    FROM enrollments
    WHERE student_id = ?
    `,
    [student_id]
  );

  return result;
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
