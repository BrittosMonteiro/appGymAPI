import express from "express";
import {
  createPlanController,
  deletePlanController,
  readPlanByIdController,
  readPlanListController,
  updatePlanController,
} from "../controller/planController.js";
const PlanRoute = express.Router();

PlanRoute.post("/", createPlanController);
PlanRoute.get("/list/:idGym", readPlanListController);
PlanRoute.get("/byId/:idPlan", readPlanByIdController);
PlanRoute.put("/", updatePlanController);
PlanRoute.delete("/", deletePlanController);

export default PlanRoute;
