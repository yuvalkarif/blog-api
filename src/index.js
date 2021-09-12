import express from "express";
import mongoDB from "./config/database";

//Initiating Express
const app = express();

//Parsing the Body for Post Requests
app.use(express.json());

const db = mongoDB();

app.listen(3000, function () {
  console.log("--WORKING IN PORT:3000--");
});
