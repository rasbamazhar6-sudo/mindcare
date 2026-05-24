import { Router } from "express";
import { register, login, me } from "../controllers/authController.js";
import { authRequired, attachUser } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authRequired, attachUser, me);

export default router;
