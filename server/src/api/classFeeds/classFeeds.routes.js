import express from "express";
import { handleGetClassFeeds } from "./classFeeds.handlers.js";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";

export const router = express.Router();

router.get("/:class_id", verifyAuthCookie, handleGetClassFeeds);
