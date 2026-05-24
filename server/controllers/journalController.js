import Journal, { JOURNAL_MOODS } from "../models/Journal.js";

function computeJournalStreak(entries) {
  if (!entries.length) return 0;

  const daySet = new Set(
    entries.map((e) => {
      const d = new Date(e.createdAt);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    })
  );

  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (true) {
    const key = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
    if (!daySet.has(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export async function createEntry(req, res, next) {
  try {
    const title = (req.body.title || "").trim();
    const mood = req.body.mood;
    const content = (req.body.content || "").trim();

    if (!title) return res.status(400).json({ message: "Title is required" });
    if (!content) return res.status(400).json({ message: "Reflection content is required" });
    if (!JOURNAL_MOODS.includes(mood)) {
      return res.status(400).json({ message: "Invalid mood selection" });
    }

    const entry = await Journal.create({
      user: req.userId,
      title,
      mood,
      content,
    });

    res.status(201).json({ entry });
  } catch (err) {
    next(err);
  }
}

export async function getEntries(req, res, next) {
  try {
    const entries = await Journal.find({ user: req.userId }).sort({ createdAt: -1 }).limit(50);

    res.json({
      entries,
      streak: computeJournalStreak(entries),
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteEntry(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Journal.findOneAndDelete({ _id: id, user: req.userId });
    if (!deleted) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.json({ message: "Entry deleted" });
  } catch (err) {
    next(err);
  }
}
