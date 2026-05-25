import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import wellnessRoutes from "./routes/wellnessRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: [clientUrl, "http://127.0.0.1:5173", "https://mindcare-sandy.vercel.app"],
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "MindCare API",
    db: process.env.MONGODB_URI ? "configured" : "missing",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/wellness", wellnessRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/journal", journalRoutes);

app.use(errorHandler);

async function start() {
  if (!process.env.JWT_SECRET) {
    console.error("[Config] JWT_SECRET is required in server/.env");
    process.exit(1);
  }

  await connectDB();

  app.listen(PORT, () => {
    console.log(`[Server] MindCare API http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("[Server] Failed to start:", err.message);
  process.exit(1);
});
