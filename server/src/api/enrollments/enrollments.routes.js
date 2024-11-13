import express from "express";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";
import { handleGetStudentsInClass } from "./enrollments.handlers.js";

export const router = express.Router();

router.get("/:class_id", verifyAuthCookie, handleGetStudentsInClass);
