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
import WORKOUT_HISTORY_ROUTE from "./src/routes/workoutHistoryRoute.js";
import INSTRUCTOR_ROUTE from "./src/routes/instructorRoute.js";
import LOGIN_ROUTE from "./src/routes/loginRoute.js";
import PLAN_ROUTE from "./src/routes/planRoute.js";
import USER_ROUTE from "./src/routes/userRoute.js";

app.use(express.json());
app.use("/workout", WORKOUT_ROUTE);
app.use("/workoutHistory", WORKOUT_HISTORY_ROUTE);
app.use("/exercise", EXERCISE_ROUTE);
app.use("/group", GROUP_ROUTE);
app.use("/goal", GOAL_ROUTE);
app.use("/instructor", INSTRUCTOR_ROUTE);
app.use("/login", LOGIN_ROUTE);
app.use("/plan", PLAN_ROUTE);
app.use("/user", USER_ROUTE);

function connection() {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(`${CONNECT}/${DATABASE}`);
  } catch (e) {
    console.log(e.message);
  }
}

app.listen(PORT, connection());
