import mongoose from "mongoose";
const { Schema } = mongoose;
import { DateTime } from "luxon";

const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  edited: {
    type: String,
    default: undefined,
  },
  datetime: {
    type: String,
    default: DateTime.now().toLocaleString(DateTime.DATE_MED),
  },
  public: { type: Boolean, default: false },
  comments: [
    {
      body: { type: String, required: true },
      username: { type: String, default: "Anon" },
      date: { type: Date, default: Date.now },
      datetime: {
        type: String,
        default: DateTime.now().toLocaleString(DateTime.DATE_MED),
      },
    },
  ],
});
const Post = mongoose.model("Post", postSchema);
export default Post;
