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
const UserRoute = express.Router();

UserRoute.post("/createGymUser", createGymUserController);
UserRoute.get("/byGym/:idGym", readGymUsersListController);
UserRoute.get("/byId/:idUser", readUserById);
UserRoute.get("/usersNotAttached/:idGym", readUsersNotAttachedToGymController);
UserRoute.put("/setPlan", setPlanToUserController);
UserRoute.put("/removePlan", removePlantFromUserController);
UserRoute.put("/updatePassword", updatePasswordController);
UserRoute.put("/", updateUserService);
UserRoute.delete("/", deleteUserAccountController);
UserRoute.get("/countGyms", countGymsService);

export default UserRoute;
