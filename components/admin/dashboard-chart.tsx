"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface ChartPoint { date: string; questions: number }

export function DashboardChart({ data }: { data: ChartPoint[] }) {
  if (!data.length) {
    return <p className="text-sm text-[#6B6560] text-center py-8">No data yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: "#6B6560" }}
          tickFormatter={(v) => v.slice(5)} // MM-DD
        />
        <YAxis tick={{ fontSize: 10, fill: "#6B6560" }} allowDecimals={false} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderColor: "#C8A96E", borderRadius: 6 }}
          labelStyle={{ color: "#1A1A1A", fontWeight: 600 }}
        />
        <Line
          type="monotone"
          dataKey="questions"
          stroke="#C8A96E"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#C8A96E" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
