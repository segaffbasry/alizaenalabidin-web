export default function TanyaLoading() {
  return (
    <div className="relative h-screen flex flex-col bg-[#F5F0E8] overflow-hidden items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing logo mark */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-[#C8A96E]/20 animate-ping" />
          <div className="relative w-16 h-16 rounded-full bg-[#C8A96E]/10 flex items-center justify-center">
            <span className="font-display text-2xl text-[#C8A96E]">A</span>
          </div>
        </div>
        <p className="font-body text-sm text-[#6B6560] animate-pulse">Memuat Tanya Ali…</p>
      </div>
    </div>
  );
}
