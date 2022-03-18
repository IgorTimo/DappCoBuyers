import { ethers } from "ethers";
import provider from './provider';



const address = "CONTRACT ADDRESS";

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_supplier",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_priceForOneItem",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minItems",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_fundraisingTime",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_hashOfAllPurchaseInfo",
        type: "bytes32",
      },
    ],
    name: "createHashPurchase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_supplier",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_priceForOneItem",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minItems",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_fundraisingTime",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_desc",
        type: "string",
      },
    ],
    name: "createStoragePurchase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deployedPurchases",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDeployedPurchases",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const purchaseFactory = new ethers.Contract(address, abi, provider);

export default purchaseFactory;