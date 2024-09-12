const { ethers } = require("hardhat");

async function main(){
    const tokens = await ethers.getContractFactory("Uniswap");
    await tokens.deploy();
    console.log(`the contract address is ${tokens.address}`)
}

main()
  .then(() => process.exit(0))  // If the script succeeds, exit the process with a success code (0)
  .catch((error) => {           // If the script throws an error, catch it
    console.error(error);       // Log the error to the console
    process.exit(1);            // Exit the process with a failure code (1)
  });
