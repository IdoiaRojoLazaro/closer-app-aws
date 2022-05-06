import type { TokenHoldings } from '~/data/getAccountTokens.server'
import { ListSection } from '../layout/ListSection'
import { AddressRow } from '../rows/AddressRow'
import { Row } from '../rows/Row'

export const Overview = ({ address, balance }: { address: string, balance: TokenHoldings }) => {
  return (
    <ListSection title='Overview'>
      <>
        <AddressRow>
          <>
            <h3>Address</h3>
            <p>{address}</p>
          </>
        </AddressRow>
        <Row token={balance} goToAddress={address} />
      </>
    </ListSection>
  )
}
