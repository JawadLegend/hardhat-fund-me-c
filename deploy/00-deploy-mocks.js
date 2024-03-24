const { network } = require("hardhat")
 const {developmentChains} = require("../helper-hardhat-config")

const BASE_FEE = "250000000000000000" //0.25 is the premium. it costs 0.25 LINK per request
const GAS_PRICE_LINK = 1e9 // link per gas CALC. value based on the gas price of the chain.

// Eth price ⬆️ $1,000,000,000
// chainlink Nodes pay the gas fees to give us randomness & do external execution.
// So the price of requests change based on the of gas

module.exports = async function ({ getNamedAccounts, deployments }){
    const { deploy, log } = deployments
    const {deployer} = await getNamedAccounts()
   const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)){
        log("Local network detected! deploying mocks...")
        // deploy a mock  vrfcoordinator...
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args
        })
        log("Mocks Deployed!")
        log("---------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]