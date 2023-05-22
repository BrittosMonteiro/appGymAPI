import express from "express";
import {
  countExercises,
  createActivity,
  deleteExercise,
  readActivityById,
  readActivityList,
  updateActivity,
} from "../controller/activityController.js";
const ActivityRoute = express.Router();

ActivityRoute.post("/", createActivity);
ActivityRoute.get("/", readActivityList);
ActivityRoute.get("/byId/:idActivity", readActivityById);
ActivityRoute.put("/", updateActivity);
ActivityRoute.get("/countExercises", countExercises);
ActivityRoute.delete("/", deleteExercise);

export default ActivityRoute;
