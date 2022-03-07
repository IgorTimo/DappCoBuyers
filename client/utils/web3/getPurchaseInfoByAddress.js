import Purchase from "../../Purchase";
import { ethers } from "ethers";
import getPurchaseByHash from "../web2/getPurchaseByHash";

const getPurchaseInfoByAddress = async (address) => {
  const purchase = Purchase(address);
  const info = await purchase.getInfo();

  let titleDescSuplierInfo;
  if (ethers.constants.HashZero !== info[7]) {
    titleDescSuplierInfo = await getPurchaseByHash(info[7]);
    titleDescSuplierInfo.hash = info[7];
  } else {
    titleDescSuplierInfo = {
      title: info[8],
      desc: info[9],
    };
  }

  return {
    ...titleDescSuplierInfo,
    address: address,
    manager: info[0],
    supplier: info[1],
    priceForOneItem: ethers.utils.formatUnits(info[2], 18),
    minItems: ethers.utils.formatUnits(info[3], 0),
    endOfFundraising: info[4],
    totalItemsCount: ethers.utils.formatUnits(info[5], 0),
    isFinished: info[6],
  };
};

export default getPurchaseInfoByAddress;
