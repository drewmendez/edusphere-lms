import {
  generateClassCode,
  generateRandomBannerColor,
} from "../../utils/helpers.js";
import {
  createClass,
  deleteClass,
  getClassesForTeacherRole,
  updateClass,
} from "./classes.services.js";

export const handleGetClasses = async (req, res) => {
  const role = req.user.role;

  try {
    const teacher_id = parseInt(req.params.user_id);

    if (role === "teacher") {
      const classes = await getClassesForTeacherRole(teacher_id);

      return res.status(200).json(classes);
    }

    // TODO: get classes for student role
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};

export const handleCreateClass = async (req, res) => {
  const { class_subject, class_section } = req.body;

  if (!class_subject || !class_section) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const teacher_id = parseInt(req.params.teacher_id);
    const class_code = generateClassCode();
    const banner_color = generateRandomBannerColor();

    await createClass(
      class_subject,
      class_code,
      banner_color,
      class_section,
      teacher_id
    );

    return res.status(201).json({
      success: true,
      message: "Class created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};

export const handleDeleteClass = async (req, res) => {
  try {
    const class_id = parseInt(req.params.class_id);

    await deleteClass(class_id);

    return res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};

export const handleUpdateClass = async (req, res) => {
  const { class_subject, class_section } = req.body;

  if (!class_subject || !class_section) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const class_id = parseInt(req.params.class_id);

    await updateClass(class_id, class_subject, class_section);

    return res.status(200).json({
      success: true,
      message: "Class updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};
