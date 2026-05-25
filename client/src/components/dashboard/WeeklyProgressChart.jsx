import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "../../hooks/useTheme";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/80 bg-white/95 px-3 py-2 text-xs shadow-lg backdrop-blur dark:border-slate-600 dark:bg-slate-800/95">
      <p className="font-medium text-slate-800 dark:text-slate-200">{label}</p>
      <p className="text-slate-600 dark:text-slate-400">Wellness score: {payload[0].value}%</p>
    </div>
  );
}

export default function WeeklyProgressChart({ data }) {
  const { isDark } = useTheme();
  const tickFill = isDark ? "#94a3b8" : "#64748b";
  const gridStroke = isDark ? "#334155" : "#e2e8f0";

  return (
    <div className="h-56 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 4, left: -18, bottom: 0 }} barCategoryGap="18%">
          <defs>
            <linearGradient id="mindcareBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5eead4" stopOpacity={0.95} />
              <stop offset="45%" stopColor="#38bdf8" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.85} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={gridStroke} strokeOpacity={0.9} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: tickFill }} axisLine={false} tickLine={false} dy={6} />
          <YAxis
            domain={[0, 100]}
            width={36}
            tick={{ fontSize: 11, fill: tickFill }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}`}
          />
          <Tooltip
            cursor={{ fill: isDark ? "rgba(51, 65, 85, 0.4)" : "rgba(148, 163, 184, 0.1)" }}
            content={<ChartTooltip />}
            wrapperStyle={{ outline: "none" }}
          />
          <Bar dataKey="value" fill="url(#mindcareBar)" radius={[12, 12, 6, 6]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
