import mongoose from "mongoose";


const Schema = mongoose.Schema;
const coBuyer = new Schema({
  address:  String, 
  listOfPurchases: [String]
});


export const CoBuyer = mongoose.model("CoBuyer", coBuyer);