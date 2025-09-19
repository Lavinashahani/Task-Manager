import React from "react";
import { useAuthStore } from "../store/authStore.js";
import { useTaskStore } from "../store/taskStore.js";

const Profile = () => {
  const { user } = useAuthStore();
  const { tasks, activeTasks, completedTasks } = useTaskStore();
  const openTasks = activeTasks();
  const highTasks = tasks.filter((task) => task.priority === "High");
  const doneTasks = completedTasks();

  return (
    <div className="mx-4 mb-4">
      <div
        className="px-2 py-4 flex items-center gap-3 bg-[#E6E6E6]/20 rounded-[0.8rem]
        hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white"
      >
        <div>
          <img
            className=" rounded-full border-2 border-[#E6E6E6]"
            src="../../public/avatar.png"
            height={40}
            width={40}
          />
        </div>
        <div>
          <h1 className="flex text-base">
            <span className=" font-medium">Hello,</span>
            <span className="font-bold">&nbsp;{user?.name}</span>
          </h1>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          {/* total tasks */}
          <div className="text-gray-400">
            <p className="text-sm">Total Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]"></span>
              <span className="font-medium text-3xl text-[#333]">
                {tasks.length}
              </span>
            </p>
          </div>
          {/* in progress tasks */}
          <div className="text-gray-400">
            <p className="text-sm">In Progress:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-[#5c82ff] rounded-[5px]"></span>
              <span className="font-medium text-3xl text-[#333]">
                {openTasks.length}
              </span>
            </p>
          </div>
          {/* high tasks */}
          <div className="text-gray-400">
            <p className="text-sm">High Prior Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-orange-400 rounded-[5px]"></span>
              <span className="font-medium text-3xl text-[#333]">
                {highTasks.length}
              </span>
            </p>
          </div>

          {/* completed tasks */}
          <div className="text-gray-400">
            <p className="text-sm">Completed:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-green-400 rounded-[5px]"></span>
              <span className="font-medium text-3xl text-[#333]">
                {doneTasks.length}
              </span>
            </p>
          </div>
        </div>
      </div>

      <h3 className="mt-7 font-medium">Activity</h3>
    </div>
  );
};

export default Profile;
