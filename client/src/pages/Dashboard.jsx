import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineSparkles,
  HiOutlineEmojiHappy,
  HiOutlineMinusSm,
  HiOutlineCloud,
  HiOutlineExclamation,
  HiOutlineHeart,
  HiOutlineMoon,
} from "react-icons/hi";
import { FaTint, FaWalking, FaBook, FaBed } from "react-icons/fa";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../utils/constants";
import { fetchTodayWellness, updateTodayWellness, fetchDashboardStats } from "../services/wellnessService";
import SafeSpace from "../components/SafeSpace";

const WeeklyProgressChart = lazy(() => import("../components/dashboard/WeeklyProgressChart"));

const moods = [
  { id: "happy", label: "Happy", icon: HiOutlineEmojiHappy },
  { id: "calm", label: "Calm", icon: HiOutlineSparkles },
  { id: "neutral", label: "Neutral", icon: HiOutlineMinusSm },
  { id: "stressed", label: "Stressed", icon: HiOutlineExclamation },
  { id: "sad", label: "Sad", icon: HiOutlineHeart },
];

const tasksSeed = [
  { id: "water", label: "Drink Water", icon: FaTint },
  { id: "breathing", label: "Mindful breathing", icon: HiOutlineMoon },
  { id: "walk", label: "Walk", icon: FaWalking },
  { id: "journal", label: "Journal", icon: FaBook },
  { id: "sleep", label: "Sleep Early", icon: FaBed },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [mood, setMood] = useState("calm");
  const [tasks, setTasks] = useState(() => Object.fromEntries(tasksSeed.map((t) => [t.id, false])));
  const [weekSeries, setWeekSeries] = useState([]);
  const [stats, setStats] = useState({ streak: 0, mindfulMinutes: 0, moodCheckIns: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [todayRes, statsRes] = await Promise.all([fetchTodayWellness(), fetchDashboardStats()]);
        if (cancelled) return;
        setMood(todayRes.data.mood);
        setTasks(todayRes.data.tasks);
        setWeekSeries(statsRes.data.weekly);
        setStats({
          streak: statsRes.data.streak,
          mindfulMinutes: statsRes.data.mindfulMinutes,
          moodCheckIns: statsRes.data.moodCheckIns,
        });
      } catch {
        /* auth handled by ProtectedRoute */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback(async (nextMood, nextTasks) => {
    setSaving(true);
    try {
      const { data } = await updateTodayWellness({ mood: nextMood, tasks: nextTasks });
      setMood(data.mood);
      setTasks(data.tasks);
      const statsRes = await fetchDashboardStats();
      setWeekSeries(statsRes.data.weekly);
      setStats({
        streak: statsRes.data.streak,
        mindfulMinutes: statsRes.data.mindfulMinutes,
        moodCheckIns: statsRes.data.moodCheckIns,
      });
    } finally {
      setSaving(false);
    }
  }, []);

  const completedCount = useMemo(() => Object.values(tasks).filter(Boolean).length, [tasks]);
  const progressPct = Math.round((completedCount / tasksSeed.length) * 100);

  const handleMood = (id) => {
    setMood(id);
    persist(id, tasks);
  };

  const toggleTask = (id) => {
    const next = { ...tasks, [id]: !tasks[id] };
    setTasks(next);
    persist(mood, next);
  };

  const displayName = user?.fullName?.trim() || user?.name?.trim() || "friend";

  return (
    <div className="overflow-x-hidden py-10 md:py-14">
      <Container>
        <section className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-emerald-200/80 via-sky-200/75 to-violet-200/80 p-6 md:p-8 shadow-xl ring-1 ring-white/60 dark:from-emerald-900/40 dark:via-slate-800 dark:to-violet-900/40 dark:ring-slate-600/50">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_55%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.06),transparent_55%)]" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <Logo size="md" showText={false} linkTo={null} className="hidden sm:flex" />
              <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-900/80 dark:text-teal-300/90">
                Today
              </p>
              <h1 className="mt-2 font-display text-2xl font-semibold text-slate-900 dark:text-slate-100 md:text-3xl">
                Welcome back, {displayName}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-slate-700 dark:text-slate-300">
                Your progress is saved securely. Small steps count—especially on heavy days.
              </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button as={Link} to={ROUTES.chatbot} variant="secondary" size="sm">
                AI support
              </Button>
              <Button as={Link} to={ROUTES.support} variant="ghost" size="sm" className="border border-white/60 bg-white/40">
                Resources
              </Button>
            </div>
          </div>
        </section>

        {loading ? (
          <p className="mt-8 text-center text-sm text-slate-500">Loading your wellness data…</p>
        ) : (
          <>
            <section className="mt-8 grid gap-5 lg:grid-cols-3" aria-labelledby="mood-heading">
              <Card className="lg:col-span-1 p-5">
                <h2 id="mood-heading" className="font-display text-lg text-slate-900 dark:text-slate-100">
                  Mood tracker
                </h2>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Saved to your account{saving ? "…" : ""}</p>
                <div className="mt-4 grid grid-cols-2 gap-1.5">
                  {moods.map((m) => {
                    const Icon = m.icon;
                    const active = mood === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleMood(m.id)}
                        disabled={saving}
                        className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-left text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
                          active
                            ? "border-teal-300 bg-teal-50/80 text-teal-950"
                            : "border-slate-200/70 bg-white/50 dark:border-slate-600 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:border-teal-200"
                        }`}
                      >
                        <Icon className="h-4 w-4 shrink-0" aria-hidden />
                        <span className="font-medium">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </Card>

              <Card className="lg:col-span-2 p-5" aria-labelledby="tasks-heading">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h2 id="tasks-heading" className="font-display text-lg text-slate-900 dark:text-slate-100">
                      Daily wellness tasks
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">Tap to mark complete</p>
                  </div>
                  <span className="rounded-xl border border-white/60 bg-white/50 px-3 py-1 text-xs font-semibold text-teal-900">
                    {completedCount}/{tasksSeed.length}
                  </span>
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {tasksSeed.map((t) => {
                    const Icon = t.icon;
                    const done = tasks[t.id];
                    return (
                      <li key={t.id}>
                        <button
                          type="button"
                          disabled={saving}
                          onClick={() => toggleTask(t.id)}
                          className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-xs transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
                            done
                              ? "border-emerald-200 bg-emerald-50/70 text-emerald-950"
                              : "border-slate-200/70 bg-white/50 dark:border-slate-600 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 hover:border-teal-200"
                          }`}
                        >
                          <span
                            className={`grid h-5 w-5 place-items-center rounded-full border text-[10px] ${
                              done ? "border-emerald-400 bg-emerald-500 text-white" : "border-slate-300 bg-white"
                            }`}
                            aria-hidden
                          >
                            {done ? "✓" : ""}
                          </span>
                          <Icon className="h-4 w-4 text-slate-500" aria-hidden />
                          <span className="font-medium">{t.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </section>

            <section className="mt-8 grid gap-4 sm:grid-cols-3" aria-labelledby="stats-heading">
              <h2 id="stats-heading" className="sr-only">
                Progress statistics
              </h2>
              <Card className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Today</p>
                <p className="mt-1 font-display text-2xl text-slate-900 dark:text-slate-100">{progressPct}%</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Tasks completed</p>
                <div className="mt-3 h-1.5 rounded-full bg-slate-200/80">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </Card>
              <Card className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Streak</p>
                <p className="mt-1 font-display text-2xl text-slate-900 dark:text-slate-100">{stats.streak}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Days with steady progress</p>
              </Card>
              <Card className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Mood check-ins</p>
                <p className="mt-1 font-display text-2xl text-slate-900 dark:text-slate-100">{stats.moodCheckIns}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Recent logged days</p>
              </Card>
            </section>

            <section className="mt-8 grid gap-5 lg:grid-cols-5" aria-labelledby="chart-heading">
              <Card className="lg:col-span-3 p-5">
                <h2 id="chart-heading" className="font-display text-lg text-slate-900 dark:text-slate-100">
                  Weekly progress
                </h2>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">Task completion by day (from your account)</p>
                <div className="mt-3 rounded-xl border border-slate-200/60 bg-gradient-to-b from-white/80 to-slate-50/80 px-2 py-2">
                  <Suspense
                    fallback={
                      <div className="flex h-48 items-center justify-center text-xs text-slate-500">Loading chart…</div>
                    }
                  >
                    <WeeklyProgressChart data={weekSeries.length ? weekSeries : [{ label: "—", value: 0 }]} />
                  </Suspense>
                </div>
              </Card>
              <Card className="lg:col-span-2 bg-gradient-to-br from-emerald-50/80 via-white/60 to-violet-50/70 p-5">
                <h2 className="font-display text-lg text-slate-900 dark:text-slate-100">Motivation</h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Progress is allowed to be uneven. Showing up here is care, not performance.
                </p>
                <div className="mt-4 rounded-xl border border-white/60 bg-white/55 p-3 text-xs text-slate-700 dark:text-slate-300">
                  <HiOutlineCloud className="mb-1.5 h-5 w-5 text-sky-600" aria-hidden />
                  Pick one task below your energy line and finish it slowly.
                </div>
              </Card>
            </section>

            <section className="mt-8" aria-label="Safe Space journal">
              <SafeSpace />
            </section>
          </>
        )}
      </Container>
    </div>
  );
}
