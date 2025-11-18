const express = require("express");
const cors = require("cors");
const verifyToken = require("./middlewares/verifyToken");
const userRoutes = require("./routes/usersRoutes");
const tasksRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 5000;

const corOptions = {
  origin: ["https://taskee-manager.vercel.app/", "http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// middlewares
app.use(cors(corOptions));
app.use(express.json());

//routes
app.use("/auth", userRoutes);
app.use("/tasks", tasksRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager Server");
});
app.get("/protected-routes", verifyToken, (req, res) => {
  res.json({
    message: `Hi, welcome`,
    your_email: req.user.email,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
