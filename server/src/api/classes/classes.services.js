import pool from "../../config/db.config.js";

export const getClassesForTeacherRole = async (teacher_id) => {
  const [result] = await pool.query(
    `
    SELECT class_id, class_subject, class_code, banner_color, class_section
    FROM classes
    WHERE teacher_id = ?
    `,
    [teacher_id]
  );

  return result;
};

export const createClass = async (
  class_subject,
  class_code,
  banner_color,
  class_section,
  teacher_id
) => {
  await pool.query(
    `
    INSERT INTO classes (class_subject, class_code, banner_color, class_section, teacher_id)
    VALUES (?,?,?,?,?)
    `,
    [class_subject, class_code, banner_color, class_section, teacher_id]
  );
};

export const deleteClass = async (class_id) => {
  await pool.query(
    `
    DELETE FROM classes
    WHERE class_id = ?
    `,
    [class_id]
  );
};
