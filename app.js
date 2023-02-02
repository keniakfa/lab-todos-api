import express from 'express';
import connectDB from './config/db.connection.js';
import Todo from "./models/Todo.model.js"
import cors from "cors"

const PORT = 3001

connectDB()

const app = express();


app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.send("Welcome!")
})

app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find({})
        res.status(200).json(todos)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Server error"})
    }
})

app.post("/create", async (req, res) => {
    try {
        const newTodo = await Todo.create(req.body)
        res.status(201).json(newTodo)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Error while creating a todo"})
    }
})

app.put("/todos/:id", async (req, res) => {
    try {
        const payload = req.body
        const { id } = req.params
        const updatedTodo = await Todo.findOneAndUpdate({_id: id}, payload, {new: true})

        res.status(200).json(updatedTodo)  
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Error while updating a todo"})
    }
})

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        await Todo.findOneAndDelete({_id: id})

        res.status(204).json()  
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Server error"})
    }
})

app.listen(PORT, () => console.log("Server listening on port", PORT));