import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// import routes
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/task", taskRoutes);

export { app };
