import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// route imports
import { router as authRoute } from "./src/api/auth/auth.routes.js";

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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
