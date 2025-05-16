import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

task('mint', 'Mint tokens to an address')
    .addParam('amount', 'Amount of tokens to mint')
    .addParam('to', 'Address to mint tokens to')
    .setAction(async (args, hre: HardhatRuntimeEnvironment) => {
        const { amount, to } = args
        const { ethers } = hre

        const MyOFTMock = await ethers.getContractFactory('MyOFTMock')
        const oft = await MyOFTMock.attach('0x630eDC40bc5c884572CBe75f6a150fF737a37E28')

        console.log(`Minting ${amount} tokens to ${to}...`)
        const tx = await oft.mint(to, amount)
        await tx.wait()
        console.log('Mint successful!')
    }) 