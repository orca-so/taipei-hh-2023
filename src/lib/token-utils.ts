import { PoolUtil } from "@orca-so/whirlpools-sdk";
import { WhirlpoolResponse } from "./api-client.js";

export const MSOL_MINT = "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So";
export const SOL_MINT = "So11111111111111111111111111111111111111112";

export function hasTokens(mint1: string, mint2: string) {
  const [mintA, mintB] = PoolUtil.orderMints(mint1, mint2);
  return (whirlpool: WhirlpoolResponse) =>
    whirlpool.tokenA.mint === mintA.toString() && whirlpool.tokenB.mint === mintB.toString();
}
