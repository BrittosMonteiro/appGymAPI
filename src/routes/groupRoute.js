import express from "express";
import {
  countCategoriesService,
  createGroupController,
  readGroupListController,
  updateGroupStatusController,
  deleteCategory,
} from "../controller/groupController.js";
const GROUP_ROUTE = express.Router();

GROUP_ROUTE.post("/", createGroupController);
GROUP_ROUTE.get("/", readGroupListController);
GROUP_ROUTE.put("/", updateGroupStatusController);
GROUP_ROUTE.get("/countCategories", countCategoriesService);
GROUP_ROUTE.delete("/", deleteCategory);

export default GROUP_ROUTE;
