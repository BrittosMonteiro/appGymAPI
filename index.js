import "dotenv/config";

import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = process.env.PORT || 5050;
const CONNECT = process.env.MONGO_CONNECT_PROD;
const DATABASE = process.env.MONGO_DATABASE;

import WORKOUT_ROUTE from "./src/routes/workoutRoute.js";
import EXERCISE_ROUTE from "./src/routes/exerciseRoute.js";
import GROUP_ROUTE from "./src/routes/groupRoute.js";
import GOAL_ROUTE from "./src/routes/goalRoute.js";
import InstructorRoute from "./src/routes/instructorRoute.js";
import LoginRoute from "./src/routes/loginRoute.js";
import PlanRoute from "./src/routes/planRoute.js";
import WorkoutHistoryRoute from "./src/routes/workoutHistoryRoute.js";
import UserRoute from "./src/routes/userRoute.js";

app.use(express.json());
app.use("/workout", WORKOUT_ROUTE);
app.use("/exercise", EXERCISE_ROUTE);
app.use("/group", GROUP_ROUTE);
app.use("/goal", GOAL_ROUTE);
app.use("/instructor", InstructorRoute);
app.use("/login", LoginRoute);
app.use("/plan", PlanRoute);
app.use("/workoutHistory", WorkoutHistoryRoute);
app.use("/user", UserRoute);

function connection() {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(`${CONNECT}/${DATABASE}`);
  } catch (e) {
    console.log(e.message);
  }
}

app.listen(PORT, connection());
