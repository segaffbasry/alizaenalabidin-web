import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalConversationsToday,
    totalQuestionsToday,
    quotaExhaustedToday,
    recentConversations,
    dailySeries,
  ] = await Promise.all([
    db.conversationLog.count({ where: { startedAt: { gte: todayStart } } }),
    db.conversationLog.aggregate({
      where: { startedAt: { gte: todayStart } },
      _sum: { questionCount: true },
    }),
    db.conversationLog.count({ where: { quotaExhausted: true, startedAt: { gte: todayStart } } }),
    db.conversationLog.findMany({
      where: {},
      orderBy: { startedAt: "desc" },
      take: 10,
      include: { user: { select: { name: true, email: true } } },
    }),
    db.conversationLog.findMany({
      where: { startedAt: { gte: thirtyDaysAgo } },
      select: { startedAt: true, questionCount: true },
    }),
  ]);

  // Aggregate daily question counts for the chart
  const dailyMap: Record<string, number> = {};
  for (const row of dailySeries) {
    const day = row.startedAt.toISOString().slice(0, 10);
    dailyMap[day] = (dailyMap[day] ?? 0) + row.questionCount;
  }
  const chartData = Object.entries(dailyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, questions]) => ({ date, questions }));

  return NextResponse.json({
    totalConversationsToday,
    totalQuestionsToday: totalQuestionsToday._sum.questionCount ?? 0,
    quotaExhaustedToday,
    recentConversations,
    chartData,
  });
}
