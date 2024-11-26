import {
  createUser,
  getCurrentUser,
  getUserData,
  isEmailRegistered,
} from "./auth.services.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const handleSignUp = async (req, res) => {
  const { firstname, lastname, role, email, password } = req.body;

  if (!firstname || !lastname || !role || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    if (await isEmailRegistered(email)) {
      return res.status(400).json({
        success: false,
        error: "email",
        message: "This email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    await createUser(firstname, lastname, role, email, hashedPassword);

    return res.status(201).json({
      success: true,
      message: "Registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

export const handleSignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const userData = await getUserData(email);

    if (!userData) {
      return res.status(400).json({
        success: false,
        error: "email",
        message: "No user found",
      });
    }

    if (!(await bcrypt.compare(password, userData.password))) {
      return res.status(400).json({
        success: false,
        error: "password",
        message: "Wrong password",
      });
    }

    const user = {
      user_id: userData.user_id,
      role: userData.role,
    };

    const token = jwt.sign(user, process.env.JWT_SECRET_KEY);

    return res
      .status(200)
      .cookie("access_token", token, {
        sameSite: "None",
        secure: true,
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Signed in successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
    });
  }
};

export const handleSignOut = async (req, res) => {
  res.status(200).clearCookie("access_token").json({
    success: true,
    message: "Signed out successfully",
  });
};

export const handleGetCurrentUser = async (req, res) => {
  const { user_id } = req.user;

  try {
    const currentUser = await getCurrentUser(user_id);

    return res.status(200).send(currentUser);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error " + error.message,
    });
  }
};
