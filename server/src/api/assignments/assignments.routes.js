import express from "express";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";
import {
  handleCreateAssignment,
  handleDeleteAssignment,
  handleGetAssignment,
  handleGetAssignmentsInClass,
  handleGetSubmission,
  handleGetSubmissions,
  handleSubmitAnswer,
} from "./assignments.handlers.js";

export const router = express.Router();

router.get("/class/:class_id", verifyAuthCookie, handleGetAssignmentsInClass);
router.get("/:assignment_id", verifyAuthCookie, handleGetAssignment);
router.delete("/:assignment_id", verifyAuthCookie, handleDeleteAssignment);
router.get(
  "/submissions/:assignment_id/:class_id",
  verifyAuthCookie,
  handleGetSubmissions
);
router.get(
  "/submissions/student/:student_id/:assignment_id",
  verifyAuthCookie,
  handleGetSubmission
);
router.post("/", verifyAuthCookie, handleCreateAssignment);
router.post("/submissions", verifyAuthCookie, handleSubmitAnswer);
