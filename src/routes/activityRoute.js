import express from "express";
import {
  createActivityController,
  readActivityByIdController,
  readActivityListController,
  updateTrainingController,
  deleteActivityController,
} from "../controller/activityController.js";
const ActivityRoute = express.Router();

ActivityRoute.post("/create", createActivityController);
ActivityRoute.get("/list/:idUser", readActivityListController);
ActivityRoute.get("/byId/:idActivity", readActivityByIdController);
ActivityRoute.put("/", updateTrainingController);
ActivityRoute.delete("/", deleteActivityController);

export default ActivityRoute;
