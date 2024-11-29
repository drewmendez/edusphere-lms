import express from "express";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";
import {
  handleCreateAssignment,
  handleDeleteAssignment,
  handleGetAssignment,
  handleGetAssignments,
  handleGetAssignmentsInClass,
  handleGetAssignmentSubmissionData,
  handleGetSubmission,
  handleGetSubmissions,
  handleSubmitAnswer,
  handleSubmitGrade,
} from "./assignments.handlers.js";

const router = express.Router();

router.get("/user/:user_id", verifyAuthCookie, handleGetAssignments);
router.get("/class/:class_id", verifyAuthCookie, handleGetAssignmentsInClass);
router.get("/:assignment_id", verifyAuthCookie, handleGetAssignment);
router.get(
  "/:assignment_id/:class_id/submission-data",
  verifyAuthCookie,
  handleGetAssignmentSubmissionData
);
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

router.patch(
  "/submissions/:assignment_completion_id",
  verifyAuthCookie,
  handleSubmitGrade
);

router.delete("/:assignment_id", verifyAuthCookie, handleDeleteAssignment);

export { router as assignmentsRoute };
