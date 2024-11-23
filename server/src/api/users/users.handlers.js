import { getPeopleInClass } from "./users.services.js";

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
