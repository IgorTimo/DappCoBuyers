import { ethers } from "ethers";
import { Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";
import PurchaseCards from "../../components/PurchaseCards";
import PurchaseMainInfo from "../../components/PurchaseMainInfo";
import PurchaseParticipateForm from "../../components/PurchaseParticipateForm";
import Purchase from "../../Purchase";
import getPurchaseInfoByAddress from "../../utils/web3/getPurchaseInfoByAddress";

const ShowPurchase = (props) => {
  return (
    <Layout>
      <PurchaseMainInfo info={props.info} />
      <Grid columns={2}>
        <Grid.Column width={10}>
          <PurchaseCards info={props.info} />
        </Grid.Column>
        <Grid.Column width={6}>
          <PurchaseParticipateForm info={props.info} />
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps(props) {
  const address = props.query.address;
  const info = await getPurchaseInfoByAddress(address);
  return {
    props: {
      info: info,
    },
  };
}

export default ShowPurchase;
