const { ethers } = require("hardhat")

const networkConfig = {
    1115111: {
        name: "sepolia",
        vrfCoordinatorV2: "0x271682DEB8C4E0901D1a1550aD2e64D568E69909",
        entranceFee: ethers.parseEther("0.01"),
        gasLane: "0xff8dedfbfa60af186cf3c830acbc32c05aae823045ae5ea7da1e45fbfaba4f92",
        subscriptionId: "6763", // need this 
        // ned to setup keepers for our contract!!
        callbackGasLimit: "500000",
        interval: "30"
    },
    31337: {
     name:"hardhat",
     entranceFee: ethers.parseEther("0.01"),
     gasLane: "0xff8dedfbfa60af186cf3c830acbc32c05aae823045ae5ea7da1e45fbfaba4f92"
    }
}

const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig, developmentChains,
}