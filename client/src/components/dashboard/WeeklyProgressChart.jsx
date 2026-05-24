import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/80 bg-white/95 px-3 py-2 text-xs shadow-lg backdrop-blur">
      <p className="font-medium text-slate-800">{label}</p>
      <p className="text-slate-600">Wellness score: {payload[0].value}%</p>
    </div>
  );
}

export default function WeeklyProgressChart({ data }) {
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
          <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" strokeOpacity={0.9} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            dy={6}
          />
          <YAxis
            domain={[0, 100]}
            width={36}
            tick={{ fontSize: 11, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}`}
          />
          <Tooltip
            cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
            content={<ChartTooltip />}
            wrapperStyle={{ outline: "none" }}
          />
          <Bar dataKey="value" fill="url(#mindcareBar)" radius={[12, 12, 6, 6]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
