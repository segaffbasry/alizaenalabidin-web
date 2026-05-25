import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tanya Ali — Life Transformation AI",
  description:
    "Ask Ali anything about life, purpose, and mindfulness. 10 free questions for every guest.",
};

// This layout intentionally does NOT include Navbar or Footer —
// /tanya is a focused chat experience, eventually hosted at tanya.alizaenalabidin.com
export default function TanyaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
