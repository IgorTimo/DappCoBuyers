import { useState, useEffect } from "react";
import { Menu, Segment } from "semantic-ui-react";
import Layout from "../components/Layout";
import ListOfPurchase from "../components/ListOfPurchase";
import getCoBuyerPurchases from "../utils/web2/getCoBuyerPurchases";
import getPurchaseInfoByAddress from "../utils/web3/getPurchaseInfoByAddress";

const User = (props) => {
  const [activeItem, setActiveItem] = useState("coBuyer");
  const [listOfPurchases, setListOfPurchases] = useState([]);

  useEffect(() => {
    getCoBuyerPurchases()
      .then((listOfPurchases) =>
        Promise.all(
          listOfPurchases.map((address) => getPurchaseInfoByAddress(address))
        )
      )
      .then(setListOfPurchases);
  }, []);

  return (
    <Layout>
      <Menu attached="top" tabular>
        <Menu.Item
          name="CoBuyer"
          active={activeItem === "coBuyer"}
          onClick={() => setActiveItem("coBuyer")}
        />
        <Menu.Item
          name="Manager"
          active={activeItem === "manager"}
          onClick={() => setActiveItem("manager")}
        />
      </Menu>
      <Segment>
        <ListOfPurchase purchasesInfo={listOfPurchases} />
      </Segment>
    </Layout>
  );
};

export async function getServerSideProps(props) {
  const account = props.query.account;
  return {
    props: { account },
  };
}

export default User;
