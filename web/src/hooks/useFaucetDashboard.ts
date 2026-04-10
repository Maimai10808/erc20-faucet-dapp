"use client";

import { useCallback, useMemo } from "react";
import { formatUnits } from "viem";

import { useWallet } from "@/src/hooks/useWallet";
import { useFaucetState } from "@/src/hooks/useFaucetState";
import { useClaimToken } from "@/src/hooks/useClaimToken";

export function useFaucetDashboard() {
  const wallet = useWallet();
  const faucet = useFaucetState();
  const claim = useClaimToken(() => {
    void faucet.refetch();
  });

  const claimAmountText = useMemo(() => {
    return faucet.tokenSymbol
      ? `${formatUnits(faucet.amountAllowed, faucet.tokenDecimals)} ${faucet.tokenSymbol}`
      : `${formatUnits(faucet.amountAllowed, faucet.tokenDecimals)}`;
  }, [faucet.amountAllowed, faucet.tokenDecimals, faucet.tokenSymbol]);

  const faucetBalanceText = useMemo(() => {
    return faucet.tokenSymbol
      ? `${formatUnits(faucet.faucetBalance, faucet.tokenDecimals)} ${faucet.tokenSymbol}`
      : `${formatUnits(faucet.faucetBalance, faucet.tokenDecimals)}`;
  }, [faucet.faucetBalance, faucet.tokenDecimals, faucet.tokenSymbol]);

  const userBalanceText = useMemo(() => {
    return faucet.tokenSymbol
      ? `${formatUnits(faucet.userBalance, faucet.tokenDecimals)} ${faucet.tokenSymbol}`
      : `${formatUnits(faucet.userBalance, faucet.tokenDecimals)}`;
  }, [faucet.userBalance, faucet.tokenDecimals, faucet.tokenSymbol]);

  const networkLabel = useMemo(() => {
    return wallet.isConnected
      ? wallet.isWrongChain
        ? "Wrong network"
        : `Chain ${wallet.chainId}`
      : "Disconnected";
  }, [wallet.isConnected, wallet.isWrongChain, wallet.chainId]);

  const buttonText = useMemo(() => {
    if (!wallet.isConnected) return "Connect wallet";
    if (wallet.isWrongChain) return "Switch network";
    if (faucet.hasClaimed) return "Already claimed";
    if (claim.isPending) return "Confirm in wallet...";
    if (claim.isConfirming) return "Claiming...";
    return `Claim ${claimAmountText}`;
  }, [
    wallet.isConnected,
    wallet.isWrongChain,
    faucet.hasClaimed,
    claim.isPending,
    claim.isConfirming,
    claimAmountText,
  ]);

  // 关键修复：
  // 未连接钱包时不要禁用按钮
  // 链错误时也不要禁用按钮
  const buttonDisabled = useMemo(() => {
    return claim.isPending || claim.isConfirming || faucet.hasClaimed;
  }, [claim.isPending, claim.isConfirming, faucet.hasClaimed]);

  const handlePrimaryAction = useCallback(async () => {
    if (!wallet.isConnected) {
      await wallet.connect();
      return;
    }

    if (wallet.isWrongChain) {
      await wallet.switchToTargetChain();
      return;
    }

    if (!faucet.hasClaimed) {
      await claim.claim();
    }
  }, [wallet, faucet.hasClaimed, claim]);

  return {
    wallet,
    faucet,
    claim,
    view: {
      claimAmountText,
      faucetBalanceText,
      userBalanceText,
      networkLabel,
      buttonText,
      buttonDisabled,
    },
    actions: {
      handlePrimaryAction,
    },
  };
}
