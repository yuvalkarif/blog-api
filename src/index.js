import express from "express";
import cors from "cors";
import mongoDB from "./config/database";
import apiRouter from "./routes/api";

//Initiating Express
const app = express();
//Allowing other sites to fetch
app.use(cors());
//Parsing the Body for Post Requests
app.use(express.json());
//Connecting to MongoDB
const db = mongoDB();

app.use("/api", apiRouter);

app.listen(8080, function () {
  console.log("--WORKING IN PORT:8080--");
});
