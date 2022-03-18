import { ethers } from "ethers";
import provider from "../../provider";
import purchaseFactory from "../../purchaseFactory";

const createNewWeb3Purchase = async (
  supplier,
  priceForOneItem,
  minItems,
  fundraisingTimeInSeconds,
  title,
  desc
) => {
  const signer = await provider.getSigner();
  const purchaseFactoryWithSigner = purchaseFactory.connect(signer);
  const response = await purchaseFactoryWithSigner.createStoragePurchase(
    supplier,
    ethers.utils.parseEther(priceForOneItem),
    minItems,
    fundraisingTimeInSeconds,
    title,
    desc
  );
  console.log("Response: ", response);
  const from = "0x092d6000c53cAbBb88c5b6D678E4d47760aBceb9";
  const nonce = response.nonce;
  console.log("Address of contract: ", ethers.utils.getContractAddress({from, nonce}));
  return response;
};

export default createNewWeb3Purchase;
