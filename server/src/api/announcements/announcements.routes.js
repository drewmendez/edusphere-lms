import express from "express";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";
import { handleCreateAnnouncement } from "./announcements.handlers.js";

export const router = express.Router();

router.post("/:announcer_id", verifyAuthCookie, handleCreateAnnouncement);
