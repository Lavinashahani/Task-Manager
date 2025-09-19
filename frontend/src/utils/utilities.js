import moment from "moment";

// Format createdAt date into "Today", "Yesterday", or relative time
export const formatTime = (createdAt) => {
  const now = moment();
  const created = moment(createdAt);

  // if the task was created today
  if (created.isSame(now, "day")) {
    return "Today";
  }

  // if the task was created yesterday
  if (created.isSame(moment().subtract(1, "days"), "day")) {
    return "Yesterday";
  }

  // if created within the last 7 days
  if (created.isAfter(moment().subtract(6, "days"))) {
    return created.fromNow();
  }

  // if item was created within the last 4 weeks (up to 1 month ago)
  if (created.isAfter(moment().subtract(3, "weeks"), "week")) {
    return created.fromNow();
  }

  return created.format("DD/MM/YYYY");
};

// Filter tasks based on priority
export const filteredTasks = (tasks, priority) => {
  switch (priority) {
    case "low":
      return tasks.filter((task) => task.priority === "Low");
    case "medium":
      return tasks.filter((task) => task.priority === "Medium");
    case "high":
      return tasks.filter((task) => task.priority === "High");
    default:
      return tasks;
  }
};

// Get overdue tasks (not completed and due date before today)
export const overdueTasks = (tasks) => {
  const todayDate = moment();
  return tasks.filter(
    (task) => !task.completed && moment(task.dueDate).isBefore(todayDate)
  );
};
