import { Form, useLoaderData } from "@remix-run/react";
import type { DataFunctionArgs } from "@remix-run/server-runtime";
import { Fragment } from "react";
import { ButtonPrimary } from "~/components/buttons/ButtonPrimary";
import { Label } from "~/components/forms/Label";
import { InputText } from "~/components/forms/textInputs/InputText";
import { Header } from "~/components/layout/Header";
import { Layout } from "~/components/layout/Layout";
import { List } from "~/components/layout/List";
import { Login } from "~/components/layout/Login";
import { ERC20Tokens } from "~/components/list/ERC20Tokens";
import { Overview } from "~/components/list/Overview";
import { Error } from "~/components/shared/Error";
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

  const loaderData = useLoaderData<LoaderData>();

  if (loaderData?.address === null) {
    return (
      <Login>
        <Form method="get">
          <Label text="Wallet Address goes here" />
          <InputText name="address" type="text" />
          <ButtonPrimary textDefault="Find it" textSubmitting="Finding..." />
        </Form>
      </Login>
    )
  }

  if (loaderData?.tokens === null) {
    return (
      <Login>
        <>
          <Error text={<Fragment>Sorry, <b>{loaderData.address}</b> doesn't look like a valid address!</Fragment>} />
          <ButtonPrimary textDefault="Try again" textSubmitting=""></ButtonPrimary>
        </>
      </Login>
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
  }, { "eth": {}, "erc20List": [] });

  return (
    <>
      <Header />
      <Layout classMain="inner-page">
        <List>
          <>
            <Overview address={loaderData.address} balance={accountBalance.eth} />
            <ERC20Tokens erc20List={accountBalance.erc20List} />
          </>
        </List>
      </Layout>
    </>
  );
}
