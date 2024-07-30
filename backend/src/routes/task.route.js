import { Router } from "express";
import { createTask, getTasksByUser, getTaskById } from "../controllers/task.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createTask").post(verifyJwt, createTask);
router.route("/getTaskByUser").get(verifyJwt, getTasksByUser)
router.route("/getTaskById").get(verifyJwt, getTaskById);


export default router;