import pool from "../../config/db.config.js";

export const createAssignment = async (
  title,
  description,
  class_id,
  creator_id
) => {
  await pool.query(
    `
    INSERT INTO assignments (title, description, class_id, creator_id)
    VALUES (?,?,?,?)
    `,
    [title, description, class_id, creator_id]
  );
};

export const deleteAssignment = async (assignment_id) => {
  await pool.query(
    `
    DELETE FROM assignments
    WHERE assignment_id = ?
    `,
    [assignment_id]
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

export const getAssignment = async (assignment_id) => {
  const [result] = await pool.query(
    `
    SELECT a.assignment_id, a.title, a.description, a.created_at, u.firstname, u.lastname
    FROM assignments a
    JOIN users u ON a.creator_id = u.user_id
    WHERE a.assignment_id = ?  
    `,
    [assignment_id]
  );

  return result[0];
};

export const getSubmissions = async (assignment_id, class_id) => {
  const [result] = await pool.query(
    `
    SELECT u.user_id, CONCAT(u.firstname, " ", u.lastname) AS student_name, ac.answer, ac.submitted_at
    FROM enrollments e
    JOIN users u ON e.student_id = u.user_id
    LEFT JOIN assignment_completions ac ON e.student_id = ac.student_id AND ac.assignment_id = ?
    JOIN assignments a ON a.assignment_id = ? AND a.class_id = e.class_id
    WHERE e.class_id = ?
    ORDER BY u.lastname
    `,
    [assignment_id, assignment_id, class_id]
  );

  return result;
};

export const getSubmission = async (student_id, assignment_id) => {
  const [result] = await pool.query(
    `
    SELECT answer, submitted_at
    FROM assignment_completions
    WHERE student_id = ? AND assignment_id = ?
    `,
    [student_id, assignment_id]
  );

  return result[0];
};

export const submitAnswer = async (assignment_id, student_id, answer) => {
  await pool.query(
    `
    INSERT INTO assignment_completions (assignment_id, student_id, answer)
    VALUES (?,?,?)
    `,
    [assignment_id, student_id, answer]
  );
};
