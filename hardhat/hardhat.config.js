require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const MNEMONIC =
  "abandon purity equal shy bench zero snap state brush pepper paddle topple"; // Replace with your 12-word mnemonic
const INFURA_API_KEY = "l9Rb9m2A1qTz7PJnFTX3ZkaN05UHLjPe";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${INFURA_API_KEY}`,
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
  },
  solidity: {
    version: "0.8.15",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
