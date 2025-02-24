import mongoose from "mongoose";
import userSchema from "./userSchema.js";

const create = async (user) => {
  const userModel = mongoose.model('users', userSchema);

  const userExist = await userModel.find({ email: user.email })

  console.log(userExist);


  if (userExist.length > 0 && userExist[0].email) {
    return { error: "Email already exist" }
  }

  const result = await userModel.create(user);
  return result;
}

const findUser = async (email) => {
  const userModel = mongoose.model('users', userSchema);
  const user = await userModel.find({ email })

  if (!user[0].email) {
    return { error: "Email doesn't exist" }
  }

  return user[0]
}

const findById = async (id) => {
  const userModel = mongoose.model('users', userSchema);
  const user = await userModel.findById(id)

  return user;
}

const update = async (id, dataToUpdate) => {
  const userModel = mongoose.model('users', userSchema);
  const result = await userModel.findByIdAndUpdate(id, { "$set": dataToUpdate }, { new: true })

  return result;
}

const remove = async (id) => {
  const userModel = mongoose.model('users', userSchema);
  const result = await userModel.findByIdAndDelete(id);

  return result;
}

export {
  create,
  findUser,
  findById,
  update,
  remove
}