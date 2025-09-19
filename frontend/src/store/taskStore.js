import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./authStore.js";

const API_URL = "https://lucidtask-61o9.onrender.com/api/v1";

axios.defaults.withCredentials = true;

export const useTaskStore = create((set, get) => ({
  // State
  tasks: [],
  task: {},
  loading: false,
  isEditing: false,
  activeTask: null,
  modalMode: "",
  profileModal: false,
  priority: "all",

  // Fetch all tasks
  getTasks: async () => {
    const userId = useAuthStore.getState().user?._id;
    if (!userId) return;

    set({ loading: true });
    try {
      const res = await axios.get(`${API_URL}/tasks`);
      set({ tasks: res.data.tasks });
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      set({ loading: false });
    }
  },

  // Fetch single task
  getTask: async (taskId) => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_URL}/task/${taskId}`);
      set({ task: res.data });
    } catch (err) {
      console.error("Error fetching task:", err);
    } finally {
      set({ loading: false });
    }
  },

  // Create task
  createTask: async (taskData) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${API_URL}/task/create`, taskData);
      set((state) => ({ tasks: [...state.tasks, res.data] }));
      toast.success("Task created successfully");
    } catch (err) {
      console.error("Error creating task:", err);
    } finally {
      set({ loading: false });
    }
  },

  // Update task
  updateTask: async (taskData) => {
    set({ loading: true });
    try {
      const res = await axios.patch(
        `${API_URL}/task/${taskData._id}`,
        taskData
      );
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === res.data._id ? res.data : t)),
      }));
      toast.success("Task updated successfully");
    } catch (err) {
      console.error("Error updating task:", err);
    } finally {
      set({ loading: false });
    }
  },

  // Delete task
  deleteTask: async (taskId) => {
    set({ loading: true });
    try {
      await axios.delete(`${API_URL}/task/${taskId}`);
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== taskId),
      }));
      toast.success("Task deleted successfully");
    } catch (err) {
      console.error("Error deleting task:", err);
    } finally {
      set({ loading: false });
    }
  },

  // Modal / editing handlers
  openModalForAdd: () => set({ modalMode: "add", isEditing: true, task: {} }),
  openModalForEdit: (task) =>
    set({ modalMode: "edit", isEditing: true, activeTask: task }),
  closeModal: () =>
    set({
      isEditing: false,
      profileModal: false,
      modalMode: "",
      activeTask: null,
      task: {},
    }),
  openProfileModal: () => set({ profileModal: true }),
  setPriority: (priority) => set({ priority }),
  handleInput: (name, value) => {
    if (name === "setTask") set({ task: value });
    else set((state) => ({ task: { ...state.task, [name]: value } }));
  },

  // Derived states
  completedTasks: () => {
    const tasks = get().tasks || [];
    return tasks.filter((t) => t.completed === true);
  },

  activeTasks: () => {
    const tasks = get().tasks || [];
    return tasks.filter((t) => t.completed === false);
  },
}));

// // Optional: React to user login to auto-fetch tasks

// useAuthStore.subscribe(
//   (user) => {
//     if (user?._id) {
//       const { tasks, getTasks } = useTaskStore.getState();

//       getTasks(); // fetch only if tasks are empty
//     } else {
//       useTaskStore.setState({ tasks: [] }); // clear tasks on logout
//     }
//   },
//   (state) => state.user
// );
