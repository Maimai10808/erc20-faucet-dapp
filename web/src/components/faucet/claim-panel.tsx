import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ClaimPanelProps = {
  isConnected: boolean;
  isWrongChain: boolean;
  hasClaimed: boolean;
  buttonText: string;
  buttonDisabled: boolean;
  isPending: boolean;
  isConfirming: boolean;
  error: string | null;
  isConfirmed: boolean;
  onAction: () => void;
};

export function ClaimPanel({
  isConnected,
  isWrongChain,
  hasClaimed,
  buttonText,
  buttonDisabled,
  isPending,
  isConfirming,
  error,
  isConfirmed,
  onAction,
}: ClaimPanelProps) {
  return (
    <Card className="rounded-[30px] border border-white/10 bg-white/[0.03] text-white shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="font-[var(--font-space-grotesk)] text-2xl font-bold tracking-tight text-white">
          Claim portal
        </CardTitle>
        <CardDescription className="text-base font-medium text-white/55">
          A single action flow for local faucet access.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-5 text-sm font-medium leading-7 text-white/70">
          {!isConnected
            ? "Connect your wallet to begin."
            : isWrongChain
              ? "Your wallet is on the wrong network. Switch first, then request faucet tokens."
              : hasClaimed
                ? "This wallet has already claimed from the faucet."
                : "Everything is ready. You can request your test tokens now."}
        </div>

        <Button
          size="lg"
          onClick={onAction}
          disabled={buttonDisabled}
          className="h-14 w-full rounded-full border border-fuchsia-400/20 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-600 text-base font-extrabold text-white shadow-[0_10px_40px_rgba(124,58,237,0.35)] transition hover:scale-[1.01] hover:from-fuchsia-500 hover:via-violet-500 hover:to-cyan-500 disabled:hover:scale-100"
        >
          {(isPending || isConfirming) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {buttonText}
        </Button>

        {(error || isConfirmed) && (
          <div
            className={`rounded-[24px] border p-4 text-sm font-semibold ${
              error
                ? "border-rose-400/20 bg-rose-500/10 text-rose-200"
                : "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
            }`}
          >
            {error
              ? error
              : "Claim successful. Transaction confirmed on-chain."}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
