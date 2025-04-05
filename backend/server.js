require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect(process.env.DATABASE_URL);

const app = express();
const db = mongoose.connection;
app.use(cors());
app.use(express.json());
db.on("error",(err)=>console.log(err));
db.on("open",()=>console.log("DATABASE CONNECTED"));

const tasRouter = require("./routes/tasks");
app.use("/api/tasks",tasRouter)


app.get("/api/tasks/data", async (req, res) => {
    try {
        const data = await tasks.find();
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Server Error" });
    }
});



app.listen(process.env.PORT,()=>console.log(`server is listening at port ${process.env.PORT}`));