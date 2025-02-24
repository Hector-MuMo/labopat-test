import * as TaskModels from "../models/index.js"

const createTask = async (userId, task) => {
  try {
    const newTask = await TaskModels.create(userId, task);
    return newTask

  } catch (error) {
    console.log('Cant create task', error);
  }
}

const getTasks = async (userId) => {
  try {
    const userTasks = await TaskModels.fetch(userId);
    return userTasks;
  } catch (error) {
    console.log('Cant get tasks', error);

  }
}

const deleteTasks = async (userId, taskId) => {
  try {
    const result = await TaskModels.remove(userId, taskId);
    return result;
  } catch (error) {
    console.log('Cant delete tasks', error);

  }
}

const updateTasks = async (userId, task) => {
  try {
    const result = await TaskModels.update(userId, task);
    return result;
  } catch (error) {
    console.log('Cant update tasks', error);

  }
}

export {
  getTasks,
  createTask,
  deleteTasks,
  updateTasks
}