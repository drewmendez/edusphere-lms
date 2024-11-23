import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// route imports
import { router as authRoute } from "./src/api/auth/auth.routes.js";
import { router as classesRoute } from "./src/api/classes/classes.routes.js";
import { router as enrollmentsRoute } from "./src/api/enrollments/enrollments.routes.js";
import { router as usersRoute } from "./src/api/users/users.routes.js";
import { router as announcementsRoute } from "./src/api/announcements/announcements.routes.js";
import { router as assignmentsRoute } from "./src/api/assignments/assignments.routes.js";

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
app.use("/users", usersRoute);
app.use("/announcements", announcementsRoute);
app.use("/assignments", assignmentsRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
