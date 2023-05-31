import express from "express";
const LOGIN_ROUTE = express.Router();

import {
  createAccountController,
  loginController,
} from "../controller/loginController.js";

LOGIN_ROUTE.post("/login", loginController);
LOGIN_ROUTE.post("/createAccount", createAccountController);

export default LOGIN_ROUTE;
