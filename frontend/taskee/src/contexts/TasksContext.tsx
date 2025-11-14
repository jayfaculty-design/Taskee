import axios from "axios";
import { createContext, useState, type PropsWithChildren } from "react";

export const TasksContext = createContext(null);

export const TaskProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

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

      console.log("Returned task:", data.task);
      console.log("Current tasks:", tasks);

      setTodos((prevTasks) => [...prevTasks, data.task]);
      return { success: true, message: data.message, task: data.task };
    } catch (error: any) {
      console.error("Error occured, try again", error);
      const errorMessage =
        error.response?.data?.message || "Error occured, cannot add task";

      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }

  // mark complete

  const markComplete = async (id: number, updates: any) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:5000/tasks/mark-complete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setTodos((prevTask) =>
        prevTask.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        )
      );
      return { success: true, message: data.message };
    } catch (error: any) {
      console.error("Error occured, try again", error);
      const errorMessage = error.response?.data?.message || "Error occured";

      return { success: false, message: errorMessage };
    }
  };

  async function marksTaskComplete(id: number) {
    return await markComplete(id, {
      status: "completed",
    });
  }

  // deleteTodo
  async function deleteTask(id: number) {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:5000/tasks/delete-task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      setTodos((prevTask) =>
        prevTask.filter((task: { id: number }) => task.id !== id)
      );
      return { success: true, message: data.message };
    } catch (error: any) {
      console.error("Something went wrong..", error);
      const errorMessage =
        error.response?.data?.message || "Error deleting task";
      return { success: false, message: errorMessage };
    }
  }

  // edit task
  async function editTask(taskId: number, updates: any) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/tasks/edit-task/${taskId}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;

      setTodos((prevTasks) => {
        const updated = prevTasks.map((task) => {
          const matches = task.id === taskId;
          if (matches) {
            const merged = { ...task, ...data.updatedTask };
            return merged;
          }
          return task;
        });

        return updated;
      });

      return { success: true, message: data.message };
    } catch (error: any) {
      console.error("Something went wrong..", error);
      const errorMessage =
        error.response?.data?.message || "Error updating task";
      return { success: false, message: errorMessage };
    }
  }

  return (
    <TasksContext.Provider
      value={{
        fetchTasks,
        tasks,
        loading,
        addTask,
        marksTaskComplete,
        deleteTask,
        editTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
