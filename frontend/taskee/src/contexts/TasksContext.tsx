import axios from "axios";
import { createContext, useState, type PropsWithChildren } from "react";

export const TasksContext = createContext(null);

export const TaskProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTodos] = useState([]);

  // fetch tasks
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:5000/tasks/all-tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log("Tasks", data);
      setTodos(data.tasks);
      return { success: true, message: data.message };
    } catch (error: any) {
      console.error("Error fetching todos", error);
      const errorMessage =
        error.response?.data?.message || "Error fetching tasks";
      return { success: false, message: errorMessage };
    }
  };

  // Add Task
  async function addTask(
    title: string,
    description: string,
    priority: string,
    due_date: string,
    completed: string
  ) {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        "http://localhost:5000/tasks/add-task",
        {
          title,
          description,
          priority,
          due_date,
          completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = result.data;
      return { success: true, message: data.message, task: data.task };
    } catch (error: any) {
      console.error("Error occured, try again", error);
      const errorMessage =
        error.response?.data?.message || "Error occured, cannot add task";

      return { success: false, message: errorMessage };
    }
  }

  return (
    <TasksContext.Provider
      value={{
        fetchTasks,
        tasks,
        addTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
