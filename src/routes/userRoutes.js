import express from "express";
import UserController from "../controllers/userController";
import { isLoggedin } from "../middlewares/isLoggedin";
import verifyRole from "../middlewares/verifyRole";

const userRoutes = express.Router();
userRoutes.post("/signup", UserController.createUser);
userRoutes.post("/login", UserController.login);
userRoutes.get(
  "/user/id",
  isLoggedin,
  verifyRole("admin"),
  UserController.getSingleUser
);
userRoutes.get(
  "/users",
  isLoggedin,
  verifyRole("admin"),
  UserController.getAllUsers
);
userRoutes.put(
  "/update/id",
  isLoggedin,
  verifyRole("admin"),
  UserController.updateUserRole
);
userRoutes.put("/reset", UserController.resetPassword);

export default userRoutes;
