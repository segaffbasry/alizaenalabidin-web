export const TANYA_COOKIE = "tanya_session";
export const FREE_QUESTION_LIMIT = 10;

export interface TanyaSession {
  sessionId: string;
  questionsUsed: number;
  createdAt: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export function remainingQuestions(session: TanyaSession): number {
  return Math.max(0, FREE_QUESTION_LIMIT - session.questionsUsed);
}

// Counter badge color: green → amber → red as quota depletes
export function quotaColor(remaining: number): string {
  if (remaining > 6) return "#6B6560";
  if (remaining > 3) return "#C8A96E";
  return "#C0392B";
}
