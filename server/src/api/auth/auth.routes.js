import express from "express";
import {
  handleGetCurrentUser,
  handleSignIn,
  handleSignOut,
  handleSignUp,
} from "./auth.handlers.js";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";

export const router = express.Router();

router.post("/sign-in", handleSignIn);
router.post("/sign-up", handleSignUp);
router.post("/sign-out", verifyAuthCookie, handleSignOut);
router.get("/current-user", verifyAuthCookie, handleGetCurrentUser);
