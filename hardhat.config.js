require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337
    },
    base: {
      url: "https://mainnet.base.org",
      chainId: 8453,
      accounts: ["e470ec557307a6292f26815fcca7632a4e27d9459b4118eb68b223535d36b109"]
    },
    baseGoerli: {
      url: "https://goerli.base.org",
      chainId: 84531,
      accounts: ["e470ec557307a6292f26815fcca7632a4e27d9459b4118eb68b223535d36b109"]
    }
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test'
  }
};
