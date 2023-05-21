/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY = "b3596f28f57f04880b606e05e70cb694469a2e6b8124fcb56560bc2f74746749";
const RPC_URL = "https://rpc.ankr.com/polygon_mumbai";
module.exports = {
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {
      chainId: 80001,
    },
    polygon_mumbai:{
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },    
  },
  
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
