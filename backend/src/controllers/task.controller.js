import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/task.model.js";

// create task
export const createTask = asyncHandler(async (req, res) => {
  const { title, status, priority, deadline, description } = req.body;
  const userId = req.user._id;

  if (!title || !status) {
    throw new ApiError(400, "Title and status are required");
  }

  if (!userId) {
    throw new ApiError(400, "User id is required");
  }

  const task = new Task({
    title,
    status,
    priority,
    deadline,
    description,
    owner: userId,
  });

  await task.save();

  res.status(201).json(new ApiResponse(201, task));
});

// get all tasks by user
export const getTasksByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const tasks = await Task.find({ owner: userId });

  res.status(200).json(new ApiResponse(200, tasks));
});

// get task by id
export const getTaskById = asyncHandler(async (req, res) => {
  const taskId = req.query.taskId;

  if (!taskId) {
    throw new ApiError(400, "Task id is required");
  }

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  res.status(200).json(new ApiResponse(200, task));
});

// update task by id
export const updateTaskById = asyncHandler(async (req, res) => {
  const taskId = req.query.taskId;
  const userId = req.user._id;

  if (!taskId) {
    throw new ApiError(400, "Task id is required");
  }

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to update this task");
  }

  const { title, status, priority, deadline, description } = req.body;

  task.title = title || task.title;
  task.status = status || task.status;
  task.priority = priority || task.priority;
  task.deadline = deadline || task.deadline;
  task.description = description || task.description;

  await task.save();

  res.status(200).json(new ApiResponse(200, task));
});

// delete task by id
export const deleteTaskById = asyncHandler(async (req, res) => {
  const taskId = req.query.taskId;
  const userId = req.user._id;

  if (!taskId) {
    throw new ApiError(400, "Task id is required");
  }

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (task.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this task");
  }

  await task.deleteOne();

  res.status(200).json(new ApiResponse(200, "Task deleted successfully"));
});
