import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

type FaucetShellProps = {
  children: ReactNode;
};

export function FaucetShell({ children }: FaucetShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07090f]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-600/18 blur-[120px]" />
        <div className="absolute right-[-8%] top-[5%] h-[24rem] w-[24rem] rounded-full bg-cyan-500/16 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[22rem] w-[22rem] rounded-full bg-violet-700/18 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_22%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_40%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 md:px-8">
        <Card className="w-full rounded-[36px] border border-white/10 bg-white/[0.04] text-white shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          {children}
        </Card>
      </div>
    </main>
  );
}
