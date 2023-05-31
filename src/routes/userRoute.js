import express from "express";
import {
  createGymUserController,
  readGymUsersListController,
  readUserById,
  readUsersNotAttachedToGymController,
  removePlantFromUserController,
  setPlanToUserController,
  updatePasswordController,
  updateUserService,
  deleteUserAccountController,
  countGymsService,
} from "../controller/userController.js";
const USER_ROUTE = express.Router();

USER_ROUTE.post("/createGymUser", createGymUserController);
USER_ROUTE.get("/byGym/:idGym", readGymUsersListController);
USER_ROUTE.get("/byId/:idUser", readUserById);
USER_ROUTE.get("/usersNotAttached/:idGym", readUsersNotAttachedToGymController);
USER_ROUTE.get("/countGyms", countGymsService);
USER_ROUTE.put("/setPlan", setPlanToUserController);
USER_ROUTE.put("/removePlan", removePlantFromUserController);
USER_ROUTE.put("/updatePassword", updatePasswordController);
USER_ROUTE.put("/", updateUserService);
USER_ROUTE.delete("/", deleteUserAccountController);

export default USER_ROUTE;
