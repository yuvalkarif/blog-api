import "dotenv/config";
import mongoose from "mongoose";
//MongoDB Setup Connection
const connectDB = () => {
  const mongoDB = process.env.MONGODB_URI || process.env.DB_KEY;
  mongoose
    .connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
      console.log("MongoDB connection failed. exiting now...");
      console.error(err);
      process.exit(1);
    });
  const db = mongoose.connection;
};

export default connectDB;
