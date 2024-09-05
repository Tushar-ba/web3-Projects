async function main(){
    const contract = await ethers.getContractFactory("NotaryUpgraded");
    const Contract = await contract.deploy();
    console.log(`Contract deployed to ${Contract.address}`)
}


main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});