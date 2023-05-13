import fetch from "node-fetch";
import invariant from "tiny-invariant";

const ORCA_MAINNET_URL = "https://api.mainnet.orca.so/v1";

export class OrcaApiClient {
  constructor(private readonly baseUrl: string = ORCA_MAINNET_URL) {}

  async listWhirlpools(): Promise<WhirlpoolResponse[]> {
    const response = await fetch(`${this.baseUrl}/whirlpool/list`);
    invariant(response.ok, "Error fetching /whirlpool/list");
    const data = (await response.json()) as ListWhirlpoolsResponse;
    return data.whirlpools;
  }
}

interface ListWhirlpoolsResponse {
  hasMore: boolean;
  whirlpools: WhirlpoolResponse[];
}

export interface WhirlpoolResponse {
  address: string;
  tokenA: TokenResponse;
  tokenB: TokenResponse;
  tickSpacing: number;
  tvl: number;
}

interface TokenResponse {
  mint: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
  coingeckoId: string;
  whitelisted: boolean;
  poolToken: boolean;
}
