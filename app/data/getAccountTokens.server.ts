import BigNumber from "bignumber.js";
import camelcaseKeys from "camelcase-keys";

export interface TokenHoldings {
  contractDecimals: number;
  contractName: string;
  contractTickerSymbol: string;
  contractAddress: string;
  supportsErc: null | Array<string>;
  logoUrl: string;
  lastTransferredAt: string;
  type: string;
  balance: string;
  balance24h: string;
  formattedBalance: BigNumber;
  quoteRate: number;
  quoteRate24h: number;
  quote: number;
  quote24h: number;
}

// Works with Ethereum addresses or ENS names like frm.eth
export default async function getAccountTokens(
  ethAddress: string
): Promise<TokenHoldings[] | null> {
  const response = await fetch(
    `https://api.covalenthq.com/v1/1/address/${ethAddress}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=${process.env.API_KEY}`
  );
  const data = camelcaseKeys(await response.json(), { deep: true }).data;

  // If address is invalid, this will return here!
  if (!data) return null;

  return data.items.map((item: any) => ({
    ...item,
    formattedBalance: new BigNumber(item.balance).div(
      `1e${item.contractDecimals}`
    ),
  }));
}
