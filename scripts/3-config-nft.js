import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
    "0x0fA089bCf8F78AB9284274952f244cB276186d2C",
);

(async () => {
    try {
        await bundleDrop.createBatch([
            {
                name: "Peaceful beach",
                description: "This NFT will give you access to FridayDAO!",
                image: readFileSync("scripts/assets/beach.jpg"),
            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
        console.error("failed to create the new NFT", error);
    }
})()

/* RESULT

[{"address":"0xCfC33762323eaDD02D75ECA7C5DBc9BB273640e1","version":0,"metadata":{"name":"DaoTest","description":"","uri":"ipfs://bafkreigq44s4ivpf3fcztwvsvm667qj5phs5wnzrawrno5s2l6ram7mxde","image":""}}]
Your app address is: 0xCfC33762323eaDD02D75ECA7C5DBc9BB273640e1
✅ Successfully created a new NFT in the drop!
*/