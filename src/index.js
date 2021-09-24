import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoDB from "./config/database";
import apiRouter from "./routes/api";

//Initiating Express
const app = express();
//Allowing other sites to fetch
app.use(cors());
//Parsing the Body for Post Requests
app.use(express.json());
app.use(express.static("./public"));
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//Connecting to MongoDB
const db = mongoDB();

app.use("/api", apiRouter);

app.listen(8080, function () {
  console.log("--WORKING IN PORT:8080--");
});
