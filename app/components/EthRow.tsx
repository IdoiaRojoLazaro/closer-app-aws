import { TokenHoldings } from '~/data/getAccountTokens.server';

interface EthRowInterface {
    token: TokenHoldings;
}

export const EthRow = ({ token }: EthRowInterface) => {
    const { contractName, balance, contractTickerSymbol, logoUrl } = token;
    return (
        <div className="eth-row">
            <div className='icon'>
                <img src={logoUrl}
                    alt=""
                    onError={e => { e.currentTarget.src = "/images/eth-icon.png"; }}
                />
            </div>
            <div className='content'>
                <h3>{contractName} <span>({contractTickerSymbol})</span></h3>
                <p>Balance: {balance}</p>
            </div>
            <button className='btn-simple'>Token page ↗︎</button>
        </div>
    )
}
