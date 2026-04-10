export type FaucetState = {
  tokenSymbol: string;
  tokenDecimals: number;
  amountAllowed: bigint;
  faucetBalance: bigint;
  userBalance: bigint;
  hasClaimed: boolean;
  isLoading: boolean;
  refetch: () => Promise<unknown>;
};

export type ClaimState = {
  claim: () => Promise<void>;
  hash?: `0x${string}`;
  isPending: boolean;
  isConfirming: boolean;
  isConfirmed: boolean;
  error: string | null;
  reset: () => void;
};
