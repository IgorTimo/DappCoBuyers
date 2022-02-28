import Link from "next/link";
import { Card, Icon } from "semantic-ui-react";
import purchaseFactory from "../purchaseFactory";

const ListOfPurchase = (props) => {
  const renderCards = () => {
    return props.purchasesInfo.map((info) => {
      const { address, title, desc, totalItemsCount, minItems } = info;
      return (
        <Link
          key={address}
          href={{
            pathname: "/purchase/show",
            query: { address: address },
          }}
        >
          <Card
            link
            style={{
              overflowWrap: "break-word",
            }}
          >
            <Card.Content header={title} />
            <Card.Content meta={address} />
            <Card.Content description={desc} />
            <Card.Content extra>
              <Icon name="user" />
              {totalItemsCount} / {minItems} Co-Buyers
            </Card.Content>
          </Card>
        </Link>
      );
    });
  };
  return <Card.Group>{renderCards()}</Card.Group>;
};

export default ListOfPurchase;
