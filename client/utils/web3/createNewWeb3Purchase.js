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
  return response;
};

export default createNewWeb3Purchase;
