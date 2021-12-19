import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0xCfC33762323eaDD02D75ECA7C5DBc9BB273640e1");

(async () => {
    try {
        const bundleDropModule = await app.deployBundleDropModule({
            // The collection's name, ex. CryptoPunks
            name: "FridayDAO Membership",
            // A description for the collection.
            description: "Because FRIDAY",
            // The image for the collection that will show up on OpenSea.
            image: readFileSync("scripts/assets/friday.jpg"),
            // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
            // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
            // you can set this to your own wallet address if you want to charge for the drop.
            primarySaleRecipientAddress: ethers.constants.AddressZero,
        });

        console.log(
            "✅ Successfully deployed bundleDrop module, address:",
            bundleDropModule.address,
        );
        console.log(
            "✅ bundleDrop metadata:",
            await bundleDropModule.getMetadata(),
        );
    } catch (error) {
        console.log("failed to deploy bundleDrop module", error);
    }
})()

/* RESULT

✅ Successfully deployed bundleDrop module, address: 0x0fA089bCf8F78AB9284274952f244cB276186d2C
✅ bundleDrop metadata: {
  metadata: {
    name: 'FridayDAO Membership',
    description: 'Because FRIDAY',
    image: 'https://cloudflare-ipfs.com/ipfs/bafkreigqcylzbbjwko7vgegnso5adtguz4gsawalu67sjbw6kkawejvsge',
    primary_sale_recipient_address: '0x0000000000000000000000000000000000000000',
    uri: 'ipfs://bafkreickghrdfkyyqna4uver3r46jbriivppwnw475pqm2gn6kq5dc423q'
  },
  address: '0x0fA089bCf8F78AB9284274952f244cB276186d2C',
  type: 11
}
*/