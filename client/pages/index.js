import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import provider from "../provider";
import purchaseFactory from "../purchaseFactory";
import CreatePurchaseButtons from "../components/CreatePurchaseButtons";
import ListOfPurchase from "../components/ListOfPurchase";
import getPurchaseInfoByAddress from "../utils/web3/getPurchaseInfoByAddress";

const PurchaseFactoryIndex = (props) => {
  return (
    <Layout>
      <CreatePurchaseButtons />
      <ListOfPurchase deployedPurchases={props.deployedPurchases } purchasesInfo={props.purchasesInfo} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const deployedPurchases = await purchaseFactory.getDeployedPurchases();
  const purchasesInfo = await Promise.all( 
    deployedPurchases.map(address => getPurchaseInfoByAddress(address))
  );
  return {
    props: { deployedPurchases, purchasesInfo },
  };
}

export default PurchaseFactoryIndex;
