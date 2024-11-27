import {
  createAssignment,
  deleteAssignment,
  getAssignment,
  getAssignmentsInClass,
  getSubmission,
  getSubmissions,
  submitAnswer,
  submitGrade,
} from "./assignments.services.js";

export const handleGetAssignmentsInClass = async (req, res) => {
  try {
    const class_id = parseInt(req.params.class_id);

    const assignments = await getAssignmentsInClass(class_id);

    return res.status(200).send(assignments);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
    });
  }
};

export const handleGetAssignment = async (req, res) => {
  try {
    const assignment_id = parseInt(req.params.assignment_id);

    const assignment = await getAssignment(assignment_id);

    return res.status(200).send(assignment);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
    });
  }
};

export const handleGetSubmissions = async (req, res) => {
  try {
    const assignment_id = parseInt(req.params.assignment_id);
    const class_id = parseInt(req.params.class_id);

    const submissions = await getSubmissions(assignment_id, class_id);

    return res.status(200).send(submissions);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
    });
  }
};

export const handleGetSubmission = async (req, res) => {
  try {
    const student_id = parseInt(req.params.student_id);
    const assignment_id = parseInt(req.params.assignment_id);

    const submission = await getSubmission(student_id, assignment_id);

    if (!submission) {
      return res.status(200).send(null);
    }

    return res.status(200).send(submission);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
    });
  }
};

export const handleCreateAssignment = async (req, res) => {
  const { title, description, points, class_id, creator_id } = req.body;

  if (!title || !description || !points || !class_id || !creator_id) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    await createAssignment(title, description, points, class_id, creator_id);

    return res.status(201).json({
      success: true,
      message: "Assignment created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
    });
  }
};

export const handleSubmitAnswer = async (req, res) => {
  const { assignment_id, student_id, answer } = req.body;

  if (!assignment_id || !student_id || !answer) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    await submitAnswer(assignment_id, student_id, answer);

    return res.status(201).json({
      success: true,
      message: "Answer submitted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
    });
  }
};

export const handleSubmitGrade = async (req, res) => {
  const { given_points } = req.body;

  if (!given_points) {
    return res.status(400).json({
      success: false,
      message: "Grade is required",
    });
  }

  try {
    const assignment_completion_id = parseInt(
      req.params.assignment_completion_id
    );

    await submitGrade(given_points, assignment_completion_id);

    return res.status(200).json({
      success: true,
      message: "Grade submitted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
    });
  }
};

export const handleDeleteAssignment = async (req, res) => {
  try {
    const assignment_id = parseInt(req.params.assignment_id);

    await deleteAssignment(assignment_id);

    return res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
    });
  }
};
