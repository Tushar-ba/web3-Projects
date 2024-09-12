require( "@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports={
 solidity : "0.8.26",
networks : {
  mumbai: {
    url: `https://2442.rpc.thirdweb.com/`,
    accounts: [process.env.ACCOUNT_PRIVATE_KEY]
  }
}
};
