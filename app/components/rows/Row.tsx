import { TokenHoldings } from '~/data/getAccountTokens.server';
import { ButtonSecondary } from '../buttons/ButtonSecondary';

interface EthRowInterface {
  token: TokenHoldings;
  etherscanUrl?: string;
}

export const Row = ({ token, etherscanUrl = "token" }: EthRowInterface) => {
  const { contractName, balance, contractTickerSymbol, logoUrl, contractAddress } = token;
  const handleClick = () => window.open(`https://etherscan.io/${etherscanUrl
    }/${contractAddress}`);
  return (
    <div className="row">
      <div className="icon">
        <img
          src={logoUrl}
          alt=""
          onError={(e) => {
            e.currentTarget.src = '/images/eth-icon.png';
          }}
        />
      </div>
      <div className="coin-value">
        <h3>
          {contractName} <span>({contractTickerSymbol})</span>
        </h3>
        <p>Balance: {balance}</p>
      </div>
      <ButtonSecondary text="Token page ↗︎" handleClick={handleClick} />
    </div>
  );
}
