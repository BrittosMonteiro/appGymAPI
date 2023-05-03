import express from "express";
const LoginRoute = express.Router();

import {
  createAccountController,
  loginController,
} from "../controller/loginController.js";

LoginRoute.post("/login", loginController);
LoginRoute.post("/createAccount", createAccountController);

export default LoginRoute;
