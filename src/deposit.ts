import dotenv from "dotenv";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import {
  ORCA_WHIRLPOOLS_CONFIG,
  ORCA_WHIRLPOOL_PROGRAM_ID,
  PoolUtil,
  WhirlpoolContext,
  buildWhirlpoolClient,
  ORCA_SUPPORTED_TICK_SPACINGS,
  PDAUtil,
  WhirlpoolAccount,
  increaseLiquidityQuoteByInputToken,
  WhirlpoolRouterBuilder,
  PoolGraphBuilder,
} from "@orca-so/whirlpools-sdk";
import { MSOL_MINT, SOL_MINT } from "./lib/token-utils.js";
import { Marinade, MarinadeConfig, MarinadeState } from "@marinade.finance/marinade-ts-sdk";
import { AddressUtil } from "@orca-so/common-sdk";
import { OrcaApiClient } from "./lib/api-client.js";
import { PublicKey } from "@solana/web3.js";

dotenv.config();

/**
 * Deposit liquidity into a price range.
 * 1. Get true mSOL price - staked SOL / mSOL token supply
 * 2. Calculate LP position range using some price percentage threshold - e.g. 5% above and below true mSOL price
 * 3. Swap tokens to appropriate allocations
 * 3. Deposit liquidity
 * 4. On next epoch (to be configured), withdraw liquidity, repeat from step 1
 *
 * TODO: How to make this profitable?
 *
 * References:
 * - https://orca-so.gitbook.io/orca-developer-portal/orca/welcome
 * - https://github.com/everlastingsong/tour-de-whirlpool/tree/main/src_localization/EN
 * - https://github.com/orca-so/whirlpools
 * - https://docs.marinade.finance/marinade-protocol/system-overview/msol-token#how-to-use-marinade-state-to-get-msol-data
 * - https://github.com/marinade-finance/marinade-ts-sdk
 */
async function main() {
  const ctx = WhirlpoolContext.withProvider(AnchorProvider.env(), ORCA_WHIRLPOOL_PROGRAM_ID);
  const whirlpoolClient = buildWhirlpoolClient(ctx);

  // Ways to fetch Whirlpools
  // Derive PDA and fetch.
  // List all pools via GPA (filtering to come soon!).
  // List pools via offchain API (https://api.mainnet.orca.so/v1/whirlpool/list).

  // Calculate position price range
  // Get true mSOL price
  // Calculate bounds by some percentage threshold
  const marinade = new Marinade(new MarinadeConfig({ connection: ctx.connection }));
  const state = await MarinadeState.fetch(marinade);
  // state.mSolPrice...

  // Get deposit liquidity quote
  // https://github.com/everlastingsong/tour-de-whirlpool/blob/main/src_localization/EN/033_open_position_in.ts
  // const quote = increaseLiquidityQuoteByInputToken(...)

  // Swap to proper allocations based on quote...
  const graph = await PoolGraphBuilder.buildPoolGraphWithFetch([], ctx.fetcher);
  const router = WhirlpoolRouterBuilder.buildWithPoolGraph(ctx, graph);
  /// const trade = router.findBestRoute(...)

  // Open the position with the quote
  // const pool = await whirlpoolClient.getPool("");
  // pool.openPositionWithMetadata()
}

main()
  .then(() => console.log("done"))
  .catch((err) => console.error(err));
