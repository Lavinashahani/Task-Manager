import { useTaskStore } from "../store/taskStore";
import useDetectOutside from "../hooks/useDetectOutside";
import { useEffect, useRef } from "react";
import { arrowDown } from "../utils/Icons";

const Modal = () => {
  const {
    task,
    handleInput,
    createTask,
    isEditing,
    closeModal,
    modalMode,
    activeTask,
    updateTask,
  } = useTaskStore();

  const ref = useRef(null);

  // Close modal if user clicks outside
  useDetectOutside({
    ref,
    callback: () => {
      if (isEditing) {
        closeModal();
      }
    },
  });

  useEffect(() => {
    if (modalMode === "edit" && activeTask) {
      handleInput("setTask", activeTask);
    }
  }, [modalMode, activeTask, handleInput]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === "edit") {
      updateTask(task);
    } else if (modalMode === "add") {
      createTask(task);
    }
    closeModal();
  };

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
      <form
        className="scrollbar-hidden py-5 px-6 max-w-[520px] w-full h-[90%] flex flex-col gap-3 overflow-y-auto bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
        onSubmit={handleSubmit}
        ref={ref}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            className="bg-[#F9F9F9] p-2 rounded-md border"
            type="text"
            id="title"
            placeholder="Task Title"
            name="title"
            value={task.title || ""}
            onChange={(e) => handleInput("title", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="bg-[#F9F9F9] p-2 rounded-md border resize-none"
            name="description"
            placeholder="Task Description"
            rows={4}
            value={task.description || ""}
            onChange={(e) => handleInput("description", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="priority">Select Priority</label>
          <div className="relative">
            <select
              id="priority"
              className="w-full cursor-pointer bg-[#F9F9F9]  p-2 border rounded-md appearance-none"
              name="priority"
              value={task.priority || "low"}
              onChange={(e) => handleInput("priority", e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <span className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
              {arrowDown}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            className="bg-[#F9F9F9] p-2 rounded-md border"
            type="date"
            name="dueDate"
            value={
              task.dueDate
                ? new Date(task.dueDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => handleInput("dueDate", e.target.value)}
          />
        </div>

        <div className=" flex flex-col gap-1">
          <label htmlFor="completed">Task Completed</label>
          <div className="relative">
            <select
              id="completed"
              className="w-full cursor-pointer bg-[#F9F9F9]  p-2 border rounded-md appearance-none"
              name="completed"
              value={task.completed ? "true" : "false"}
              onChange={(e) =>
                handleInput("completed", e.target.value === "true")
              }
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
            <span className=" absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
              {arrowDown}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className={`text-white py-2 rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out ${
              modalMode === "edit" ? "bg-blue-400" : "bg-green-400"
            }`}
          >
            {" "}
            {modalMode === "edit" ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
