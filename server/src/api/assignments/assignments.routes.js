import express from "express";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";
import {
  handleCreateAssignment,
  handleGetAssignmentsInClass,
} from "./assignments.handlers.js";

export const router = express.Router();

router.get("/:class_id", verifyAuthCookie, handleGetAssignmentsInClass);
router.post("/", verifyAuthCookie, handleCreateAssignment);
