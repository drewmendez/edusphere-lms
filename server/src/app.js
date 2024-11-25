import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// route imports
import { authRoute } from "./api/auth/auth.routes.js";
import { classesRoute } from "./api/classes/classes.routes.js";
import { enrollmentsRoute } from "./api/enrollments/enrollments.routes.js";
import { announcementsRoute } from "./api/announcements/announcements.routes.js";
import { assignmentsRoute } from "./api/assignments/assignments.routes.js";
import { classFeedsRoute } from "./api/classFeeds/classFeeds.routes.js";

// initializations
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// API routes
app.use("/auth", authRoute);
app.use("/classes", classesRoute);
app.use("/enrollments", enrollmentsRoute);
app.use("/announcements", announcementsRoute);
app.use("/assignments", assignmentsRoute);
app.use("/class-feeds", classFeedsRoute);

export default app;
