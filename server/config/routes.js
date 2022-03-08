import express from "express";
import { CoBuyerController } from "../controllers/CoBuyerController.js";
import { PurchaseController } from "../controllers/PurchaseController.js";


export const routes = express.Router();

routes.get("/", (req, res) => {
  res.send({ message: "it's a server!" });
});

routes.get("/purchases/:hash", (req, res) => {
  PurchaseController.getPurchaseByHash(req, res);
});

routes.post("/purchases", (req, res) => {
  PurchaseController.addPurchase(req, res);
});



routes.get("/cobuyers/:address", (req, res) => {
  CoBuyerController.getCoBuyerByAddress(req, res);
})



routes.post("/cobuyers/add_purchase", (req, res) => {
  CoBuyerController.addPurchaseToCoBuyer(req, res);
})



