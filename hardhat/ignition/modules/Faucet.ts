import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const INITIAL_SUPPLY = 1_000_000n * 10n ** 18n;
const FAUCET_FUND_AMOUNT = 100_000n * 10n ** 18n;

export default buildModule("FaucetModule", (m) => {
  const tokenName = m.getParameter("tokenName", "WTF Token");
  const tokenSymbol = m.getParameter("tokenSymbol", "WTF");
  const initialSupply = m.getParameter("initialSupply", INITIAL_SUPPLY);
  const faucetFundAmount = m.getParameter(
    "faucetFundAmount",
    FAUCET_FUND_AMOUNT,
  );

  const token = m.contract("MyToken", [tokenName, tokenSymbol, initialSupply]);
  const faucet = m.contract("TokenFaucet", [token]);

  m.call(token, "transfer", [faucet, faucetFundAmount]);

  return { token, faucet };
});
