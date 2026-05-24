import mongoose from "mongoose";

const MAX_RETRIES = 5;
const RETRY_MS = 3000;

/** Fix common .env mistakes: duplicate key prefix, quotes, whitespace */
export function normalizeMongoUri(raw) {
  if (!raw || typeof raw !== "string") return null;

  let uri = raw.trim().replace(/^["']|["']$/g, "");

  while (uri.startsWith("MONGODB_URI=")) {
    uri = uri.slice("MONGODB_URI=".length).trim();
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    return null;
  }

  return uri;
}

export function getMongoUri() {
  const uri = normalizeMongoUri(process.env.MONGODB_URI);
  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing or invalid. Use mongodb+srv://... or mongodb://... in server/.env (no duplicate MONGODB_URI= prefix)."
    );
  }
  return uri;
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function connectDB() {
  const uri = getMongoUri();

  mongoose.set("strictQuery", true);

  const options = {
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    dbName: process.env.MONGODB_DB_NAME || "mindcare",
  };

  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      await mongoose.connect(uri, options);
      console.log(`[MongoDB] Connected to database "${mongoose.connection.name}" (attempt ${attempt})`);
      return mongoose.connection;
    } catch (err) {
      lastError = err;
      console.error(`[MongoDB] Connection attempt ${attempt}/${MAX_RETRIES} failed:`, err.message);
      if (attempt === 1 && /querySrv ECONNREFUSED/i.test(err.message)) {
        console.error(
          "[MongoDB] Tip: On Windows, use Atlas 'standard connection string' (mongodb://...) in server/.env instead of mongodb+srv://"
        );
      }
      if (attempt < MAX_RETRIES) {
        await delay(RETRY_MS);
      }
    }
  }

  throw lastError;
}

export async function disconnectDB() {
  await mongoose.disconnect();
  console.log("[MongoDB] Disconnected");
}

function registerShutdownHandlers() {
  const shutdown = async (signal) => {
    console.log(`[Server] ${signal} received — closing MongoDB connection`);
    try {
      await disconnectDB();
    } catch (err) {
      console.error("[MongoDB] Shutdown error:", err.message);
    }
    process.exit(0);
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

registerShutdownHandlers();
