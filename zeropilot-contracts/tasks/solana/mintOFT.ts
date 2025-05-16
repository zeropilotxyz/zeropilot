import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

task('lz:oft:solana:mint', 'Mint OFT tokens on Solana')
    .addParam('amount', 'Amount of tokens to mint')
    .addParam('to', 'Solana wallet address to mint tokens to')
    .setAction(async (args, hre: HardhatRuntimeEnvironment) => {
        const { amount, to } = args
        const { ethers } = hre

        // Load the deployed OFT Store contract
        const oftStore = await ethers.getContractAt('OFTCore', 'YOUR_OFT_STORE_ADDRESS') // Replace with your OFT Store address

        console.log(`Minting ${amount} tokens to ${to}...`)
        const tx = await oftStore.mint(to, amount)
        await tx.wait()
        console.log('Mint successful!')
    }) 