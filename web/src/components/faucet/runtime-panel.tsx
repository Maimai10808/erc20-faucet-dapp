import { Waypoints } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RuntimePanelProps = {
  networkLabel: string;
  isWrongChain: boolean;
  walletAddress?: string;
  isConnected: boolean;
  isLoading: boolean;
  hasClaimed: boolean;
};

function formatAddress(address?: string) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function RuntimePanel({
  networkLabel,
  isWrongChain,
  walletAddress,
  isConnected,
  isLoading,
  hasClaimed,
}: RuntimePanelProps) {
  return (
    <Card className="rounded-[30px] border border-white/10 bg-white/[0.03] text-white shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="font-[var(--font-space-grotesk)] text-2xl font-bold tracking-tight text-white">
          Runtime overview
        </CardTitle>
        <CardDescription className="text-base font-medium text-white/55">
          Live wallet and faucet diagnostics.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                <Waypoints className="h-4 w-4 text-cyan-200" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Network</p>
                <p className="mt-1 text-sm font-medium text-white/60">
                  {networkLabel}
                </p>
              </div>
            </div>

            <Badge
              className={`rounded-full px-3 py-1 ${
                isWrongChain
                  ? "bg-rose-500/15 text-rose-200"
                  : "bg-cyan-500/15 text-cyan-200"
              }`}
            >
              {isWrongChain ? "Mismatch" : "Aligned"}
            </Badge>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white">Wallet</p>
              <p className="mt-1 text-sm font-medium text-white/60">
                {formatAddress(walletAddress)}
              </p>
            </div>
            <Badge
              className={`rounded-full px-3 py-1 ${
                isConnected
                  ? "bg-emerald-500/15 text-emerald-200"
                  : "bg-white/10 text-white/75"
              }`}
            >
              {isConnected ? "Connected" : "Idle"}
            </Badge>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white">Faucet status</p>
              <p className="mt-1 text-sm font-medium text-white/60">
                {isLoading ? "Loading state..." : "Operational"}
              </p>
            </div>
            <Badge
              className={`rounded-full px-3 py-1 ${
                hasClaimed
                  ? "bg-white/10 text-white/75"
                  : "bg-fuchsia-500/15 text-fuchsia-200"
              }`}
            >
              {hasClaimed ? "Locked" : "Open"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
