import { FooterRed } from "@/components/layout/footer-red";

export default function RevisiHidupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FooterRed />
    </>
  );
}
