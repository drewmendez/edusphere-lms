import {
  getEnrollment,
  getClassId,
  enrollToClass,
  unenrollToClass,
} from "./enrollments.services.js";

export const handleEnrollToClass = async (req, res) => {
  const { student_id, class_code } = req.body;

  if (!class_code) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const class_result = await getClassId(class_code);

    if (!class_result) {
      return res.status(404).json({
        success: false,
        message: "No class found",
      });
    }

    const enrollment = await getEnrollment(student_id, class_result.class_id);

    if (enrollment) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this class",
      });
    }

    await enrollToClass(student_id, class_result.class_id);

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

export const handleUnenrollToClass = async (req, res) => {
  try {
    const student_id = parseInt(req.params.student_id);
    const class_id = parseInt(req.params.class_id);

    await unenrollToClass(student_id, class_id);

    return res.status(200).json({
      success: true,
      message: "You unenrolled successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};
