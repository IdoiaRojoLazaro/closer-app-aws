import { TokenHoldings } from '~/data/getAccountTokens.server';
import { ButtonSecondary } from '../buttons/ButtonSecondary';

interface EthRowInterface {
  token: TokenHoldings;
}

export const Row = ({ token }: EthRowInterface) => {
  const { contractName, balance, contractTickerSymbol, logoUrl, contractAddress } = token;
  const handleClick = () => window.open(`https://etherscan.io/token/${contractAddress}`);
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
