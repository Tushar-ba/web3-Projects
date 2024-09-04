const { artifacts } = require("hardhat");

require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  paths:{
    artifacts:"../frontend/src"
  },
  networks: {
    zkEVM: {
      url: `https://2442.rpc.thirdweb.com/`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
  },
};