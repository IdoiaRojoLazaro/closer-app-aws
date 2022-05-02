import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { EthRow } from "~/components/EthRow";
import { SubmitButton } from "~/components/SubmitButton";
import type { TokenHoldings } from "~/data/getAccountTokens.server";
import getAccountTokens from "~/data/getAccountTokens.server";

type LoaderData = Awaited<ReturnType<typeof loader>>;

export let loader = async ({ request }: DataFunctionArgs) => {
  const url = new URL(request.url);
  const term = url.searchParams.get("address");
  const address = term;

  if (!address) return { address: null };

  const tokens = await getAccountTokens(address);

  if (!tokens) return { address, tokens: null };

  return { term, address, tokens };
};

export default function Index() {
  const navigate = useNavigate();
  const loaderData = useLoaderData<LoaderData>();

  if (loaderData?.address === null) {
    return (
      <main className="p-8 login">
        <h1>Wallets detective ️🐕</h1>
        <div className="card">
          <Form method="get">
            <label>Wallet Address goes here</label>
            <input name="address" type="text" required />
            <SubmitButton />
          </Form>
        </div>
      </main>
    )
  }

  if (loaderData?.tokens === null) {
    return (
      <main className="p-8 login">
        <h1>Wallets detective ️🐕</h1>
        <div className="card">
          <p className="error">Sorry, <b>{loaderData.address}</b> doesn't look like a valid address!</p>
          <button className="btn">Try again</button>
        </div>
      </main>
    );
  }
  interface accountBalanceInterface {
    eth: any;
    erc20List: TokenHoldings[];
  }

  const accountBalance = loaderData.tokens.reduce((accountBalance: accountBalanceInterface, token) => {
    if (token.contractName === "Ether") {
      accountBalance.eth = token;
    } else if (token.supportsErc !== null && token.supportsErc?.includes("erc20")) {
      accountBalance.erc20List.push(token);
    }
    return accountBalance;
  }, { "eth": {}, "erc20List": [] })

  const goToForm = () => navigate('/');

  return (
    <>
      <header>
        <h1 onClick={goToForm}>Wallets detective ️🐕</h1>
      </header>
      <main className="p-8 inner-page">
        <div className="container">
          <h2 className="sec-title">Overview</h2>
          <ul className="flex flex-col gap-2 section">
            <div className="eth-row">
              <div className='content'>
                <h3>Address</h3>
                <p>{loaderData.address}</p>
              </div>
            </div>
            <EthRow token={accountBalance.eth} />
          </ul>
          <h2 className="sec-title">ERC-20 Tokens ({accountBalance.erc20List.length})</h2>

          <ul className="flex flex-col gap-2 section">
            {accountBalance.erc20List.map((erc20: TokenHoldings, index: number) => (
              <li key={`${index}{erc20.contractTickerSymbol}`}>
                <EthRow token={erc20} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
