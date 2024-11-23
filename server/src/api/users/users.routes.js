import express from "express";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";
import { handleGetPeopleInClass } from "./users.handlers.js";

export const router = express.Router();

router.get("/:class_id", verifyAuthCookie, handleGetPeopleInClass);
