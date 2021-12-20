import sdk from './1-initialize-sdk.js'

const tokenModule = sdk.getTokenModule(
	'0x0E0882e266B4E0AD73f67568D09Af346383aE3d7'
)

;(async () => {
	try {
		// Log the current roles.
		console.log(
			'👀 Roles that exist right now:',
			await tokenModule.getAllRoleMembers()
		)

		// Revoke all the superpowers your wallet had over the ERC-20 contract.
		await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS)
		console.log(
			'🎉 Roles after revoking ourselves',
			await tokenModule.getAllRoleMembers()
		)
		console.log(
			'✅ Successfully revoked our superpowers from the ERC-20 contract'
		)
	} catch (error) {
		console.error('Failed to revoke ourselves from the DAO treasury', error)
	}
})()

/* RESULT

Your app address is: 0xCfC33762323eaDD02D75ECA7C5DBc9BB273640e1
👀 Roles that exist right now: {
  admin: [ '0x7D7361e75fd26cF3e08714105A028Ea176f87473' ],
  minter: [
    '0x7D7361e75fd26cF3e08714105A028Ea176f87473',
    '0xC024CB403c7B342790D35BfE6C9C3914db5D3A21'
  ],
  pauser: [ '0x7D7361e75fd26cF3e08714105A028Ea176f87473' ],
  transfer: [ '0x7D7361e75fd26cF3e08714105A028Ea176f87473' ]
}
🎉 Roles after revoking ourselves {
  admin: [],
  minter: [ '0xC024CB403c7B342790D35BfE6C9C3914db5D3A21' ],
  pauser: [],
  transfer: []
}
✅ Successfully revoked our superpowers from the ERC-20 contract
*/
