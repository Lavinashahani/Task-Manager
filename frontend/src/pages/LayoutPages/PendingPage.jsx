import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";
import { motion } from "framer-motion";

import { useTaskStore } from "../../store/taskStore.js";
import Filters from "../../components/Filters.jsx";
import TaskItem from "../../components/TaskItem.jsx";
import { filteredTasks } from "../../utils/utilities.js";
import { container, item } from "../../utils/animations.jsx";
const PendingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // redirect if user not logged in
    }
  }, [user, navigate]);

  const {
    tasks,
    getTasks,
    activeTasks,
    openModalForAdd,
    priority,
    setPriority,
  } = useTaskStore();

  const pending = activeTasks();
  const filtered = filteredTasks(pending, priority);

  useEffect(() => {
    setPriority("all");
  }, [setPriority]);

  useEffect(() => {
    // Fetch tasks only once when component mounts
    getTasks();
  }, []);
  console.log(tasks);

  return (
    <main className="m-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Pending Tasks</h1>
        <Filters />
      </div>

      <motion.div
        className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((task, i) => (
          <TaskItem key={task._id || i} task={task} />
        ))}

        <motion.button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          onClick={openModalForAdd}
          variants={item}
        >
          Add New Task
        </motion.button>
      </motion.div>
    </main>
  );
};

export default PendingPage;
