import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import provider from "../provider";
import purchaseFactory from "../purchaseFactory";
import { Card, Icon, Button } from "semantic-ui-react";
import CreatePurchaseButtons from "../components/CreatePurchaseButtons";

const PurchaseFactoryIndex = (props) => {

    const renderCards = () => {
        return props.deployedPurchases.map((address) => {
          return (
            <Card
              style={{
                overflowWrap: "break-word",
              }}
            >
              <Card.Content header={address} />
              <Card.Content meta={address} />
              <Card.Content description="description" />
              <Card.Content extra>
                <Icon name="user" />4 Friends
              </Card.Content>
            </Card>
          );
        });
      };
  

  return (
    <Layout>
        <CreatePurchaseButtons deployedPurchases = {props.deployedPurchases} />

      <Card.Group>{renderCards()}</Card.Group>
    </Layout>
  );
};

export async function getServerSideProps() {
  const deployedPurchases = await purchaseFactory.getDeployedPurchases();
  return {
    props: { deployedPurchases },
  };
}

export default PurchaseFactoryIndex;
