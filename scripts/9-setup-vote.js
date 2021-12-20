import { ethers } from 'ethers'
import sdk from './1-initialize-sdk.js'

// This is our governance contract.
const voteModule = sdk.getVoteModule(
	'0xC024CB403c7B342790D35BfE6C9C3914db5D3A21'
)

// This is our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
	'0x0E0882e266B4E0AD73f67568D09Af346383aE3d7'
)

;(async () => {
	try {
		// Give our treasury the power to mint additional token if needed.
		await tokenModule.grantRole('minter', voteModule.address)

		console.log(
			'Successfully gave vote module permissions to act on token module'
		)
	} catch (error) {
		console.error(
			'failed to grant vote module permissions on token module',
			error
		)
		process.exit(1)
	}

	try {
		// Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
		const ownedTokenBalance = await tokenModule.balanceOf(
			process.env.WALLET_ADDRESS
		)

		// Grab 90% of the supply that we hold.
		const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value)
		const percent90 = ownedAmount.div(100).mul(90)

		// Transfer 90% of the supply to our voting contract.
		await tokenModule.transfer(voteModule.address, percent90)

		console.log('✅ Successfully transferred tokens to vote module')
	} catch (err) {
		console.error('failed to transfer tokens to vote module', err)
	}
})()

/* RESULT

Your app address is: 0xCfC33762323eaDD02D75ECA7C5DBc9BB273640e1
Successfully gave vote module permissions to act on token module
✅ Successfully transferred tokens to vote module
*/
