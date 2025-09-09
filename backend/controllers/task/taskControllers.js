import asyncHandler from "express-async-handler";
import TaskModel from "../../models/taskModel.js";
import User from "../../models/userModel.js";

export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.userId,
    });

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User not found!" });
    }

    const tasks = await TaskModel.find({ user: userId });

    res.status(200).json({
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const getTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!task.user.equals(userId)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view this task" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const updateTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { title, description, dueDate, priority, status, completed } =
      req.body;
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (!task.user.equals(userId)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this task" });
    }

    //update the task with new data if provided
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    return res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const task = await TaskModel.findById(id);

    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (!task.user.equals(userId)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this task" });
    }
    await TaskModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
