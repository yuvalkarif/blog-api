import mongoose from "mongoose";
const { Schema } = mongoose;
const imageSchema = new Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});
const Image = mongoose.model("Image", imageSchema);

export default Image;
