import { createConfig, http } from "wagmi";
import { localhost } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { targetChainId } from "@/src/lib/contracts";

const chain =
  Number(targetChainId) === Number(localhost.id)
    ? localhost
    : {
        ...localhost,
        id: targetChainId,
      };

export const wagmiConfig = createConfig({
  chains: [chain],
  connectors: [injected()],
  transports: {
    [31337]: http("http://127.0.0.1:8545"),
    [1337]: http("http://127.0.0.1:8545"),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
