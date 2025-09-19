import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: "New Title", trim: true },
    description: { type: String, default: "No Description" },
    dueDate: { type: Date, default: Date.now() },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", taskSchema);
export default TaskModel;
