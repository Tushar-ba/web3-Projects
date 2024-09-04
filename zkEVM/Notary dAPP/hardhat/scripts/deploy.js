
async function main() {
    const Notary = await ethers.getContractFactory("Notary");
    const notary = await Notary.deploy();
  
    console.log("Notary contract deployed to:", notary.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });