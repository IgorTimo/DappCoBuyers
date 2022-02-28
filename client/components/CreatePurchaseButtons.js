import Link from "next/link";
import { Card, Icon, Button } from "semantic-ui-react";

const CreatePurchaseButtons = (props) => {

  return (
    <>
      <h2 style={{ display: "inline-block" }}>Create yout own purchase with</h2>
      <Button.Group style={{ marginLeft: "20px", marginRight: "20px" }} size="large">
      <Link href="purchase/new/web3"><a>
        <Button content="Web3" icon="add circle" primary /></a></Link>
        <Button.Or />
        <Link href="purchase/new/web2"><a>
        <Button
          content="Web2"
          icon="add circle"
          style={{ backgroundColor: "lightGreen" }}
        /></a></Link>
      </Button.Group>
      <h2 style={{ display: "inline-block" }}>or choose one of this!</h2>
    </>
  );
};

export default CreatePurchaseButtons;
