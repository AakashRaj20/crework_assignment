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

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/task", taskRoutes);

app.get("/", (req, res) => {
  const token = req.cookies
  console.log(token)
  res.send("Hello World");
})

export { app };
