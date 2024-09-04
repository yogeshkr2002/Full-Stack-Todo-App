import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db.js";
import Todo from "./models/Todo.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

// Sync Sequelize models with the database
await sequelize.sync({ force: true });

app.get("/", (req, res) => {
  res.json({ msg: "Home Page" });
});

// Fetch all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching todos" });
  }
});

// Create a new todo
app.post("/todos", async (req, res) => {
  try {
    const { desc, completed } = req.body;
    const newTodo = await Todo.create({
      todo_desc: desc,
      todo_completed: completed,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding the todo" });
  }
});

// Fetch a todo by ID
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    res.json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the todo" });
  }
});

// Update a todo by ID
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { desc, completed } = req.body;
    await Todo.update(
      { todo_desc: desc, todo_completed: completed },
      { where: { id } }
    );
    res.json({ msg: "Todo Updated" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the todo" });
  }
});

// Delete a todo by ID
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.destroy({ where: { id } });
    res.json({ msg: "Todo Deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the todo" });
  }
});

// Delete all todos
app.delete("/todos", async (req, res) => {
  try {
    await Todo.destroy({ where: {}, truncate: true });
    res.json({ msg: "All Todos Deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting all todos" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`);
});
