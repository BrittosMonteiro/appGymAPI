import express from "express";
import {
  countExercises,
  createActivity,
  deleteExercise,
  readActivityById,
  readActivityList,
  updateExercise,
  updateExerciseStatus,
} from "../controller/activityController.js";
const ActivityRoute = express.Router();

ActivityRoute.post("/", createActivity);
ActivityRoute.get("/", readActivityList);
ActivityRoute.get("/byId/:idActivity", readActivityById);
ActivityRoute.put("/updateStatus", updateExerciseStatus);
ActivityRoute.put("/", updateExercise);
ActivityRoute.get("/countExercises", countExercises);
ActivityRoute.delete("/", deleteExercise);

export default ActivityRoute;
