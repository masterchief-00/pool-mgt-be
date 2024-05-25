import express from "express";
import PoolController from "../controllers/poolController";
import verifyRole from "../middlewares/verifyRole";
import { isLoggedin } from "../middlewares/isLoggedin";

const poolRoutes = express.Router();

poolRoutes.post(
  "/create",
  isLoggedin,
  verifyRole("admin"),
  PoolController.createPool
);
poolRoutes.get(
  "/pool/:id",
  isLoggedin,
  verifyRole("admin"),
  PoolController.getSinglePool
);
poolRoutes.get(
  "/pools",
  isLoggedin,
  verifyRole("admin"),
  PoolController.getAllPools
);
poolRoutes.put(
  "/update/:id",
  isLoggedin,
  verifyRole("admin"),
  PoolController.updatePool
);
poolRoutes.put(
  "/assign/:poolId",
  isLoggedin,
  verifyRole("admin"),
  PoolController.assignUserToPool
);

export default poolRoutes;
