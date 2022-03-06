import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form, Input, Header, Message } from "semantic-ui-react";
import provider from "../provider";
import Purchase from "../Purchase";

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
      const purchase = Purchase(address);
      const signer = await provider.getSigner();
      const purchaseWithSigner = purchase.connect(signer);
      const totalAmount = items * priceForOneItem;
      const response = await purchaseWithSigner.participate(items, {
        value: ethers.utils.parseEther(totalAmount.toString()),
      });
      console.log("response: ", response);
      setIsLoading(false);
      setSuccessMessage(`Hash of transaction: ${response.hash}`);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
    router.replace(`/purchase/show?address=${address}`);
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
      <Message error header="Ooops!" content={errorMessage} />
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
