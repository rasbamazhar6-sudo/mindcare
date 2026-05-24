import { Router } from "express";
import { getToday, updateToday, getDashboardStats } from "../controllers/wellnessController.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.use(authRequired);
router.get("/today", getToday);
router.put("/today", updateToday);
router.get("/stats", getDashboardStats);

export default router;
