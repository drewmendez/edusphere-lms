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
  const { user_id, role } = req.user;

  try {
    if (role === "teacher") {
      const classes = await getClassesForTeacherRole(user_id);

      return res.status(200).json(classes);
    } else {
      const classes = await getClassesForStudentRole(user_id);

      return res.status(200).json(classes);
    }
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

    const classData = await getClass(class_id);

    return res.status(200).send(classData);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
    });
  }
};

export const handleGetPeopleInClass = async (req, res) => {
  try {
    const class_id = parseInt(req.params.class_id);

    const people = await getPeopleInClass(class_id);

    return res.status(200).send(people);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
    });
  }
};

export const handleCreateClass = async (req, res) => {
  const { class_subject, class_section } = req.body;
  const teacher_id = req.user.user_id;

  if (!class_subject || !class_section) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    await createClass(class_subject, class_section, teacher_id);

    return res.status(201).json({
      success: true,
      message: "Class created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
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
      message: "Server error " + error.message,
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
      message: "Server error " + error.message,
    });
  }
};
