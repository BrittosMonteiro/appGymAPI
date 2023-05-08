import express from "express";
import {
  createGroupController,
  readGroupListController,
  updateGroupStatusController,
} from "../controller/groupController.js";
const GROUP_ROUTE = express.Router();

GROUP_ROUTE.post("/", createGroupController);
GROUP_ROUTE.get("/", readGroupListController);
GROUP_ROUTE.put("/", updateGroupStatusController);

export default GROUP_ROUTE;
