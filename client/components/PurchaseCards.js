import Link from "next/link";
import { Card } from "semantic-ui-react";

const PurchaseCards = (props) => {
  const {
    address,
    manager,
    supplier,
    priceForOneItem,
    minItems,
    endOfFundraising,
    totalItemsCount,
    hash,
    supplierInfo
  } = props.info;

  return (
    <Card.Group
      style={{
        overflowWrap: "break-word",
      }}
    >
      <Link passHref href={`https://rinkeby.etherscan.io/address/${address}`}>
        <Card link target="_blank">
          <Card.Content
            header={address}
            meta="Address"
            description="Address of this contract on chain Rinkeby"
          />
        </Card>
      </Link>
      <Link passHref href={`https://rinkeby.etherscan.io/address/${manager}`}>
        <Card target="_blank">
          <Card.Content
            header={manager}
            meta="Manager"
            description="The creator and manager of this contract"
          />
        </Card>
      </Link>
      <Link passHref href={`https://rinkeby.etherscan.io/address/${supplier}`}>
        <Card target="_blank">
          <Card.Content
            header={supplier}
            meta="Supplier"
            description="Supplier of this contract. More info you can reed in description"
          />
        </Card>
      </Link>
      {hash && 
      <>
      <Link passHref href={`https://${supplierInfo}`}>
        <Card target="_blank">
          <Card.Content
            header="Supplier Info"
            meta={supplierInfo}
            description="This is the link where you can reed more about supplier of this contract"
          />
        </Card>
      </Link>
      <Card>
        <Card.Content
          header={hash}
          meta="Hash by sha256"
          description="It's hash of concatenated title, description and link to supplier. You can check this hash by yourself to be shure that all info is correct!"
        />
      </Card>
      </>
      }
      <Card>
        <Card.Content
          header={`${priceForOneItem} ETH`}
          meta="Price"
          description="This is price of one item of this purchase. More info you can reed in description"
        />
      </Card>
      <Card>
        <Card.Content
          style={{
            backgroundColor:
              parseInt(totalItemsCount) / parseInt(minItems) >= 1
                ? "lightGreen"
                : "white",
          }}
          header={`${totalItemsCount} / ${minItems}`}
          meta="Now / Target"
          description="It's number of items that already been bought by another co-buyers to minimum number of items to make this purchase successful. More info you can reed in description"
        />
      </Card>
      <Card>
        <Card.Content
          style={{
            backgroundColor:
              endOfFundraising * 1000 > Date.now() ? "lightGreen" : "#ffcccb",
          }}
          header={new Date(endOfFundraising * 1000).toDateString()}
          meta="Date of end"
          description="This day the purchase will bo over. If we can't collect enough co-buyers, you can refund your money."
        />
      </Card>
    </Card.Group>
  );
};

export default PurchaseCards;
