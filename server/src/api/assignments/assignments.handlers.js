import {
  createAssignment,
  deleteAssignment,
  getAssignment,
  getAssignmentsInClass,
  getSubmission,
  getSubmissions,
  submitAnswer,
} from "./assignments.services.js";

export const handleGetAssignmentsInClass = async (req, res) => {
  try {
    const class_id = parseInt(req.params.class_id);

    const result = await getAssignmentsInClass(class_id);

    const assignments = result.map((item) => ({
      ...item,
      created_at: new Intl.DateTimeFormat("en-US", {
        weekday: "short", // Short weekday, e.g., "Sat"
        year: "numeric", // Four-digit year
        month: "short", // Short month, e.g., "Nov"
        day: "2-digit", // Two-digit day
        hour: "numeric", // Hour
        minute: "2-digit", // Two-digit minutes
        hour12: true,
      }).format(item.created_at),
    }));

    return res.status(200).send(assignments);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};

export const handleGetAssignment = async (req, res) => {
  try {
    const assignment_id = parseInt(req.params.assignment_id);

    const result = await getAssignment(assignment_id);

    const assignment = {
      assignment_id: result.assignment_id,
      title: result.title,
      description: result.description,
      created_at: new Intl.DateTimeFormat("en-US", {
        weekday: "short", // Short weekday, e.g., "Sat"
        year: "numeric", // Four-digit year
        month: "short", // Short month, e.g., "Nov"
        day: "2-digit", // Two-digit day
        hour: "numeric", // Hour
        minute: "2-digit", // Two-digit minutes
        hour12: true,
      }).format(result.created_at),
      creator: `${result.firstname} ${result.lastname}`,
    };

    return res.status(200).send(assignment);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};

export const handleCreateAssignment = async (req, res) => {
  const { title, description, class_id, creator_id } = req.body;

  if (!title || !description || !class_id || !creator_id) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    await createAssignment(title, description, class_id, creator_id);

    return res.status(201).json({
      success: true,
      message: "Assignment created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
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
      message: "Server error " + error,
    });
  }
};

export const handleGetSubmissions = async (req, res) => {
  try {
    const assignment_id = parseInt(req.params.assignment_id);
    const class_id = parseInt(req.params.class_id);

    const result = await getSubmissions(assignment_id, class_id);

    const submissions = result.map((item) => ({
      ...item,
      submitted_at: item.submitted_at
        ? new Intl.DateTimeFormat("en-US", {
            weekday: "short", // Short weekday, e.g., "Sat"
            year: "numeric", // Four-digit year
            month: "short", // Short month, e.g., "Nov"
            day: "2-digit", // Two-digit day
            hour: "numeric", // Hour
            minute: "2-digit", // Two-digit minutes
            hour12: true,
          }).format(item.submitted_at)
        : null,
    }));

    return res.status(200).send(submissions);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};

export const handleGetSubmission = async (req, res) => {
  try {
    const student_id = parseInt(req.params.student_id);
    const assignment_id = parseInt(req.params.assignment_id);

    const result = await getSubmission(student_id, assignment_id);

    if (!result) {
      return res.status(200).send(null);
    }

    const submission = {
      ...result,
      submitted_at: new Intl.DateTimeFormat("en-US", {
        weekday: "short", // Short weekday, e.g., "Sat"
        year: "numeric", // Four-digit year
        month: "short", // Short month, e.g., "Nov"
        day: "2-digit", // Two-digit day
        hour: "numeric", // Hour
        minute: "2-digit", // Two-digit minutes
        hour12: true,
      }).format(result.submitted_at),
    };

    return res.status(200).send(submission);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
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
      message: "Server error " + error,
    });
  }
};
