import provider from "../../provider";
import PORT from "./PORT";

const getCoBuyerPurchases = async () => {

  const address = await provider.getSigner().getAddress();

  console.log("address", address);

  const response = await fetch(`${PORT}cobuyers/${address}`);
  const data = await response.json();
  console.log("coBuyer: ", data.coBuyer);
};

export default getCoBuyerPurchases;
