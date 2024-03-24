const { network, getNamedAccounts, ethers } = require("hardhat")
const { developmentChains} = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")

developmentChains.includes(network.name)
? describe.skip
: describe("Raffle Unit Test",  function () {
    let raffle, raffleEntranceFee, deployer

    beforeEach(async function() {
        deployer =  (await getNamedAccounts()).deployer
        raffle = await ethers.getContract("Raffle", deployer)
        raffleEntranceFee = await raffle.getEntranceFee()
    })
    describe("fulfillRandomWords", function() {
        it("work with live Chainink keepers and Chainlink VRF, we get a random winner", async function (){
            // enter the raffle
            const startingTimeStamp = await raffle.getLatestTimeStamp()
            const accounts = await ethers.getSigners()

            await new Promise(async (resolve,reject) => {
                raffle.once("WinnerPicked", async () => {
                console.log("WinnerPicked event fired!")
                try {
                    // add our asserts here
                    const recentWinner = await raffle.getRecentWinner()
                    const raffleState = await raffle.getRaffleState()
                    const winnerEndingBalance = await accounts[0].getBalance()
                    const endingTimeStamp = await raffle.getLatestTimeStamp()
                    
                    await expect(raffle.getPlayer(0)).to.be.reverted
                    assert.equal(recentWinner.toString(), accounts[0].address)
                    assert.equal(raffleState, 0)
                    assert.equal(
                        winnerEndingBalance.toString(),
                        winnerStartingBalance.add(raffleEntranceFee).toString()
                    )
                    assert(endingTimeStamp > startingTimeStamp)
                    resolve()
                } catch (error) {
                   console.log(error) 
                   reject(error)
                }
                })
                // Then entering the raffle
                const tx = await raffle.enterRaffle({ value: raffleEntranceFee })
                await tx.wait(1)
                const winnerStartingBalance = await accounts[0].getBalance()

                // and this code wont complete untill our liatener haas finished listening!
            })
        })
    })
})