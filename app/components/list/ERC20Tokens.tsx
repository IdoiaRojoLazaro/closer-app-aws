import { TokenHoldings } from '~/data/getAccountTokens.server';
import { ListSection } from '../layout/ListSection';
import { Row } from '../rows/Row';

export const ERC20Tokens = ({ erc20List }: { erc20List: TokenHoldings[] }) => {
  return (
    <ListSection title={`ERC-20 Tokens (${erc20List.length})`}>
      <>
        {erc20List.map((erc20: TokenHoldings, index: number) => (
          <li key={`${index}{erc20.contractTickerSymbol}`}>
            <Row token={erc20} />
          </li>
        ))}
      </>
    </ListSection>
  )
}
