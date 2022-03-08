import provider from "../../provider";
import PORT from "./PORT";

const addPurchaseToCobuyer = async (addressOfPurchase) => {
  const addressOfCobuyer = await provider.getSigner().getAddress();

  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      addressOfCobuyer: addressOfCobuyer,
      addressOfPurchase: addressOfPurchase,
    }),
    headers: {
      "Content-type": "application/json",
    },
  };

  const response = await fetch(`${PORT}cobuyers/add_purchase`, requestOptions);
  const data = await response.json();
  console.log(data.msg);



};

export default addPurchaseToCobuyer;
