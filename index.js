import "dotenv/config";

import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = process.env.PORT || 5050;
const CONNECT = process.env.MONGO_CONNECT_PROD;
const DATABASE = process.env.MONGO_DATABASE;

import LoginRoute from "./src/routes/loginRoute.js";
import ActivityRoute from "./src/routes/activityRoute.js";
import ActivityHistoryRoute from "./src/routes/activityHistoryRoute.js";
import UserRoute from "./src/routes/userRoute.js";
import InstructorRoute from "./src/routes/instructorRoute.js";
import PlanRoute from "./src/routes/planRoute.js";

app.use(express.json());
app.use("/activity", ActivityRoute);
app.use("/activityHistory", ActivityHistoryRoute);
app.use("/instructor", InstructorRoute);
app.use("/login", LoginRoute);
app.use("/plan", PlanRoute);
app.use("/user", UserRoute);

function connection() {
  try {
    mongoose.connect(`${CONNECT}/${DATABASE}`);
  } catch (e) {
    console.log(e.message);
  }
}

app.listen(PORT, connection());
