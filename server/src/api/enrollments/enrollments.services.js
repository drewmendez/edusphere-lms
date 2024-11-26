import pool from "../../config/db.config.js";

export const getClassId = async (class_code) => {
  const query = `
    SELECT class_id
    FROM classes
    WHERE class_code = ?
  `;
  const values = [class_code];

  try {
    const [[row]] = await pool.query(query, values);

    return row?.class_id;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const isAlreadyEnrolled = async (student_id, class_id) => {
  const query = `
    SELECT enrollment_id
    FROM enrollments
    WHERE student_id = ? AND class_id = ?
  `;
  const values = [student_id, class_id];

  try {
    const [[row]] = await pool.query(query, values);

    return !!row;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const enrollToClass = async (student_id, class_id) => {
  const query = `
    INSERT INTO enrollments (student_id, class_id)
    VALUES (?,?)
  `;
  const values = [student_id, class_id];

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const unenrollToClass = async (student_id, class_id) => {
  const query = `
    DELETE FROM enrollments
    WHERE student_id = ? AND class_id = ?
  `;
  const values = [student_id, class_id];

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};
