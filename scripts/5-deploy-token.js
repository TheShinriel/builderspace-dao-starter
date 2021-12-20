import sdk from './1-initialize-sdk.js'

// In order to deploy the new contract we need our old friend the app module again.
const app = sdk.getAppModule('0xCfC33762323eaDD02D75ECA7C5DBc9BB273640e1')

;(async () => {
	try {
		// Deploy a standard ERC-20 contract.
		const tokenModule = await app.deployTokenModule({
			// What's your token's name? Ex. "Ethereum"
			name: 'FridayDAO Governance Token',
			// What's your token's symbol? Ex. "ETH"
			symbol: 'HOLY',
		})
		console.log(
			'✅ Successfully deployed token module, address:',
			tokenModule.address
		)
	} catch (error) {
		console.error('failed to deploy token module', error)
	}
})()

/* RESULT

Your app address is: 0xCfC33762323eaDD02D75ECA7C5DBc9BB273640e1
✅ Successfully deployed token module, address: 0x0E0882e266B4E0AD73f67568D09Af346383aE3d7
*/
