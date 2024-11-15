import express from "express";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";
import {
  handleEnrollToClass,
  handleGetStudentsInClass,
  handleUnenrollToClass,
} from "./enrollments.handlers.js";

export const router = express.Router();

router.get("/:class_id", verifyAuthCookie, handleGetStudentsInClass);
router.post("/:student_id", verifyAuthCookie, handleEnrollToClass);
router.delete("/", verifyAuthCookie, handleUnenrollToClass);
