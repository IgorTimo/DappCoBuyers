import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form, Input, Header, Message } from "semantic-ui-react";
import provider from "../provider";
import Purchase from "../Purchase";
import addPurchaseToCobuyer from "../utils/web2/addPurchaseToCobuyer";
import getCoBuyerPurchases from "../utils/web2/getCoBuyerPurchases";
import participateInPurchase from "../utils/web3/participateInPurchase";

const PurchaseParticipateForm = (props) => {
  const { address, priceForOneItem } = props.info;
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await participateInPurchase(address, items, priceForOneItem);
      addPurchaseToCobuyer(address)
      setIsLoading(false);
      setSuccessMessage(`Hash of transaction: ${response.hash}`);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      success={!!successMessage}
      error={!!errorMessage}
    >
      <Header>Want to participate?</Header>
      <label htmlFor="items"></label>
      <Input
        type="number"
        min="1"
        value={items}
        onChange={(e) => setItems(e.target.value)}
        name="items"
        placeholder="Number of items"
      />
      <Button loading={isLoading} style={{ marginLeft: "5px" }} primary>
        I'm in!
      </Button>
      <h3>Total in ETH: {items ? items * priceForOneItem : 0}</h3>
      <Message
        style={{
          overflowWrap: "break-word",
        }}
        error
        header="Ooops!"
        content={errorMessage}
      />
      <Message
        style={{
          overflowWrap: "break-word",
        }}
        success
        header="Success!"
        content={successMessage}
      />
    </Form>
  );
};

export default PurchaseParticipateForm;
