import type { TokenHoldings } from '~/data/getAccountTokens.server';
import ethDefaultIcon from '../assets/images/eth-icon.png';
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
                    onError={e => { e.currentTarget.src = ethDefaultIcon; }}
                />
            </div>
            <div className='content'>
                <h3 className='font-inter'>{contractName} <span>({contractTickerSymbol})</span></h3>
                <p>Balance: {balance}</p>
            </div>
            <button className='btn-simple font-inter'>Token page ↗︎</button>
        </div>
    )
}
