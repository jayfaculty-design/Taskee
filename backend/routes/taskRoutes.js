const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const db = require("../config/db");
const router = express.Router();

// adding new task
router.post("/add-task", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { title, description, due_date, completed } = req.body;
  try {
    const user = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    if (user.rows.length < 1)
      return res.status(403).json({
        message: "Unauthorized User",
      });

    const addedTasks = await db.query(
      `INSERT INTO tasks (title, description, due_date, completed, user_id) 
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, due_date, completed || false, userId]
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

module.exports = router;
