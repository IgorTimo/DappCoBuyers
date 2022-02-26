import { ethers } from "ethers";

// const provider = new ethers.providers.Web3Provider(window.ethereum);
const provider =  new ethers.providers.EtherscanProvider("rinkeby");

export default provider;