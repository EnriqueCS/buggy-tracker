const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');
const serverless = require('serverless-http');

const app = express();
const port = process.env.PORT || 3001; // Use the environment's port if available or default to 3001

// Middleware setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use(express.json());

// MongoDB connection URI
const mongoUri = 'mongodb+srv://enrique:FBT7Cg6xWQqplMpZ@cluster0.bxqq8tv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

let todosCollection;

client.connect()
  .then(() => {
    console.log('MongoDB connected');
    const database = client.db('test'); // Make sure 'Cluster0' is your database name
    todosCollection = database.collection('todos');
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.get("/api/get", async (req, res) => {
  try {
    const todos = await todosCollection.find({}).toArray();
    res.json(todos);
  } catch (err) {
    console.error("Error getting todos:", err);
    res.status(500).json({ error: "Error getting todos" });
  }
});

app.post("/api/add", async (req, res) => {
  try {
    const { date, task, color, address } = req.body;
    const newTodo = { date, task, color, address };
    const result = await todosCollection.insertOne(newTodo);
    res.json(result.ops[0]); // Send the newly created todo as response
  } catch (err) {
    console.error("Error adding new task:", err);
    res.status(500).json({ error: "Error adding new task" });
  }
});

app.delete("/api/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ error: "Error deleting todo" });
  }
});

app.listen(port, () => {
  console.log(`Server ready on port ${port}.`);
});

module.exports = app; // For serverless deployment