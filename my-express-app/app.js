const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const TodoModel = require("./Models/Todo.js");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors(
    {
        origin: ["https://buggy-tracker-frontend.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
));

app.get("/", (req, res) => {
    res.json("hello");
})


// use this one to get local host server
// app.use(cors());


// use this one to get local host server
// mongoose.connect('mongodb://127.0.0.1:27017/todoDB');
mongoose.connect('mongodb+srv://matthewevwalker:Foutin1965@cluster0.q5ywvvo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');




app.get("/get", async (req, res) => {
    try {
        const todos = await TodoModel.find({});
        res.json(todos);
    } catch (err) {
        console.error("Error getting todos:", err);
        res.status(500).json({ error: "Error getting todos" });
    }
});

// app.put("/edit/:id", async (req, res) => {
//     const {id} = req.params;
//     TodoModel.findById(id, (err, todo) => {{id: id}}, {done: true}).then((result) => res.json(result))
//     .catch((err) => console.log(err));
//     console.log(id);
// })

app.delete("/delete/:id", async (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
    console.log(id);
})

    // try {
    //     const id = req.body.id;
    //     const todo = await Todo
    //     Model.findById(id);
    //     todo.done = !todo.done;
    //     await todo.save();
    //     res.json(todo);
    // } catch (err) {
    //     console.error("Error editing todo:", err);
    //     res.status(500).json({ error: "Error editing todo" });
    // }


app.post("/add", async (req, res) => {
    try {
        const date = req.body.date;
        const task = req.body.task;

        const color = req.body.color;
        const address = req.body.address;
        console.log(req.body);

        const newTodo = await TodoModel.create({ date: date, task: task, color: color,  address: address });
        res.json(newTodo); // Send the newly created todo as response
    } catch (err) {
        console.error("Error adding new task:", err);
        res.status(500).json({ error: "Error adding new task" });
    }
});


// app.post("/add", async (req, res) => {
//     try {
//         // const task = req.body.task;
//         // const address = req.body.address;
//         // console.log(req.body);

//         TodoModel.create(req.body).then((result) => res.json(Todo))
//         // Send the newly created todo as response
//     } catch (err) {
//         console.error("Error adding new task:", err);
//         res.status(500).json({ error: "Error adding new task" });
//     }
// });


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});