import mongoose from "mongoose";


const Schema = mongoose.Schema;
const purchaseInfoSchema = new Schema({
  hash:  String, 
  title: String,
  desc: String,
  supplierInfo: String
});


export const PurchaseInfo = mongoose.model("PurchaseInfo", purchaseInfoSchema);