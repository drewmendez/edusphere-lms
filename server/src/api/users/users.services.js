import pool from "../../config/db.config.js";

export const getPeopleInClass = async (class_id) => {
  const [result] = await pool.query(
    `
    SELECT u.firstname, u.lastname, u.user_id, u.role
    FROM users u
    JOIN classes c ON u.user_id = c.teacher_id
    WHERE c.class_id = ?
    UNION ALL
    SELECT u.firstname, u.lastname, u.user_id, u.role
    FROM users u
    JOIN enrollments e ON u.user_id = e.student_id
    WHERE e.class_id = ?
    ORDER BY lastname
    `,
    [class_id, class_id]
  );

  return result;
};
