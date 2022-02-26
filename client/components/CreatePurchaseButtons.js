import { Card, Icon, Button } from "semantic-ui-react";

const CreatePurchaseButtons = (props) => {

  return (
    <>
      <h2 style={{ display: "inline-block" }}>Create yout own purchase with</h2>
      <Button.Group style={{ marginLeft: "20px" }} size="large">
        <Button content="Web3" icon="add circle" primary />
        <Button.Or />
        <Button
          content="Web2"
          icon="add circle"
          style={{ backgroundColor: "#6f0" }}
        />
      </Button.Group>
    </>
  );
};

export default CreatePurchaseButtons;
