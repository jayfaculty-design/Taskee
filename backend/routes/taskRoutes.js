const express = require("express");
const verifyToken = require("../middlewares/verifyToken")
const router = express.Router();

// adding new task
router.post("/add-task", verifyToken, (req, res) => {
    const userId = req.user.id;

})

module.exports = router;