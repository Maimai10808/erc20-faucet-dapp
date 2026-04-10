"use client";

import { useMemo } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { contracts } from "@/src/lib/contracts";
import type { FaucetState } from "@/src/types/faucet";

const EMPTY_STATE: FaucetState = {
  tokenSymbol: "",
  tokenDecimals: 18,
  amountAllowed: BigInt(0),
  faucetBalance: BigInt(0),
  userBalance: BigInt(0),
  hasClaimed: false,
  isLoading: true,
  refetch: async () => undefined,
};

export function useFaucetState(): FaucetState {
  const { address } = useAccount();

  const result = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        ...contracts.token,
        functionName: "symbol",
      },
      {
        ...contracts.token,
        functionName: "decimals",
      },
      {
        ...contracts.faucet,
        functionName: "amountAllowed",
      },
      {
        ...contracts.token,
        functionName: "balanceOf",
        args: [contracts.faucet.address],
      },
      ...(address
        ? [
            {
              ...contracts.token,
              functionName: "balanceOf",
              args: [address],
            },
            {
              ...contracts.faucet,
              functionName: "requestedAddress",
              args: [address],
            },
          ]
        : []),
    ],
    query: {
      staleTime: 5_000,
      refetchInterval: 10_000,
    },
  });

  console.log("faucet state result", {
    data: result.data,
    error: result.error,
    isError: result.isError,
    isLoading: result.isLoading,
    status: result.status,
  });

  return useMemo(() => {
    if (!result.data) {
      return {
        ...EMPTY_STATE,
        isLoading: result.isLoading,
        refetch: result.refetch,
      };
    }

    const [
      symbol,
      decimals,
      amountAllowed,
      faucetBalance,
      userBalance,
      hasClaimed,
    ] = result.data as [string, number, bigint, bigint, bigint?, boolean?];

    return {
      tokenSymbol: symbol,
      tokenDecimals: decimals,
      amountAllowed,
      faucetBalance,
      userBalance: userBalance ?? BigInt(0),
      hasClaimed: hasClaimed ?? false,
      isLoading: result.isLoading,
      refetch: result.refetch,
    };
  }, [result.data, result.isLoading, result.refetch]);
}
