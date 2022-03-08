import { CoBuyer } from "../model/CoBuyer.js";

export class CoBuyerController {
  static getCoBuyerByAddress = async (req, res) => {
    const address = req.params.address;
    const coBuyer = CoBuyer.findOne({ address: address }).then((coBuyer) =>
      res.send({ listOfPurchases: coBuyer.listOfPurchases })
    );
  };

  static addPurchaseToCoBuyer = async (req, res) => {
    const addressOfCobuyer = req.body.addressOfCobuyer;
    const addressOfPurchase = req.body.addressOfPurchase;

    let coBuyer = await CoBuyer.findOne({ address: addressOfCobuyer });
    if (!coBuyer) {
      coBuyer = new CoBuyer({
        address: addressOfCobuyer,
        listOfPurchases: [],
      });
      await coBuyer.save();
      console.log("created");
    }

    console.log("CoBuyer: ", coBuyer);
    coBuyer.listOfPurchases.push(addressOfPurchase);
    await coBuyer.save();
    console.log("CoBuyer after adding the purchase: ", coBuyer);
    res.send({
      msg: `Purchase with address ${addressOfPurchase} added to user ${addressOfCobuyer}`,
    });
  };

}
