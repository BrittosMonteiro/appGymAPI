import express from "express";
import {
  createGoalController,
  readCurrentGoalController,
  readGoalsListController,
  readGoalResumeController,
  updateGoalController,
  deleteGoalController,
} from "../controller/goalController.js";
const GOAL_ROUTE = express.Router();

GOAL_ROUTE.post("/", createGoalController);
GOAL_ROUTE.get("/list/:idUser", readGoalsListController);
GOAL_ROUTE.get("/goal/:idUser", readCurrentGoalController);
GOAL_ROUTE.get("/resume/:idUser", readGoalResumeController);
GOAL_ROUTE.put("/", updateGoalController);
GOAL_ROUTE.delete("/", deleteGoalController);

export default GOAL_ROUTE;
