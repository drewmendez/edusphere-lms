export const getRole = async (req, res, next) => {
  const role = req.user.role;
  req.role = role;
  next();
};
