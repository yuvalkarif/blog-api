import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoDB from "./config/database";
import apiRouter from "./routes/api";
import compression from "compression";
import helmet from "helmet";

//Initiating Express
const app = express();
// app.use(cors());
app.use(helmet());
app.use(compression());

//Allowing other sites to fetch

//Parsing the Body for Post Requests
app.use(express.json());
app.use(express.static("./public"));
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//Connecting to MongoDB
const db = mongoDB();

app.use("/api", apiRouter);
const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log(`--WORKING IN PORT:${PORT}--`);
});
