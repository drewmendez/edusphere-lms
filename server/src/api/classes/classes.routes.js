import express from "express";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";
import {
  handleCreateClass,
  handleDeleteClass,
  handleGetClass,
  handleGetClasses,
  handleUpdateClass,
} from "./classes.handlers.js";

export const router = express.Router();

router.get("/:class_id", verifyAuthCookie, handleGetClass);
router.get("/user/:user_id", verifyAuthCookie, handleGetClasses);
router.post("/", verifyAuthCookie, handleCreateClass);
router.delete("/:class_id", verifyAuthCookie, handleDeleteClass);
router.put("/:class_id", verifyAuthCookie, handleUpdateClass);
