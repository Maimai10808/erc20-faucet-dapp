"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BaseError } from "viem";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { contracts } from "@/src/lib/contracts";
import { useWallet } from "@/src/hooks/useWallet";
import type { ClaimState } from "@/src/types/faucet";

export function useClaimToken(onSuccess?: () => void): ClaimState {
  const wallet = useWallet();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    data: hash,
    writeContractAsync,
    isPending,
    reset: resetWrite,
  } = useWriteContract();

  const receipt = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: Boolean(hash),
    },
  });

  useEffect(() => {
    if (receipt.isSuccess) {
      onSuccess?.();
    }
  }, [receipt.isSuccess, onSuccess]);

  const claim = useCallback(async () => {
    try {
      setSubmitError(null);

      if (!wallet.isConnected) {
        throw new Error("Wallet not connected.");
      }

      if (wallet.isWrongChain) {
        await wallet.switchToTargetChain();
      }

      await writeContractAsync({
        ...contracts.faucet,
        functionName: "requestTokens",
      });
    } catch (error) {
      const message =
        error instanceof BaseError
          ? error.shortMessage || error.message
          : error instanceof Error
            ? error.message
            : "Failed to claim token.";

      setSubmitError(message);
      throw error;
    }
  }, [wallet, writeContractAsync]);

  const reset = useCallback(() => {
    setSubmitError(null);
    resetWrite();
  }, [resetWrite]);

  return useMemo(
    () => ({
      claim,
      hash,
      isPending,
      isConfirming: receipt.isLoading,
      isConfirmed: receipt.isSuccess,
      error: submitError ?? receipt.error?.message ?? null,
      reset,
    }),
    [
      claim,
      hash,
      isPending,
      receipt.isLoading,
      receipt.isSuccess,
      receipt.error?.message,
      submitError,
      reset,
    ],
  );
}
