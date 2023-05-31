import express from "express";
import {
  countExercises,
  createExercise,
  deleteExercise,
  readExerciseById,
  readExerciseList,
  updateExercise,
  updateExerciseStatus,
} from "../controller/exerciseController.js";
const EXERCISE_ROUTE = express.Router();

EXERCISE_ROUTE.post("/", createExercise);
EXERCISE_ROUTE.get("/", readExerciseList);
EXERCISE_ROUTE.get("/byId/:idActivity", readExerciseById);
EXERCISE_ROUTE.put("/updateStatus", updateExerciseStatus);
EXERCISE_ROUTE.put("/", updateExercise);
EXERCISE_ROUTE.get("/countExercises", countExercises);
EXERCISE_ROUTE.delete("/", deleteExercise);

export default EXERCISE_ROUTE;
