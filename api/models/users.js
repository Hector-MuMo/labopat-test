import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: String, 
  lastname: String, 
  email: String, 
  password: String
})

export default mongoose.model('User', UserSchema);