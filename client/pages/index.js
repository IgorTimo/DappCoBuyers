import { useEffect, useState } from "react";
import { ethers } from "ethers";
import purchaseFactory from "../purchaseFactory";


const PurchaseFactoryIndex = (props) => {

    const [currentAccount, setCurrentAccount] = useState('')

    


  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (ethereum) {
      console.log("Got the ethereum obejct: ", ethereum);
    } else {
      console.log("No Wallet found. Connect Wallet");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      console.log("Found authorized Account: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No authorized account found");
    }
  };

  useEffect(() => {
    // checkIfWalletIsConnected();
    purchaseFactory.getBalance("ethers.eth").then(name => console.log(">>>>>>>>name of contract: ", name));

  }, []);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain:" + chainId);

      const rinkebyChainId = "0x4";

      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Rinkeby Testnet!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Found account", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  return (
    <>
      {" "}
      <h1>Index</h1> <button onClick={connectWallet}>LogIn</button>
    </>
  );
};

export default PurchaseFactoryIndex;
