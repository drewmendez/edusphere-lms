import express from "express";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";
import {
  handleCreateClass,
  handleDeleteClass,
  handleGetClass,
  handleGetClasses,
  handleGetPeopleInClass,
  handleUpdateClass,
} from "./classes.handlers.js";

const router = express.Router();

router.get("/", verifyAuthCookie, handleGetClasses);
router.get("/:class_id", verifyAuthCookie, handleGetClass);
router.get("/people/:class_id", verifyAuthCookie, handleGetPeopleInClass);

router.post("/", verifyAuthCookie, handleCreateClass);

router.delete("/:class_id", verifyAuthCookie, handleDeleteClass);

router.put("/:class_id", verifyAuthCookie, handleUpdateClass);

export { router as classesRoute };
