import { useState, useEffect } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import provider from "../provider";
import Purchase from "../Purchase";

const MakePurchaseAndRefundButtons = (props) => {
  const {
    address,
    totalItemsCount,
    minItems,
    manager,
    isFinished,
    endOfFundraising,
  } = props.info;
  const [currentAccount, setCurrentAccount] = useState();
  const [itemsOfCurrentAccount, setItemsOfCurrentAccount] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  useEffect(() => {
    setInfoOfCurrentAccount();
  }, []);

  const setInfoOfCurrentAccount = async () => {
    const purchase = Purchase(address);
    const currentAccount = await provider.getSigner().getAddress();
    setCurrentAccount(currentAccount);
    const itemsCount = await purchase.cutomersToItems(currentAccount);
    setItemsOfCurrentAccount(itemsCount);
  };

  const isMakePurchaseEnabled = () => {
    if (
      parseInt(totalItemsCount) >= parseInt(minItems) &&
      currentAccount === manager &&
      !isFinished
    ) {
      return true;
    }

    if (
      parseInt(totalItemsCount) >= parseInt(minItems) &&
      !isFinished &&
      Date.now() > endOfFundraising * 1000 &&
      itemsOfCurrentAccount > 0
    ) {
      return true;
    }

    return false;
  };

  const isRefundEnabled = () => {
    if (
      parseInt(totalItemsCount) < parseInt(minItems) &&
      !isFinished &&
      Date.now() > endOfFundraising * 1000 &&
      itemsOfCurrentAccount > 0
    ) {
      return true;
    }

    return false;
  };

  const contactWithContract = async (makeSomeAction) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const purchase = Purchase(address);
      const signer = await provider.getSigner();
      const purchaseWithSigner = purchase.connect(signer);
      const response = await makeSomeAction(purchaseWithSigner);
      console.log("response: ", response);
      setSuccessMessage(`Hash of transaction: ${response.hash}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const managerPurchase = async (purchaseWithSigner) => {
    return await purchaseWithSigner.makePurchase();
  }

  const customerPurchase = async (purchaseWithSigner) => {
    return await purchaseWithSigner.makePurchaseByCustomer();
  }

  const customerRefund = async (purchaseWithSigner) => {
      return await purchaseWithSigner.refund();
  }

  const handleManagerPurchaseClick = async () => {
    console.log("Purchase manager clicked");
    contactWithContract(managerPurchase);
  };

  const handleCutomerPurchaseClick = async () => {
    console.log("Purchase customer clicked");
    contactWithContract(customerPurchase);
  };

  const handleRefundClick = () => {
    console.log("Refund");
    contactWithContract(customerRefund);
  };

  return (
    <>
      <h3>Avaliable Actions</h3>
      <Form success={!!successMessage} error={!!errorMessage}>
        <Button
          disabled={!isMakePurchaseEnabled()}
          primary
          onClick={
            currentAccount === manager
              ? handleManagerPurchaseClick
              : handleCutomerPurchaseClick
          }
        >
          Make Purchase
        </Button>
        <Button
          disabled={!isRefundEnabled()}
          primary
          onClick={handleRefundClick}
        >
          Refund
        </Button>

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
    </>
  );
};

export default MakePurchaseAndRefundButtons;
