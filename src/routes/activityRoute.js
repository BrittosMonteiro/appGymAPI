import express from "express";
import {
  createActivity,
  readActivityById,
  readActivityList,
  updateActivity,
} from "../controller/activityController.js";
const ActivityRoute = express.Router();

ActivityRoute.post("/", createActivity);
ActivityRoute.get("/", readActivityList);
ActivityRoute.get("/byId/:idActivity", readActivityById);
ActivityRoute.put("/", updateActivity);

export default ActivityRoute;
