import express from "express";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";
import {
  handleEnrollToClass,
  handleGetStudentsInClass,
  handleUnenrollToClass,
} from "./enrollments.handlers.js";

export const router = express.Router();

router.get("/:class_id", verifyAuthCookie, handleGetStudentsInClass);
router.post("/", verifyAuthCookie, handleEnrollToClass);
router.delete(
  "/:student_id/:class_id",
  verifyAuthCookie,
  handleUnenrollToClass
);
