interface StatCardProps {
  label: string;
  value: number | string;
  sublabel?: string;
  accent?: boolean;
}

export function StatCard({ label, value, sublabel, accent }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-5 flex flex-col gap-1">
      <p className="text-xs text-[#6B6560] uppercase tracking-wider">{label}</p>
      <p
        className="text-3xl font-semibold"
        style={{ color: accent ? "#C8A96E" : "#1A1A1A" }}
      >
        {value}
      </p>
      {sublabel && <p className="text-xs text-[#6B6560]">{sublabel}</p>}
    </div>
  );
}
