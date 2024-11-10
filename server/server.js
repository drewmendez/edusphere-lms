import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

// initializations
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
