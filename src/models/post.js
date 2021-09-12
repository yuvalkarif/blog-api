import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  likes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  public: { type: Boolean, default: true },
  comments: [
    {
      body: String,
      username: { type: String, default: Anon },
      date: { type: Date, default: Date.now },
    },
  ],
});

export default Post = mongoose.model("Post", postSchema);
