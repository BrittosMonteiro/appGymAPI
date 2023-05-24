import express from "express";
import {
  createGroupController,
  readGroupListController,
  updateCategoryStatusController,
  countCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} from "../controller/groupController.js";
const GROUP_ROUTE = express.Router();

GROUP_ROUTE.post("/", createGroupController);
GROUP_ROUTE.get("/", readGroupListController);
GROUP_ROUTE.put("/updateStatus", updateCategoryStatusController);
GROUP_ROUTE.put("/", updateCategoryController);
GROUP_ROUTE.get("/countCategories", countCategoriesController);
GROUP_ROUTE.delete("/", deleteCategoryController);

export default GROUP_ROUTE;
