import mongoose from "mongoose";
import TaskSchema from "./taskSchema.js";

const fetch = async (userId) => {
  const taskModel = mongoose.model('tasks', TaskSchema);

  const userTasks = await taskModel.find({ userId });

  return userTasks;
}

const create = async (userId, task) => {
  const taskModel = mongoose.model('tasks', TaskSchema);

  const userTasks = await taskModel.find({ userId });

  if (userTasks.length > 0) {
    const createTask = await taskModel.updateOne(
      { userId },
      { $push: { tasks: { _id: new mongoose.Types.ObjectId(), title: task.title, description: task.description, isComplete: false } } }
    )

    return createTask;
  }

  const newUserTasks = {
    userId,
    tasks: [{
      ...task,
      _id: new mongoose.Types.ObjectId(),
      isComplete: false
    }]
  }

  const createdUserTasks = await taskModel.create(newUserTasks)

  return createdUserTasks

}

const remove = async (userId, taskId) => {
  const taskModel = mongoose.model('tasks', TaskSchema);

  const result = await taskModel.updateOne(
    { userId },
    { $pull: { tasks: { "_id": new mongoose.Types.ObjectId(taskId) } } }
  )

  return result;
}

const update = async (userId, task) => {
  const taskModel = mongoose.model('tasks', TaskSchema);

  console.log(userId);
  console.log(task);

  const result = await taskModel.updateOne(
    { userId, "tasks._id": new mongoose.Types.ObjectId(task.id) },
    {
      $set: {
        "tasks.$.title": task.title,
        "tasks.$.description": task.description,
        "tasks.$.isComplete": task.isComplete,
      }
    }
  )

  console.log(result);

  return result;
}

export {
  fetch,
  create,
  remove,
  update
}