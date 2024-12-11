import express from "express";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";
import {
  handleEnrollToClass,
  handleUnenrollToClass,
} from "./enrollments.handlers.js";

const router = express.Router();

router.post("/", verifyAuthCookie, handleEnrollToClass);

router.delete("/:class_id", verifyAuthCookie, handleUnenrollToClass);

export { router as enrollmentsRoute };
