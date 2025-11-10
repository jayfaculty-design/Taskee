const express = require("express");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

// create user accounnt
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkEmails = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    const existingUsername = await pool.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );

    if (checkEmails.rows.length > 1) {
      return res.status(403).json({
        message: "Email already exists",
      });
    }
    if (existingUsername.rows.length > 1) {
      return res.status(403).json({
        message: "Username already taken",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const registerdUser = await db.query(
      `
        INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`,
      [username, email, hashedPassword]
    );

    // generate a token
    const token = jwt.sign(
      {
        username: username,
        email: email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "User registered Sucessfully",
      username: registerdUser.rows[0]?.username,
      token: token,
    });
  } catch (error) {
    console.error("Cannot register user, Error", error);
    res.status(500).json({
      message: "Error in registering user",
    });
  }
});

// login to account
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingEmail = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    if (existingEmail.rows.length === 0) {
      return res.status(403).json({
        message: "Account does not exist!",
      });
    }

    // check if no field is empty
    if (!email || !password) {
      return res.status(403).json({
        message: "Please enter both email and password",
      });
    }

    const getUserEmail = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    const user = getUserEmail.rows[0];

    // compare passwords
    const comparePassword = await bcrypt.compare(password, user.password);

    // generate a token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    if (comparePassword) {
      return res.status(200).json({
        message: "Login successful",
        email: user.email,
        username: user.username,
        token: token,
      });
    } else {
      return res.status(403).json({
        message: "Password does not match!",
      });
    }
  } catch (error) {
    console.error("Error in loggin in: ", error);
    res.status(500).json({
      message: "Cannot login, error",
    });
  }
});

// logout
router.post("/logout", (req, res) => {
  res.status(200).json({
    message: "Logged Out successfully",
  });
});

module.exports = router;
