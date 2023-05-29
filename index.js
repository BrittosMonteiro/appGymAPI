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
import WorkoutHistoryRoute from "./src/routes/workoutHistoryRoute.js";
import UserRoute from "./src/routes/userRoute.js";
import ActivityRoute from "./src/routes/activityRoute.js";
import GROUP_ROUTE from "./src/routes/groupRoute.js";
import GOAL_ROUTE from "./src/routes/goalRoute.js";

app.use(express.json());
app.use("/instructor", InstructorRoute);
app.use("/login", LoginRoute);
app.use("/plan", PlanRoute);
app.use("/training", TrainingRoute);
app.use("/workoutHistory", WorkoutHistoryRoute);
app.use("/user", UserRoute);
app.use("/activity", ActivityRoute);
app.use("/group", GROUP_ROUTE);
app.use("/goal", GOAL_ROUTE);

function connection() {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(`${CONNECT}/${DATABASE}`);
  } catch (e) {
    console.log(e.message);
  }
}

app.listen(PORT, connection());
