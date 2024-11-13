import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// route imports
import { router as authRoute } from "./src/api/auth/auth.routes.js";
import { router as classesRoute } from "./src/api/classes/classes.routes.js";
import { router as enrollmentsRoute } from "./src/api/enrollments/enrollments.routes.js";

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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
