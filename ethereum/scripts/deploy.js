const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const PurchaseFactory = await ethers.getContractFactory("PurchaseFactory");
  const purchaseFactory = await PurchaseFactory.deploy();

  await purchaseFactory.deployed();

  console.log("PurchaseFactory address: ", purchaseFactory.address);

  //npx hardhat run scripts/deploy.js --network rinkeby
  // Contract address: 0x092d6000c53cAbBb88c5b6D678E4d47760aBceb9

  

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });