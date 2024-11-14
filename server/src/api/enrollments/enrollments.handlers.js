import {
  getEnrollments,
  getClassId,
  getStudentsInClass,
  enrollToClass,
} from "./enrollments.services.js";

export const handleGetStudentsInClass = async (req, res) => {
  try {
    const class_id = parseInt(req.params.class_id);

    const students = await getStudentsInClass(class_id);

    return res.status(200).send(students);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};

export const handleEnrollToClass = async (req, res) => {
  const { class_code } = req.body;

  if (!class_code) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const student_id = parseInt(req.params.student_id);

    // TODO: refactor later for more readability
    const class_id = await getClassId(class_code);

    if (!class_id) {
      return res.status(404).json({
        success: false,
        message: "No class found",
      });
    }

    const result = await getEnrollments(student_id);

    const enrollments = result.map((item) => item.class_id);

    if (enrollments.includes(class_id.class_id)) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this class",
      });
    }

    await enrollToClass(student_id, class_id.class_id);

    return res.status(200).json({
      success: true,
      message: "You enrolled successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};
