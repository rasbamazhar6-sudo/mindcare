import { useCallback, useEffect, useState } from "react";
import { HiOutlineBookOpen, HiOutlineTrash } from "react-icons/hi";
import Card from "./ui/Card";
import Button from "./ui/Button";
import {
  fetchJournalEntries,
  createJournalEntry,
  deleteJournalEntry,
} from "../services/journalService";

const DRAFT_KEY = "mindcare_safe_space_draft";
const PREVIEW_LENGTH = 160;

const MOOD_OPTIONS = [
  { id: "happy", label: "Happy" },
  { id: "calm", label: "Calm" },
  { id: "neutral", label: "Neutral" },
  { id: "stressed", label: "Stressed" },
  { id: "sad", label: "Sad" },
  { id: "hopeful", label: "Hopeful" },
  { id: "anxious", label: "Anxious" },
  { id: "lonely", label: "Lonely" },
];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function moodLabel(id) {
  return MOOD_OPTIONS.find((m) => m.id === id)?.label || id;
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function JournalEntryCard({ entry, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const long = entry.content.length > PREVIEW_LENGTH;
  const preview = long ? `${entry.content.slice(0, PREVIEW_LENGTH).trim()}…` : entry.content;

  return (
    <article className="rounded-2xl border border-slate-200/70 bg-white/50 p-4 transition-all duration-300 dark:border-slate-600/70 dark:bg-slate-800/50">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-medium text-slate-900 dark:text-slate-100">{entry.title}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="rounded-full border border-teal-200/80 bg-teal-50/80 px-2 py-0.5 font-medium text-teal-900 dark:border-teal-700/50 dark:bg-teal-900/40 dark:text-teal-200">
              {moodLabel(entry.mood)}
            </span>
            <time dateTime={entry.createdAt}>{formatDate(entry.createdAt)}</time>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onDelete(entry._id)}
          className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
          aria-label={`Delete entry ${entry.title}`}
        >
          <HiOutlineTrash className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {expanded || !long ? entry.content : preview}
      </p>
      {long ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 text-xs font-medium text-teal-800 underline decoration-teal-200 underline-offset-2 hover:text-teal-950 dark:text-teal-300 dark:decoration-teal-700 dark:hover:text-teal-200"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      ) : null}
    </article>
  );
}

export default function SafeSpace() {
  const draft = loadDraft();
  const [title, setTitle] = useState(draft?.title || "");
  const [mood, setMood] = useState(draft?.mood || "neutral");
  const [content, setContent] = useState(draft?.content || "");
  const [entries, setEntries] = useState([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);

  const loadEntries = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await fetchJournalEntries();
      setEntries(data.entries || []);
      setStreak(data.streak ?? 0);
    } catch {
      setError("Could not load your journal entries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  useEffect(() => {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ title, mood, content })
    );
  }, [title, mood, content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !content.trim()) {
      setError("Please add a title and your reflection.");
      return;
    }

    setSaving(true);
    try {
      await createJournalEntry({
        title: title.trim(),
        mood,
        content: content.trim(),
      });
      setTitle("");
      setContent("");
      setMood("neutral");
      localStorage.removeItem(DRAFT_KEY);
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2000);
      await loadEntries();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save entry. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJournalEntry(id);
      setEntries((prev) => prev.filter((e) => e._id !== id));
      const { data } = await fetchJournalEntries();
      setStreak(data.streak ?? 0);
    } catch {
      setError("Could not delete entry.");
    }
  };

  const charCount = content.length;

  return (
    <Card className="p-5" aria-labelledby="safe-space-heading">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <HiOutlineBookOpen className="h-5 w-5 text-teal-700 dark:text-teal-400" aria-hidden />
            <h2 id="safe-space-heading" className="font-display text-lg text-slate-900 dark:text-slate-100">
              Safe Space
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Your private reflection journal.</p>
        </div>
        {streak > 0 ? (
          <span className="rounded-xl border border-white/60 bg-white/50 px-3 py-1 text-xs font-semibold text-teal-900 dark:border-slate-600 dark:bg-slate-800/60 dark:text-teal-300">
            {streak} day journal streak
          </span>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {error ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200" role="alert">
            {error}
          </p>
        ) : null}
        {savedFlash ? (
          <p
            className="animate-fade-up rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-900 dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-200"
            role="status"
          >
            Entry saved to your Safe Space.
          </p>
        ) : null}

        <div>
          <label htmlFor="journal-title" className="text-xs font-medium text-slate-800 dark:text-slate-200">
            Title
          </label>
          <input
            id="journal-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            placeholder="A name for this moment…"
            className="mindcare-input mt-1.5 px-3 py-2.5"
            disabled={saving}
          />
        </div>

        <div>
          <label htmlFor="journal-mood" className="text-xs font-medium text-slate-800 dark:text-slate-200">
            Mood
          </label>
          <select
            id="journal-mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="mindcare-input mt-1.5 px-3 py-2.5"
            disabled={saving}
          >
            {MOOD_OPTIONS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="journal-content" className="text-xs font-medium text-slate-800 dark:text-slate-200">
            Your reflection
          </label>
          <textarea
            id="journal-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            maxLength={8000}
            placeholder="Write what you feel, notice, or want to remember…"
            className="mindcare-input mt-1.5 min-h-[120px] resize-y px-3 py-2.5"
            disabled={saving}
          />
          <p className="mt-1 text-right text-[10px] text-slate-500">{charCount} / 8000</p>
        </div>

        <Button type="submit" disabled={saving} className="w-full sm:w-auto">
          {saving ? "Saving…" : "Save Entry"}
        </Button>
      </form>

      <div className="mt-8 border-t border-slate-200/60 pt-6 dark:border-slate-700/60">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Recent reflections</h3>

        {loading ? (
          <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">Loading entries…</p>
        ) : entries.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-slate-200/80 bg-white/40 px-4 py-8 text-center text-sm text-slate-600 dark:border-slate-600 dark:bg-slate-800/30 dark:text-slate-400">
            Your reflections will appear here. Small thoughts matter too.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {entries.map((entry) => (
              <li key={entry._id}>
                <JournalEntryCard entry={entry} onDelete={handleDelete} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
