# Onchain Hunts: play links (Base Sepolia testnet)

Each game website is stored inside a smart contract (ERC-8244 `html()`).
These pages are tiny loaders: they read the site from the chain over a public
RPC, check it against the contract on-chain `PAGE_HASH`, and render it. Nothing
here contains game code or keys.

- CHOMP: [/chomp/](chomp/) (page contract on Base Sepolia, see the footer)
- Shattered Canvas: [/canvas/](canvas/)
