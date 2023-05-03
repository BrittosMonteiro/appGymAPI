import express from "express";
import {
  createInstructorController,
  readInstructorListController,
  readInstructorByIdController,
  updateInstructorController,
  deleteInstructorController,
} from "../controller/instructorController.js";
const InstructorRoute = express.Router();

InstructorRoute.post("/create", createInstructorController);
InstructorRoute.get("/list/:idGym", readInstructorListController);
InstructorRoute.get("/byId/:idInstructor", readInstructorByIdController);
InstructorRoute.put("/update", updateInstructorController);
InstructorRoute.delete("/delete", deleteInstructorController);

export default InstructorRoute;
