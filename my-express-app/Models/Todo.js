const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    date: String,
    task: String,
    color: String,
    address: String
})

const TodoModel = mongoose.model("Todo", TodoSchema)
module.exports = TodoModel
