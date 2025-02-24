import * as usersModels from "../../users/models/index.js"

const createUser = async (user) => {
  try {
    const userCreated = await usersModels.create(user);

    return userCreated;
  } catch (error) {
    console.log('Create user error ', error);
  }
}

const findUserByEmail = async (email) => {
  try {
    const userData = await usersModels.findUser(email);
    return userData;
  } catch (error) {
    console.log('Cant find user info');
  }
}

export {
  createUser,
  findUserByEmail
}