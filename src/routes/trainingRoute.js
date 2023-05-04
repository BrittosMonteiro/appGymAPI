import express from "express";
import {
  createTrainingController,
  readTrainingActivityListController,
  readTrainingByIdController,
  updateTrainingController,
  deleteTrainingController,
} from "../controller/trainingController.js";
const TrainingRoute = express.Router();

TrainingRoute.post("/", createTrainingController);
TrainingRoute.get("/list/:idUser", readTrainingActivityListController);
TrainingRoute.get("/byId/:idActivity", readTrainingByIdController);
TrainingRoute.put("/", updateTrainingController);
TrainingRoute.delete("/", deleteTrainingController);

export default TrainingRoute;
