import { ethers } from "ethers";
import provider from "../../provider";
import Purchase from "../../Purchase";

const participateInPurchase = async (address, items, priceForOneItem) => {
    const purchase = Purchase(address);
    const signer = await provider.getSigner();
    const purchaseWithSigner = purchase.connect(signer);
    const totalAmount = items * priceForOneItem;
    return await purchaseWithSigner.participate(items, {
      value: ethers.utils.parseEther(totalAmount.toString()),
    });
}

export default participateInPurchase;