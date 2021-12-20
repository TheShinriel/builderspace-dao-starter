import { ethers } from 'ethers'
import sdk from './1-initialize-sdk.js'

// This is the address to our ERC-1155 membership NFT contract.
const bundleDropModule = sdk.getBundleDropModule(
	'0x0fA089bCf8F78AB9284274952f244cB276186d2C'
)

// This is the address to our ERC-20 token contract.
const tokenModule = sdk.getTokenModule(
	'0x0E0882e266B4E0AD73f67568D09Af346383aE3d7'
)

;(async () => {
	try {
		// Grab all the addresses of people who own our membership NFT, which has
		// a tokenId of 0.
		const walletAddresses = await bundleDropModule.getAllClaimerAddresses(
			'0'
		)

		if (walletAddresses.length === 0) {
			console.log(
				'No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!'
			)
			process.exit(0)
		}

		// Loop through the array of addresses.
		const airdropTargets = walletAddresses.map((address) => {
			// Pick a random # between 1000 and 10000.
			const randomAmount = Math.floor(
				Math.random() * (10000 - 1000 + 1) + 1000
			)
			console.log(
				'✅ Going to airdrop',
				randomAmount,
				'tokens to',
				address
			)

			// Set up the target.
			const airdropTarget = {
				address,
				// Remember, we need 18 decimal placees!
				amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
			}

			return airdropTarget
		})

		// Call transferBatch on all our airdrop targets.
		console.log('🌈 Starting airdrop...')
		await tokenModule.transferBatch(airdropTargets)
		console.log(
			'✅ Successfully airdropped tokens to all the holders of the NFT!'
		)
	} catch (err) {
		console.error('Failed to airdrop tokens', err)
	}
})()

/* RESULT

✅ Going to airdrop 3693 tokens to 0x7D7361e75fd26cF3e08714105A028Ea176f87473
✅ Going to airdrop 6940 tokens to 0x4871114BD54C964Dd6F9e19015cD09E183F48c9E
🌈 Starting airdrop...
[{"address":"0xCfC33762323eaDD02D75ECA7C5DBc9BB273640e1","version":0,"metadata":{"name":"DaoTest","description":"","uri":"ipfs://bafkreigq44s4ivpf3fcztwvsvm667qj5phs5wnzrawrno5s2l6ram7mxde","image":""}}]
Your app address is: 0xCfC33762323eaDD02D75ECA7C5DBc9BB273640e1
✅ Successfully airdropped tokens to all the holders of the NFT!
*/
