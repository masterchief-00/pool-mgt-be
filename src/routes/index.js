import { Router } from "express";
import testRoutes from "./testRoutes";
import userRoutes from "./userRoutes";
const router = Router();

router.use("/test", testRoutes);
router.use('/users', userRoutes)
export default router;