import express from "express";
import {
  createWorkoutController,
  readWorkoutExerciseListController,
  readWorkoutByIdController,
  updateWorkoutController,
  deleteWorkoutController,
} from "../controller/workoutController.js";
const WORKOUT_ROUTE = express.Router();

WORKOUT_ROUTE.post("/", createWorkoutController);
WORKOUT_ROUTE.get("/list/:idUser", readWorkoutExerciseListController);
WORKOUT_ROUTE.get("/byId/:idActivity", readWorkoutByIdController);
WORKOUT_ROUTE.put("/", updateWorkoutController);
WORKOUT_ROUTE.delete("/", deleteWorkoutController);

export default WORKOUT_ROUTE;
