import pool from "../../config/db.config.js";
import { formatDate } from "../../utils/helpers.js";

export const getAssignments = async (user_id, filter, status) => {
  let query;
  let values;

  const queryForDoneAll = `
    SELECT a.assignment_id, a.title, c.class_id, c.class_subject, c.class_section, c.banner_color, a.created_at, ac.submitted_at, a.points, ac.given_points
    FROM assignments a
    LEFT JOIN assignment_completions ac ON a.assignment_id = ac.assignment_id AND ac.student_id = ?
    JOIN classes c ON a.class_id = c.class_id
    JOIN enrollments e ON c.class_id = e.class_id
    JOIN users u ON e.student_id = u.user_id
    WHERE e.student_id = ? AND ac.answer IS NOT NULL
    ORDER BY ac.submitted_at DESC
  `;

  const queryForDonePerClass = `
    SELECT a.assignment_id, a.title, c.class_id, c.class_subject, c.class_section, c.banner_color, a.created_at, ac.submitted_at, a.points, ac.given_points
    FROM assignments a
    LEFT JOIN assignment_completions ac ON a.assignment_id = ac.assignment_id AND ac.student_id = ?
    JOIN classes c ON a.class_id = c.class_id
    JOIN enrollments e ON c.class_id = e.class_id
    JOIN users u ON e.student_id = u.user_id
    WHERE e.student_id = ? AND ac.answer IS NOT NULL AND c.class_id = ?
    ORDER BY ac.submitted_at DESC
  `;

  const queryForAssignedAll = `
    SELECT a.assignment_id, a.title, c.class_id, c.class_subject, c.class_section, c.banner_color, a.created_at
    FROM assignments a
    LEFT JOIN assignment_completions ac ON a.assignment_id = ac.assignment_id AND ac.student_id = ?
    JOIN classes c ON a.class_id = c.class_id
    JOIN enrollments e ON c.class_id = e.class_id
    JOIN users u ON e.student_id = u.user_id
    WHERE e.student_id = ? AND ac.answer IS NULL
  `;

  const queryForAssignedPerClass = `
    SELECT a.assignment_id, a.title, c.class_id, c.class_subject, c.class_section, c.banner_color, a.created_at
    FROM assignments a
    LEFT JOIN assignment_completions ac ON a.assignment_id = ac.assignment_id AND ac.student_id = ?
    JOIN classes c ON a.class_id = c.class_id
    JOIN enrollments e ON c.class_id = e.class_id
    JOIN users u ON e.student_id = u.user_id
    WHERE e.student_id = ? AND ac.answer IS NULL AND c.class_id = ?
  `;

  const valuesForFilterAll = [user_id, user_id];
  const valuesForPerClass = [user_id, user_id, parseInt(filter)];

  if (status === "assigned") {
    if (filter === "all") {
      query = queryForAssignedAll;
      values = valuesForFilterAll;
    } else {
      query = queryForAssignedPerClass;
      values = valuesForPerClass;
    }
  } else {
    if (filter === "all") {
      query = queryForDoneAll;
      values = valuesForFilterAll;
    } else {
      query = queryForDonePerClass;
      values = valuesForPerClass;
    }
  }

  try {
    const [rows] = await pool.query(query, values);

    const assignments = rows.map((row) => ({
      ...row,
      created_at: formatDate(row.created_at),
      submitted_at: row.submitted_at ? formatDate(row.submitted_at) : null,
    }));

    return assignments;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const getAssignmentsInClass = async (class_id) => {
  const query = `
    SELECT assignment_id, title, created_at
    FROM assignments
    WHERE class_id = ?
    ORDER BY created_at DESC
  `;
  const values = [class_id];

  try {
    const [rows] = await pool.query(query, values);

    const assignments = rows.map((row) => ({
      ...row,
      created_at: formatDate(row.created_at),
    }));

    return assignments;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const getAssignment = async (assignment_id) => {
  const query = `
    SELECT a.assignment_id, a.title, a.description, a.points, a.created_at, CONCAT(u.firstname, " ", u.lastname) AS creator 
    FROM assignments a
    JOIN users u ON a.creator_id = u.user_id
    WHERE a.assignment_id = ?
  `;
  const values = [assignment_id];

  try {
    const [[row]] = await pool.query(query, values);

    const assignment = {
      ...row,
      created_at: formatDate(row.created_at),
    };

    return assignment;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const getSubmissions = async (assignment_id, class_id) => {
  const query = `
    SELECT ac.assignment_completion_id, u.user_id, CONCAT(u.firstname, " ", u.lastname) AS student_name, ac.answer, ac.submitted_at, a.points, ac.given_points
    FROM enrollments e
    JOIN users u ON e.student_id = u.user_id
    LEFT JOIN assignment_completions ac ON e.student_id = ac.student_id AND ac.assignment_id = ?
    JOIN assignments a ON a.assignment_id = ? AND a.class_id = e.class_id
    WHERE e.class_id = ?
    ORDER BY u.lastname
  `;
  const values = [assignment_id, assignment_id, class_id];

  try {
    const [rows] = await pool.query(query, values);

    const submissions = rows.map((row) => ({
      ...row,
      submitted_at: row.submitted_at ? formatDate(row.submitted_at) : null,
    }));

    return submissions;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const getSubmission = async (student_id, assignment_id) => {
  const query = `
    SELECT ac.answer, ac.submitted_at, ac.given_points, a.points
    FROM assignment_completions ac
    JOIN assignments a ON ac.assignment_id = a.assignment_id
    WHERE ac.student_id = ? AND ac.assignment_id = ?
  `;
  const values = [student_id, assignment_id];

  try {
    const [[row]] = await pool.query(query, values);

    if (!row) return null;

    const submission = {
      ...row,
      submitted_at: formatDate(row.submitted_at),
    };

    return submission;
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const createAssignment = async (
  title,
  description,
  points,
  class_id,
  creator_id
) => {
  const query = `
    INSERT INTO assignments (title, description, points, class_id, creator_id)
    VALUES (?,?,?,?,?)
  `;
  const values = [title, description, points, class_id, creator_id];

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const submitAnswer = async (assignment_id, student_id, answer) => {
  const query = `
    INSERT INTO assignment_completions (assignment_id, student_id, answer)
    VALUES (?,?,?)
  `;
  const values = [assignment_id, student_id, answer];

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const submitGrade = async (given_points, assignment_completion_id) => {
  const query = `
    UPDATE assignment_completions
    SET given_points = ?
    WHERE assignment_completion_id = ?
  `;
  const values = [given_points, assignment_completion_id];

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};

export const deleteAssignment = async (assignment_id) => {
  const query = `
    DELETE FROM assignments
    WHERE assignment_id = ?
  `;
  const values = [assignment_id];

  try {
    await pool.query(query, values);
  } catch (error) {
    console.error(error);
    throw new Error("Database error");
  }
};
