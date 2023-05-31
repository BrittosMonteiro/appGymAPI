import express from "express";
import {
  createInstructorController,
  readInstructorListController,
  readInstructorByIdController,
  updateInstructorController,
  deleteInstructorController,
} from "../controller/instructorController.js";
const INSTRUCTOR_ROUTE = express.Router();

INSTRUCTOR_ROUTE.post("/create", createInstructorController);
INSTRUCTOR_ROUTE.get("/list/:idGym", readInstructorListController);
INSTRUCTOR_ROUTE.get("/byId/:idInstructor", readInstructorByIdController);
INSTRUCTOR_ROUTE.put("/update", updateInstructorController);
INSTRUCTOR_ROUTE.delete("/delete", deleteInstructorController);

export default INSTRUCTOR_ROUTE;
