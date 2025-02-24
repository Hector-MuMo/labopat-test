import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: { type: String, lowercase: true, trim: true },
  password: { type: String, min: 8 }
}, {
  id: true,
  toJSON: {
    virtuals: true,
    versionKey: true,
  }
})

export default UserSchema;