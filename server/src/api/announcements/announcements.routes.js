import express from "express";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";
import {
  handleCreateAnnouncement,
  handleDeleteAnnouncement,
} from "./announcements.handlers.js";

const router = express.Router();

router.post("/", verifyAuthCookie, handleCreateAnnouncement);

router.delete("/:announcement_id", verifyAuthCookie, handleDeleteAnnouncement);

export { router as announcementsRoute };
