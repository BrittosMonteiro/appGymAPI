import express from "express";
import {
  createTrainingHistoryController,
  readTrainingHistoryByIdController,
} from "../controller/trainingHistoryController.js";
const ActivityHistoryRoute = express.Router();

ActivityHistoryRoute.post("/", createTrainingHistoryController);
ActivityHistoryRoute.get(
  "/byId/:idActivity",
  readTrainingHistoryByIdController
);

export default ActivityHistoryRoute;
