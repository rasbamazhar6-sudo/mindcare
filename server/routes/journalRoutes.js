import { Router } from "express";
import { createEntry, getEntries, deleteEntry } from "../controllers/journalController.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.use(authRequired);
router.post("/", createEntry);
router.get("/", getEntries);
router.delete("/:id", deleteEntry);

export default router;
