const express = require("express")
const cors = require("cors")
const verifyToken = require("./middlewares/verifyToken")
const userRoutes = require("./routes/usersRoutes")

const app = express()
const PORT = 5000

// middlewares
app.use(cors())
app.use(express.json())

//routes
app.use("/auth", userRoutes)

app.get("/", (req, res) => {
    res.send("Welcome to the Task Manager Server")
})
app.get("/protected-routes", verifyToken, (req, res) => {
    res.json({
        message: `Hi, welcome`,
        your_email: req.user.email,
    })
})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})