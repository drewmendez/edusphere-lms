import jwt from "jsonwebtoken";

export const verifyAuthCookie = (req, res, next) => {
  const token = req.cookies.access_token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
  } catch {
    return res.status(401).clearCookie("access_token").json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
};
