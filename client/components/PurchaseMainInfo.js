import { Card } from "semantic-ui-react";

const PurchaseMainInfo = (props) => {
  const { isFinished, title, desc } = props.info;

  return (
    <Card
      fluid
      color={isFinished ? "red" : "green"}
      header={title}
      meta={isFinished ? "Finished" : "Active"}
      description={desc}
    />
  );
};

export default PurchaseMainInfo;
