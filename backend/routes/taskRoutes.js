const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const db = require("../config/db");
const router = express.Router();

// adding new task
router.post("/add-task", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { title, description, priority, due_date } = req.body;
  try {
    const user = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    if (user.rows.length < 1)
      return res.status(403).json({
        message: "Unauthorized User",
      });

    const addedTasks = await db.query(
      `INSERT INTO tasks (title, description, due_date, user_id, priority) 
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, due_date, userId, priority]
    );
    res.status(200).json({
      message: "Task added Successfuly",
      task: addedTasks.rows[0],
    });
  } catch (error) {
    console.error("Error adding new task", error);
    res.status(500).json({
      message: "Error adding taks",
    });
  }
});

// See all Tasks
router.get("/all-tasks", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const checkUser = await db.query(`SELECT * FROM users WHERE id = $1`, [
      userId,
    ]);
    if (checkUser.rows.length < 1) {
      return res.status(403).json({
        message: "Unauthorized user",
      });
    }

    const getTasks = await db.query(`SELECT * FROM tasks WHERE user_id = $1`, [
      userId,
    ]);
    res.status(200).json({
      message: "Tasks successfully fetched",
      user: req.user.email,
      tasksCount: getTasks.rows.length,
      tasks: getTasks.rows,
    });
  } catch (error) {
    console.error("Error getting tasks", error);
    res.status(500).json({
      message: "Error getting tasks",
    });
  }
});

// update task details
router.put("/edit-task/:id", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;
  const { title, description, priority, due_date } = req.body;

  try {
    const checkUser = await db.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    const checkTasks = await db.query(
      `SELECT * FROM tasks WHERE id = $1 AND user_id = $2`,
      [taskId, userId]
    );

    if (checkUser.rows.length < 1)
      return res.status(401).json({
        message: "Unauthorized user",
      });

    if (checkTasks.rows.length < 1) {
      return res.status(403).json({
        message: "Task does not exist",
      });
    }

    const updatedTask = await db.query(
      `
      UPDATE tasks
      SET 
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      priority = COALESCE($3, priority),
      due_date = COALESCE($4, due_date)
      WHERE user_id = $5 AND id = $6
      RETURNING *
      `,
      [title, description, priority, due_date, userId, taskId]
    );

    res.status(200).json({
      message: "Task updated Successfully",
      user: req.user.email,
      updatedTask: updatedTask.rows[0],
    });
  } catch (error) {
    console.error("Error in updating task");
    res.status(500).json({
      message: "Error updating task",
    });
  }
});

// mark complete
router.put("/mark-complete/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params.id;
    const completed = "completed";
    const response = await db.query(`SELECT * FROM users WHERE id = $1`, [
      userId,
    ]);
    if (response.rows.length === 0)
      return res.status(500).json({
        message: "Unauthorized user",
      });

    const result = await db.query(
      `
      UPDATE tasks
      SET status = $1
      WHERE user_id = $2 AND id = $3
      `,
      [completed, userId, id]
    );
    res.status(200).json({
      message: "Marked completed",
      task: result.rows[0],
    });
  } catch (error) {
    console.error("Error in marking task complete", error);
    res.status(503).json({
      message: "Something went wrong, error",
    });
  }
});

// delete a task
router.delete("/delete-task/:id", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;
  try {
    const checkUser = await db.query(`SELECT * FROM users WHERE id = $1`, [
      userId,
    ]);
    const checkTasks = await db.query(
      `SELECT * FROM tasks WHERE id = $1 AND user_id = $2`,
      [taskId, userId]
    );
    const user = checkUser.rows;
    if (user.length < 1)
      return res.status(403).json({
        message: "Unauthorized user",
      });

    if (checkTasks.rows.length < 1)
      return res.status(401).json({
        message: "Task does not exist",
      });

    const deletdTask = await db.query(
      `DELETE FROM tasks
       WHERE id = $1 AND user_id = $2
       RETURNING *
      `,
      [taskId, userId]
    );
    res.status(200).json({
      message: "Task deleted successfully",
      user: req.user.email,
      deletdTask: deletdTask.rows[0],
    });
  } catch (error) {
    console.error("Error deleting task", error);
    res.status(500).json({
      message: "Error deleting task",
    });
  }
});

module.exports = router;
