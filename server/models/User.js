import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const moodEntrySchema = new mongoose.Schema(
  { dateKey: String, mood: String },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8, select: false },
    streak: { type: Number, default: 0 },
    moodHistory: { type: [moodEntrySchema], default: [] },
    wellnessTasks: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    aiConversations: {
      type: [{ role: String, text: String, at: Date }],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model("User", userSchema);
