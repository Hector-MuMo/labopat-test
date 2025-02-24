import * as UserServices from "../services/index.js"

const findUserById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const userData = await UserServices.findUserById(id);

  if (!userData) {
    return res.status(404).json({ code: "not-found", message: 'User not found' });
  };

  return res.status(200).send({ user: userData });
}

const updateUserById = async (req, res) => {
  const id = req.params.id;
  const { name, lastname } = req.body;

  if (!name && !lastname || !id) {
    return res.status(400).send({ code: "bad-request", message: 'Name or Lastname and id are required' });
  }

  const dataToUpdate = { name, lastname }

  const userUpdated = await UserServices.updateUser(id, dataToUpdate);

  if (!userUpdated) {
    return res.status(404).send({ code: "not-found/bad-request", message: 'User not found or request cant complete, check service' });
  }

  return res.status(200).send({ message: 'User updated correctly' })
}

const deleteUserById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({ code: 'bad-request', message: 'User ID is required' });
  }

  const userDeleted = await UserServices.deleteUser(id);

  if (!userDeleted) {
    return res.status(400).send({ code: 'bad-request', message: 'Cant delete the user data, try again or check service' });
  }

  return res.status(200).send({ message: 'User deleted correctly' });
}

export {
  findUserById,
  updateUserById,
  deleteUserById
}