import pool from "../../config/db.config.js";
import {
  generateClassCode,
  generateRandomBannerColor,
} from "../../utils/helpers.js";

export const getClassesForTeacherRole = async (teacher_id) => {
  const query = `
    SELECT class_id, class_subject, class_code, banner_color, class_section
    FROM classes
    WHERE teacher_id = ?
  `;
  const values = [teacher_id];

  try {
    const [rows] = await pool.query(query, values);

    return rows;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const getClassesForStudentRole = async (student_id) => {
  const query = `
    SELECT c.class_id, c.class_subject, c.banner_color, c.class_section, CONCAT(u.firstname, " ", u.lastname) AS class_teacher 
    FROM classes c
    JOIN users u ON c.teacher_id = u.user_id
    JOIN enrollments e ON c.class_id = e.class_id
    WHERE e.student_id = ?
  `;
  const values = [student_id];

  try {
    const [rows] = await pool.query(query, values);

    return rows;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const getClass = async (class_id) => {
  const query = `
    SELECT class_id, class_subject, class_section, class_code, banner_color
    FROM classes
    WHERE class_id = ?
  `;
  const values = [class_id];

  try {
    const [[row]] = await pool.query(query, values);

    return row;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const getPeopleInClass = async (class_id) => {
  const query = `
    SELECT u.user_id, CONCAT(u.firstname, " ", u.lastname) AS user, u.role, u.lastname
    FROM users u
    JOIN classes c ON u.user_id = c.teacher_id
    WHERE c.class_id = ?
    UNION ALL
    SELECT u.user_id, CONCAT(u.firstname, " ", u.lastname) AS user, u.role, u.lastname
    FROM users u
    JOIN enrollments e ON u.user_id = e.student_id
    WHERE e.class_id = ?
    ORDER BY lastname
  `;
  const values = [class_id, class_id];

  try {
    const [rows] = await pool.query(query, values);

    return rows;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const createClass = async (class_subject, class_section, teacher_id) => {
  const query = `
    INSERT INTO classes (class_subject, class_code, banner_color, class_section, teacher_id)
    VALUES (?,?,?,?,?)
  `;
  const values = [
    class_subject,
    generateClassCode(),
    generateRandomBannerColor(),
    class_section,
    teacher_id,
  ];

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const deleteClass = async (class_id) => {
  const query = `
    DELETE FROM classes
    WHERE class_id = ?
  `;
  const values = [class_id];

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const updateClass = async (class_id, class_subject, class_section) => {
  const query = `
    UPDATE classes
    SET class_subject = ?, class_section = ?
    WHERE class_id = ?
  `;
  const values = [class_subject, class_section, class_id];

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};
