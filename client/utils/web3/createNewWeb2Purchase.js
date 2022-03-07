import { ethers } from "ethers";
import provider from "../../provider";
import purchaseFactory from "../../purchaseFactory";

const createNewWeb2Purchase = async (
  supplier,
  priceForOneItem,
  minItems,
  fundraisingTimeInSeconds,
  hash
) => {
  const signer = await provider.getSigner();
  const purchaseFactoryWithSigner = purchaseFactory.connect(signer);
  const response = await purchaseFactoryWithSigner.createHashPurchase(
    supplier,
    ethers.utils.parseEther(priceForOneItem),
    minItems,
    fundraisingTimeInSeconds,
    ("0x" + hash)
  );
  return response;
};

export default createNewWeb2Purchase;
