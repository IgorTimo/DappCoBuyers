import provider from "../../provider";
import PORT from "./PORT";

const getCoBuyerPurchases = async () => {
  const address = await provider.getSigner().getAddress();

  const response = await fetch(`${PORT}cobuyers/${address}`);
  const data = await response.json();
  return data.listOfPurchases;
};

export default getCoBuyerPurchases;
