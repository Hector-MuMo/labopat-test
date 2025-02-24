import * as UsersModels from "../models/index.js"

const findUserById = async (id) => {
  try {
    const userData = await UsersModels.findById(id);
    return userData
  } catch (error) {
    console.log('Cant find user info', error);
  }
}

const updateUser = async (id, dataToUpdate) => {
  try {
    const userUpdated = await UsersModels.update(id, dataToUpdate);
    return userUpdated;
  } catch (error) {
    console.log('Cant update user', error)
  }
}

const deleteUser = async (id) => {
  try {
    const userDeleted = await UsersModels.remove(id);
    return userDeleted;
  } catch (error) {
    console.log('Cant delete user', error)
  }
}

export {
  findUserById,
  updateUser,
  deleteUser
}