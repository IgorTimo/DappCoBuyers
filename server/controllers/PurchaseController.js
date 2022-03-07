import sha256 from "sha256";
import { PurchaseInfo } from "../model/PurchaseInfo.js";

export class PurchaseController {
  static getPurchaseByHash = async (req, res) => {
    const hash = req.params.hash;
    PurchaseInfo.findOne({ hash: hash })
      .then((purchaseInfo) => res.send({ info: purchaseInfo }))
      .catch((error) => res.send({ error: error }));
  };

  static addPurchase = async (req, res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    const supplierInfo = req.body.supplierInfo;
    const stringBeforeHash = title + desc + supplierInfo;
    const hash = sha256(stringBeforeHash);
    const purchaseInfo = new PurchaseInfo({
      hash: hash,
      title: title,
      desc: desc,
      supplierInfo: supplierInfo,
    });

    purchaseInfo.save().then(() => res.send({ hash: hash }));
  };
}
