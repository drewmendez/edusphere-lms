import {
  getClassId,
  enrollToClass,
  unenrollToClass,
  isAlreadyEnrolled,
} from "./enrollments.services.js";

export const handleEnrollToClass = async (req, res) => {
  const { class_code } = req.body;
  const student_id = req.user.user_id;

  if (!class_code) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const class_id = await getClassId(class_code);

    if (!class_id) {
      return res.status(404).json({
        success: false,
        message: "No class found",
      });
    }

    if (await isAlreadyEnrolled(student_id, class_id)) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this class",
      });
    }

    await enrollToClass(student_id, class_id);

    return res.status(200).json({
      success: true,
      message: "You enrolled successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
    });
  }
};

export const handleUnenrollToClass = async (req, res) => {
  try {
    const student_id = req.user.user_id;
    const class_id = parseInt(req.params.class_id);

    await unenrollToClass(student_id, class_id);

    return res.status(200).json({
      success: true,
      message: "You unenrolled successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
    });
  }
};
