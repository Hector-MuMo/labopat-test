import * as TaskServices from "../services/index.js"

const saveTask = async (req, res) => {
  const { userId } = req.body;
  const task = req.body;

  if (!userId) {
    return res.status(400).send({ code: 'bad-request', message: 'User ID is required' });
  }

  if (!task) {
    return res.status(400).send({ code: 'bad-request', message: 'A task must have title, description and status' });
  }

  const result = await TaskServices.createTask(userId, task);

  if (!result) {
    return res.status(500).send({ code: 'internal-server-error', message: 'Failed to create a task. Check service' });
  }

  return res.status(201).send({ message: 'Task created correctly' });
}

const getUserTasks = async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    return res.status(400).send({ code: 'bad-request', message: 'User ID is required' });
  }

  const result = await TaskServices.getTasks(userId);

  if (!result) {
    return res.status(500).send({ code: 'internal-server-error', message: 'Failed to get tasks. Check service' });
  }

  if (result.length > 1 && result[0].tasks.length === 0) {
    return res.status(404).send({ code: 'not-found', message: 'No tasks found for this user' });
  }

  return res.status(200).send({ tasks: result[0].tasks });
}

const deleteUserTasks = async (req, res) => {
  const taskId = req.params.id
  const { userId } = req.body

  if (!userId || !taskId) {
    return res.status(400).send({ code: 'bad-request', message: 'User ID and Taks ID are required' });
  }

  const result = await TaskServices.deleteTasks(userId, taskId);

  if (!result) {
    return res.status(500).send({ code: 'internal-server-error', message: 'Failed to delete a task. Check service' });
  }

  res.status(200).send({ message: 'Task deleted correctly' });
}

const updateUserTasks = async (req, res) => {
  const taskId = req.params.id
  const { userId, title, description, isComplete } = req.body

  const task = {
    id: taskId,
    title,
    description,
    isComplete
  }

  if (!userId || !taskId) {
    return res.status(400).send({ code: 'bad-request', message: 'User ID and Taks ID are required' });
  }

  const result = await TaskServices.updateTasks(userId, task);

  if (!result) {
    return res.status(500).send({ code: 'internal-server-error', message: 'Failed to update a task. Check service' });
  }

  res.status(200).send({ message: 'Task updated correctly' });
}

export {
  saveTask,
  getUserTasks,
  deleteUserTasks,
  updateUserTasks
}