import express from "express";
import {
  createActivityHistoryController,
  readActivityHistoryByIdController,
} from "../controller/activityHistoryController.js";
const ActivityHistoryRoute = express.Router();

ActivityHistoryRoute.post("/create", createActivityHistoryController);
ActivityHistoryRoute.get(
  "/byId/:idActivity",
  readActivityHistoryByIdController
);

export default ActivityHistoryRoute;
