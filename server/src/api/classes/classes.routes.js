import express from "express";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";
import {
  handleCreateClass,
  handleDeleteClass,
  handleGetClasses,
} from "./classes.handlers.js";

export const router = express.Router();

router.get("/:user_id", verifyAuthCookie, handleGetClasses);
router.post("/:teacher_id", verifyAuthCookie, handleCreateClass);
router.delete("/:class_id", verifyAuthCookie, handleDeleteClass);
