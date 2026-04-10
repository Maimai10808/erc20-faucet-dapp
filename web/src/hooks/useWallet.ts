"use client";

import { useMemo } from "react";
import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { targetChainId } from "@/src/lib/contracts";

export function useWallet() {
  const { address, isConnected, status } = useAccount();
  const chainId = useChainId();

  const { connectAsync, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain();

  const isWrongChain = isConnected && chainId !== targetChainId;

  return useMemo(
    () => ({
      address,
      isConnected,
      status,
      chainId,
      targetChainId,
      isWrongChain,
      isConnecting,
      isSwitchingChain,
      connect: async () => {
        await connectAsync({ connector: injected() });
      },
      disconnect,
      switchToTargetChain: async () => {
        if (!isConnected || chainId === targetChainId) return;
        await switchChainAsync({ chainId: targetChainId });
      },
    }),
    [
      address,
      isConnected,
      status,
      chainId,
      isWrongChain,
      isConnecting,
      isSwitchingChain,
      connectAsync,
      disconnect,
      switchChainAsync,
    ],
  );
}
