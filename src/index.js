import express from "express";
import mongoDB from "./config/database";
import apiRouter from "./routes/api";

//Initiating Express
const app = express();
//Parsing the Body for Post Requests
app.use(express.json());
//Connecting to MongoDB
const db = mongoDB();

app.use("/api", apiRouter);

app.listen(3000, function () {
  console.log("--WORKING IN PORT:3000--");
});
