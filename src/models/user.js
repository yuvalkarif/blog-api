import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  displayname: { type: String, default: "Anon" },
  password: { type: String, required: true },
  token: String,
});
const User = mongoose.model("User", userSchema);
export default User;
