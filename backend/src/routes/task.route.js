import { Router } from "express";
import { createTask, getTasksByUser, getTaskById, updateTaskById, deleteTaskById } from "../controllers/task.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createTask").post(verifyJwt, createTask);
router.route("/getTaskByUser").get(verifyJwt, getTasksByUser)
router.route("/getTaskById").get(verifyJwt, getTaskById);
router.route("/updateTask").patch(verifyJwt, updateTaskById);
router.route("/deleteTask").delete(verifyJwt, deleteTaskById);


export default router;