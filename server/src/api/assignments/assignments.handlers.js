import {
  createAssignment,
  getAssignmentsInClass,
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
