import { getStudentsInClass } from "./enrollments.services.js";

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
