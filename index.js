import "dotenv/config";

import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = process.env.PORT || 5050;
const CONNECT = process.env.MONGO_CONNECT_PROD;
const DATABASE = process.env.MONGO_DATABASE;

import InstructorRoute from "./src/routes/instructorRoute.js";
import LoginRoute from "./src/routes/loginRoute.js";
import PlanRoute from "./src/routes/planRoute.js";
import TrainingRoute from "./src/routes/trainingRoute.js";
import TrainingHistoryRoute from "./src/routes/trainingHistoryRoute.js";
import UserRoute from "./src/routes/userRoute.js";

app.use(express.json());
app.use("/instructor", InstructorRoute);
app.use("/login", LoginRoute);
app.use("/plan", PlanRoute);
app.use("/training", TrainingRoute);
app.use("/trainingHistory", TrainingHistoryRoute);
app.use("/user", UserRoute);

function connection() {
  try {
    mongoose.connect(`${CONNECT}/${DATABASE}`);
  } catch (e) {
    console.log(e.message);
  }
}

app.listen(PORT, connection());
