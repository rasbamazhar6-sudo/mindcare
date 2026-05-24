import DailyWellness, { TASK_IDS } from "../models/DailyWellness.js";
import User from "../models/User.js";
import { todayKey, lastNDaysKeys, weekdayLabel } from "../utils/dateKey.js";

function taskProgress(tasks) {
  const done = TASK_IDS.filter((id) => tasks[id]).length;
  return Math.round((done / TASK_IDS.length) * 100);
}

function computeStreak(recordsByDate) {
  let streak = 0;
  const keys = lastNDaysKeys(60);
  for (let i = keys.length - 1; i >= 0; i -= 1) {
    const rec = recordsByDate[keys[i]];
    if (!rec) break;
    const pct = taskProgress(rec.tasks);
    if (pct >= 40) streak += 1;
    else break;
  }
  return streak;
}

export async function getToday(req, res, next) {
  try {
    const dateKey = todayKey();
    let doc = await DailyWellness.findOne({ user: req.userId, dateKey });
    if (!doc) {
      doc = await DailyWellness.create({ user: req.userId, dateKey });
    }
    res.json({
      dateKey,
      mood: doc.mood,
      tasks: doc.tasks,
      progressPct: taskProgress(doc.tasks),
    });
  } catch (err) {
    next(err);
  }
}

export async function updateToday(req, res, next) {
  try {
    const dateKey = todayKey();
    const { mood, tasks } = req.body;
    const update = {};
    if (mood) update.mood = mood;
    if (tasks && typeof tasks === "object") {
      update.tasks = {};
      for (const id of TASK_IDS) {
        if (typeof tasks[id] === "boolean") update.tasks[id] = tasks[id];
      }
    }
    const doc = await DailyWellness.findOneAndUpdate(
      { user: req.userId, dateKey },
      { $set: update },
      { new: true, upsert: true, runValidators: true }
    );

    if (mood) {
      await User.findByIdAndUpdate(req.userId, {
        $pull: { moodHistory: { dateKey } },
      });
      await User.findByIdAndUpdate(req.userId, {
        $push: { moodHistory: { dateKey, mood: doc.mood } },
        $set: { wellnessTasks: doc.tasks },
      });
    }

    const allRecent = await DailyWellness.find({ user: req.userId }).sort({ dateKey: -1 }).limit(60);
    const map = Object.fromEntries(allRecent.map((r) => [r.dateKey, r]));
    const streak = computeStreak(map);
    await User.findByIdAndUpdate(req.userId, { $set: { streak } });

    res.json({
      dateKey,
      mood: doc.mood,
      tasks: doc.tasks,
      progressPct: taskProgress(doc.tasks),
    });
  } catch (err) {
    next(err);
  }
}

export async function getDashboardStats(req, res, next) {
  try {
    const keys = lastNDaysKeys(7);
    const records = await DailyWellness.find({
      user: req.userId,
      dateKey: { $in: keys },
    });
    const byDate = Object.fromEntries(records.map((r) => [r.dateKey, r]));

    const weekly = keys.map((dateKey) => ({
      label: weekdayLabel(dateKey),
      value: byDate[dateKey] ? taskProgress(byDate[dateKey].tasks) : 0,
    }));

    const today = byDate[todayKey()] || (await DailyWellness.findOne({ user: req.userId, dateKey: todayKey() }));
    const todayPct = today ? taskProgress(today.tasks) : 0;

    const allRecent = await DailyWellness.find({ user: req.userId })
      .sort({ dateKey: -1 })
      .limit(60);
    const map = Object.fromEntries(allRecent.map((r) => [r.dateKey, r]));
    const streak = computeStreak(map);

    const moodDays = allRecent.filter((r) => r.mood && r.mood !== "neutral").length;

    res.json({
      weekly,
      todayProgressPct: todayPct,
      streak,
      moodCheckIns: moodDays,
      mindfulMinutes: weekly.reduce((s, d) => s + Math.round((d.value / 100) * 12), 0),
    });
  } catch (err) {
    next(err);
  }
}
