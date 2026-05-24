import { Router } from "express";
import { getChatHistory, sendMessage, chat } from "../controllers/chatController.js";
import { authRequired } from "../middleware/auth.js";
import { authOptional } from "../middleware/authOptional.js";

const router = Router();

/** Primary route — guests; saves to MongoDB when JWT present */
router.post("/", authOptional, chat);

router.get("/history", authRequired, getChatHistory);
router.post("/message", authRequired, sendMessage);

export default router;
