import { StatCard } from "@/components/admin/stat-card";
import { DashboardChart } from "@/components/admin/dashboard-chart";
import { DataTable } from "@/components/admin/data-table";
import { db } from "@/lib/db";

async function getStats() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [convToday, questionsAgg, quotaHits, recent, series] = await Promise.all([
    db.conversationLog.count({ where: { startedAt: { gte: todayStart } } }),
    db.conversationLog.aggregate({
      where: { startedAt: { gte: todayStart } },
      _sum: { questionCount: true },
    }),
    db.conversationLog.count({ where: { quotaExhausted: true, startedAt: { gte: todayStart } } }),
    db.conversationLog.findMany({
      orderBy: { startedAt: "desc" }, take: 10,
      include: { user: { select: { name: true, email: true } } },
    }),
    db.conversationLog.findMany({
      where: { startedAt: { gte: thirtyDaysAgo } },
      select: { startedAt: true, questionCount: true },
    }),
  ]);

  const dailyMap: Record<string, number> = {};
  for (const r of series) {
    const day = r.startedAt.toISOString().slice(0, 10);
    dailyMap[day] = (dailyMap[day] ?? 0) + r.questionCount;
  }
  const chartData = Object.entries(dailyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, questions]) => ({ date, questions }));

  return {
    convToday, questionsToday: questionsAgg._sum.questionCount ?? 0,
    quotaHits, recent, chartData,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const tableColumns = [
    { key: "id", header: "Session ID", render: (r: Record<string, unknown>) => <span className="font-mono text-xs text-[#6B6560]">{String(r.id).slice(0, 12)}…</span> },
    { key: "user", header: "User", render: (r: Record<string, unknown>) => {
      const u = r.user as { name?: string; email?: string } | null;
      return <span>{u?.name ?? u?.email ?? "Guest"}</span>;
    }},
    { key: "questionCount", header: "Questions", render: (r: Record<string, unknown>) => <span>{String(r.questionCount)}</span> },
    { key: "quotaExhausted", header: "Quota Hit", render: (r: Record<string, unknown>) => (
      <span className={r.quotaExhausted ? "text-amber-600 font-medium" : "text-[#6B6560]"}>
        {r.quotaExhausted ? "Yes" : "No"}
      </span>
    )},
    { key: "startedAt", header: "Started", render: (r: Record<string, unknown>) => (
      <span className="text-xs">{new Date(r.startedAt as string).toLocaleString("id-ID")}</span>
    )},
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-[#1A1A1A]">Dashboard</h1>
        <p className="text-sm text-[#6B6560] mt-0.5">Today&apos;s overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Conversations Today" value={stats.convToday} />
        <StatCard label="Questions Asked" value={stats.questionsToday} />
        <StatCard label="Quota Exhausted" value={stats.quotaHits} sublabel="Conversion signal" accent />
        <StatCard label="Active KnowledgeBank" value={await db.knowledgeEntry.count({ where: { isActive: true } })} />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-[#1A1A1A] mb-4">Questions per Day — Last 30 Days</h2>
        <DashboardChart data={stats.chartData} />
      </div>

      {/* Recent conversations */}
      <div>
        <h2 className="text-sm font-semibold text-[#1A1A1A] mb-3">Recent Conversations</h2>
        <DataTable columns={tableColumns} data={stats.recent as Record<string, unknown>[]} />
      </div>
    </div>
  );
}
