import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, max: 255 },
  description: String,
  isComplete: Boolean
})

const TasksSchema = new mongoose.Schema({
  userId: String,
  tasks: [TaskSchema]
}, {
  id: true,
  toJSON: {
    virtuals: true,
    versionKey: true,
  }
})

export default TasksSchema;