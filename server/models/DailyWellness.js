import mongoose from "mongoose";

const TASK_IDS = ["water", "breathing", "walk", "journal", "sleep"];
const MOODS = ["happy", "calm", "neutral", "stressed", "sad"];

const dailyWellnessSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    dateKey: { type: String, required: true },
    mood: { type: String, enum: MOODS, default: "neutral" },
    tasks: {
      water: { type: Boolean, default: false },
      breathing: { type: Boolean, default: false },
      walk: { type: Boolean, default: false },
      journal: { type: Boolean, default: false },
      sleep: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

dailyWellnessSchema.index({ user: 1, dateKey: 1 }, { unique: true });

export { TASK_IDS, MOODS };
export default mongoose.model("DailyWellness", dailyWellnessSchema);
