require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();


const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
// const COINMARKET_API = process.env.COINMARKET_API

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
   hardhat: {
    chainId: 31337,
    blockConfirmation: 1,
   },
   sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
   },
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    outputFile: "gas-reporter.txt",
    noColors: true,
    // coinmarketcap process.env.COINMARKETCAP_API_KEY,
  },

  solidity: "0.8.7",
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
  mocha: {
    timeout: 300000, //300 seconds max
  }
}

