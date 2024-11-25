import {
  generateClassCode,
  generateRandomBannerColor,
} from "../../utils/helpers.js";
import {
  createClass,
  deleteClass,
  getClass,
  getClassesForStudentRole,
  getClassesForTeacherRole,
  getPeopleInClass,
  updateClass,
} from "./classes.services.js";

export const handleGetClasses = async (req, res) => {
  const role = req.user.role;

  try {
    const user_id = parseInt(req.params.user_id);

    if (role === "teacher") {
      const classes = await getClassesForTeacherRole(user_id);

      return res.status(200).json(classes);
    } else {
      const result = await getClassesForStudentRole(user_id);
      const classes = result.map((item) => ({
        class_id: item.class_id,
        class_subject: item.class_subject,
        banner_color: item.banner_color,
        class_section: item.class_section,
        class_teacher: `${item.firstname} ${item.lastname}`,
      }));

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

export const handleGetClass = async (req, res) => {
  try {
    const class_id = parseInt(req.params.class_id);

    const result = await getClass(class_id);

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};

export const handleGetPeopleInClass = async (req, res) => {
  try {
    const class_id = parseInt(req.params.class_id);

    const result = await getPeopleInClass(class_id);

    const people = result.map((item) => ({
      user_id: item.user_id,
      user: `${item.firstname} ${item.lastname}`,
      role: item.role,
    }));

    return res.status(200).send(people);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error,
    });
  }
};

export const handleCreateClass = async (req, res) => {
  const { class_subject, class_section, teacher_id } = req.body;

  if (!class_subject || !class_section || !teacher_id) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
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
