import express from "express";
import {
  createPlanController,
  deletePlanController,
  readPlanByIdController,
  readPlanListController,
  updatePlanController,
} from "../controller/planController.js";
const PLAN_ROUTE = express.Router();

PLAN_ROUTE.post("/", createPlanController);
PLAN_ROUTE.get("/list/:idGym", readPlanListController);
PLAN_ROUTE.get("/byId/:idPlan", readPlanByIdController);
PLAN_ROUTE.put("/", updatePlanController);
PLAN_ROUTE.delete("/", deletePlanController);

export default PLAN_ROUTE;
