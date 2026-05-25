"use client";

import { useRouter, usePathname } from "next/navigation";

interface Tab {
  label: string;
  value: string;
}

interface ProductsFilterProps {
  tabs: Tab[];
  currentType: string;
}

export default function ProductsFilter({ tabs, currentType }: ProductsFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (value: string) => {
    const url = value ? `${pathname}?type=${value}` : pathname;
    router.push(url);
  };

  return (
    <div className="flex flex-col gap-1">
      <p className="mb-3" style={{ fontFamily: "Inter, sans-serif", fontSize: "20px", fontWeight: 600, color: "#262626", lineHeight: "28px" }}>
        Category
      </p>
      {tabs.map((tab) => {
        const active = tab.value === currentType;
        return (
          <label
            key={tab.value}
            className="flex items-center gap-3 cursor-pointer py-1 group"
            onClick={() => navigate(tab.value)}
          >
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${
              active
                ? "border-[#262626] bg-[#262626]"
                : "border-[#ccc] bg-white group-hover:border-[#262626]"
            }`}>
              {active && (
                <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: active ? 500 : 400, color: active ? "#262626" : "#6c6c6c", lineHeight: "24px" }}>
              {tab.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
