import express from "express";
import {
  createWorkoutHistoryController,
  deleteWorkoutHistoryByIdController,
  readWorkoutHistoryByIdController,
  readWorkoutHistoryListByIdUserController,
} from "../controller/workoutHistoryController.js";
const WORKOUT_HISTORY_ROUTE = express.Router();

WORKOUT_HISTORY_ROUTE.post("/", createWorkoutHistoryController);
WORKOUT_HISTORY_ROUTE.get(
  "/byId/:idActivity",
  readWorkoutHistoryByIdController
);
WORKOUT_HISTORY_ROUTE.get(
  "/list/:idUser",
  readWorkoutHistoryListByIdUserController
);
WORKOUT_HISTORY_ROUTE.delete("/", deleteWorkoutHistoryByIdController);

export default WORKOUT_HISTORY_ROUTE;
