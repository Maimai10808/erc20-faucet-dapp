"use client";

import { Coins, Droplets, ShieldCheck, Wallet } from "lucide-react";

import { CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { FaucetShell } from "@/src/components/faucet/faucet-shell";
import { FaucetHero } from "@/src/components/faucet/faucet-hero";
import { MetricCard } from "@/src/components/faucet/metric-card";
import { ClaimPanel } from "@/src/components/faucet/claim-panel";
import { RuntimePanel } from "@/src/components/faucet/runtime-panel";
import { useFaucetDashboard } from "@/src/hooks/useFaucetDashboard";

export function FaucetDashboard() {
  const { wallet, faucet, claim, view, actions } = useFaucetDashboard();

  return (
    <FaucetShell>
      <CardHeader className="border-b border-white/10 px-6 py-6 md:px-8 md:py-8">
        <FaucetHero
          hasClaimed={faucet.hasClaimed}
          walletAddress={wallet.address}
          isConnected={wallet.isConnected}
          isWrongChain={wallet.isWrongChain}
          networkLabel={view.networkLabel}
        />
      </CardHeader>

      <CardContent className="px-6 py-6 md:px-8 md:py-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Claim Amount"
            value={view.claimAmountText}
            icon={<Droplets className="h-4 w-4" />}
            glow="purple"
          />
          <MetricCard
            label="Faucet Balance"
            value={view.faucetBalanceText}
            icon={<Coins className="h-4 w-4" />}
            glow="blue"
          />
          <MetricCard
            label="Your Balance"
            value={view.userBalanceText}
            icon={<Wallet className="h-4 w-4" />}
            glow="emerald"
          />
          <MetricCard
            label="Claim Status"
            value={faucet.hasClaimed ? "Already claimed" : "Ready to claim"}
            icon={<ShieldCheck className="h-4 w-4" />}
            glow="purple"
          />
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <ClaimPanel
            isConnected={wallet.isConnected}
            isWrongChain={wallet.isWrongChain}
            hasClaimed={faucet.hasClaimed}
            buttonText={view.buttonText}
            buttonDisabled={view.buttonDisabled}
            isPending={claim.isPending}
            isConfirming={claim.isConfirming}
            error={claim.error}
            isConfirmed={claim.isConfirmed}
            onAction={() => void actions.handlePrimaryAction()}
          />

          <RuntimePanel
            networkLabel={view.networkLabel}
            isWrongChain={wallet.isWrongChain}
            walletAddress={wallet.address}
            isConnected={wallet.isConnected}
            isLoading={faucet.isLoading}
            hasClaimed={faucet.hasClaimed}
          />
        </div>
      </CardContent>
    </FaucetShell>
  );
}
