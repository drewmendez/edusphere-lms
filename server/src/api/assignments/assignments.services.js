import pool from "../../config/db.config.js";

export const createAssignment = async (title, description, class_id) => {
  await pool.query(
    `
    INSERT INTO assignments (title, description, class_id)
    VALUES (?,?,?)
    `,
    [title, description, class_id]
  );
};

export const getAssignmentsInClass = async (class_id) => {
  const [result] = await pool.query(
    `
    SELECT assignment_id, title, created_at
    FROM assignments
    WHERE class_id = ?
    ORDER BY created_at DESC
    `,
    class_id
  );

  return result;
};
