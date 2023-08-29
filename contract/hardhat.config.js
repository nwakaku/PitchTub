require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// const PRIVATE_KEY = "2681881ef2ddd24cd569a5e5df1f34ac3f765f37ad7cffce76a9a7ee3c1fe7b8";

const PRIVATE_KEY =
  "2d3751b9f9ce92a750cc68352b78cdf63eae9f9f93d58badb396580dbf3b91a9";

module.exports = {
  solidity: "0.8.17",
  // defaultNetwork: "hyperspace",
  networks: {
    theta_testnet: {
      url: `https://eth-rpc-api-testnet.thetatoken.org/rpc`,
      accounts: [PRIVATE_KEY],
      chainId: 365,
    },
    arbitrum_Goerli: {
      url: `https://goerli-rollup.arbitrum.io/rpc`,
      accounts: [PRIVATE_KEY],
      chainId: 421613,
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      accounts: [PRIVATE_KEY]
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};