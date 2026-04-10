import {
  tokenAbi,
  tokenAddress,
  faucetAbi,
  faucetAddress,
  deploymentMeta,
} from "@generated/contracts";

export const contracts = {
  token: {
    address: tokenAddress,
    abi: tokenAbi,
  },
  faucet: {
    address: faucetAddress,
    abi: faucetAbi,
  },
  deployment: deploymentMeta,
} as const;

export const targetChainId = deploymentMeta.chainId;

console.log("frontend contracts", {
  tokenAddress,
  faucetAddress,
  deploymentMeta,
});
