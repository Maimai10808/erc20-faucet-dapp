import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";

type FaucetHeroProps = {
  hasClaimed: boolean;
  walletAddress?: string;
  isConnected: boolean;
  isWrongChain: boolean;
  networkLabel: string;
};

function formatAddress(address?: string) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function FaucetHero({
  hasClaimed,
  walletAddress,
  isConnected,
  isWrongChain,
  networkLabel,
}: FaucetHeroProps) {
  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
      <div className="max-w-3xl">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-fuchsia-200 hover:bg-fuchsia-500/15">
            Web3 Faucet
          </Badge>

          <Badge
            className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${
              hasClaimed
                ? "border border-white/10 bg-white/10 text-white/80"
                : "border border-cyan-400/20 bg-cyan-500/15 text-cyan-200"
            }`}
          >
            {hasClaimed ? "Claimed" : "Claim available"}
          </Badge>
        </div>

        <CardTitle className="font-[var(--font-space-grotesk)] text-4xl font-extrabold leading-none tracking-[-0.04em] text-white md:text-6xl">
          <span className="block bg-gradient-to-r from-fuchsia-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">
            Token Faucet
          </span>
        </CardTitle>

        <CardDescription className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/68 md:text-lg">
          Connect your wallet, switch to the configured chain, and claim test
          tokens from a premium local faucet interface designed for a more
          immersive Web3 feel.
        </CardDescription>
      </div>

      <div className="min-w-[260px] rounded-[28px] border border-white/10 bg-black/20 p-5 shadow-[0_10px_40px_rgba(0,0,0,0.30)]">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white/65">
          <Sparkles className="h-4 w-4 text-fuchsia-300" />
          Session status
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Wallet
            </p>
            <p className="mt-1 text-sm font-bold text-white">
              {formatAddress(walletAddress)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              className={`rounded-full px-3 py-1 ${
                isConnected
                  ? "bg-emerald-500/15 text-emerald-200"
                  : "bg-white/10 text-white/75"
              }`}
            >
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>

            <Badge
              className={`rounded-full px-3 py-1 ${
                isWrongChain
                  ? "bg-rose-500/15 text-rose-200"
                  : "bg-white/10 text-white/75"
              }`}
            >
              {networkLabel}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
