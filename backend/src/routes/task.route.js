import { Router } from "express";
import { createTask } from "../controllers/task.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createTask").post(verifyJwt, createTask);

export default router;