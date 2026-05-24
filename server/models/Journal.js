import mongoose from "mongoose";

export const JOURNAL_MOODS = [
  "happy",
  "calm",
  "neutral",
  "stressed",
  "sad",
  "hopeful",
  "anxious",
  "lonely",
];

const journalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    mood: { type: String, enum: JOURNAL_MOODS, required: true },
    content: { type: String, required: true, trim: true, maxlength: 8000 },
  },
  { timestamps: true }
);

journalSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model("Journal", journalSchema);
