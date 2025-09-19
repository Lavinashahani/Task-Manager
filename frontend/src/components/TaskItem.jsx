import React from "react";
import { motion } from "framer-motion";

import { useTaskStore } from "../store/taskStore";
import { edit, star, trash } from "../utils/Icons";
import { formatTime } from "../utils/utilities.js";
import { item } from "../utils/animations.jsx";

const TaskItem = ({ task }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Low":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "High":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const { getTasks, openModalForEdit, deleteTask } = useTaskStore();

  return (
    <motion.div
      className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white"
      variants={item}
    >
      <div>
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-2xl">{task.title}</h4>
          <span className="text-sm text-gray-400">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
        <p>{task.description}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm font-medium text-gray-400">
          {formatTime(task.createdAt)}
        </p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
        <div>
          <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
            <button
              className={`${
                task.completed ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              {star}
            </button>

            {/* Edit button */}
            <button
              className="text-[#00A1F1]"
              onClick={() => {
                getTasks(task._id);
                openModalForEdit(task);
              }}
            >
              {edit}
            </button>

            {/* Delete button */}
            <button
              className="text-[#F65314]"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              {trash}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
