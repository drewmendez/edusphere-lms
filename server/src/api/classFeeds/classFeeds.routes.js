import express from "express";
import { handleGetClassFeeds } from "./classFeeds.handlers.js";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";

const router = express.Router();

router.get("/:class_id", verifyAuthCookie, handleGetClassFeeds);

export { router as classFeedsRoute };
