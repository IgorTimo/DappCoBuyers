import express from "express";
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
