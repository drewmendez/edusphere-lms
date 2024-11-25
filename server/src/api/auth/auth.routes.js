import express from "express";
import {
  handleGetCurrentUser,
  handleSignIn,
  handleSignOut,
  handleSignUp,
} from "./auth.handlers.js";
import { verifyAuthCookie } from "../../middlewares/verifyAuthCookie.js";

const router = express.Router();

router.get("/current-user", verifyAuthCookie, handleGetCurrentUser);

router.post("/sign-in", handleSignIn);
router.post("/sign-up", handleSignUp);
router.post("/sign-out", verifyAuthCookie, handleSignOut);

export { router as authRoute };
