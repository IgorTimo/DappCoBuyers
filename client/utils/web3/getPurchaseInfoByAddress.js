import Purchase from "../../Purchase";
import { ethers } from "ethers";


const getPurchaseInfoByAddress = async (address) => {
    const purchase = Purchase(address);
    const info = await purchase.getInfo();
    return  {
        address: address,
        manager: info[0],
        supplier: info[1],
        priceForOneItem: ethers.utils.formatUnits(info[2], 18),
        minItems: ethers.utils.formatUnits(info[3], 0),
        endOfFundraising: info[4],
        totalItemsCount: ethers.utils.formatUnits(info[5], 0),
        isFinished: info[6],
        hashOfAllPurchaseInfo: info[7],
        title: info[8],
        desc: info[9],
      }
}

export default getPurchaseInfoByAddress;