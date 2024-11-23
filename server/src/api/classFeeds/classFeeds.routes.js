import express from "express";
import { handleGetClassFeeds } from "./classFeeds.handlers.js";

export const router = express.Router();

router.get("/:class_id", handleGetClassFeeds);
