---
title: How can we deploy blockchain project
draft: false
date: 2025-09-03
ObsidianUIMode: preview
tags:
  - ChatGPT
  - Mega_Project
---
>Context:
We are building a blockchain based supply chain platform for our mega project in college 7th sem. We will deploy it using vercel. It's written in Nextjs + node + hardhat. It has 3 major roles, Manufacturer, distributor & Retailer; and a miinor role of consumer. We will have to demonstrate the use of blockchain in project.
How can we demostrate benefits of using blockchain, if we run project locally and its deployed using vercel

You can’t show blockchain’s full value just by saying “it’s decentralized” when everything is local or hosted on Vercel. You need demonstrations that reveal blockchain’s distinct advantages over a normal database:

1. **Immutability**
    - Show a transaction log where past records cannot be altered once added.
    - Compare with a traditional database demo where data can be modified or deleted.
2. **Transparency**
    - Use a block explorer UI inside your app to show every transaction, timestamp, and wallet addresses.
    - Let each role (manufacturer, distributor, retailer, consumer) view the same shared ledger.
3. **Decentralization**
    - Run at least 2–3 local blockchain nodes (Hardhat, Ganache, or testnet accounts).
    - Show that the system doesn’t rely on a single central server for data truth.
4. **Traceability**
    - Demonstrate the flow of a product from manufacturer → distributor → retailer → consumer.
    - Each step writes a new transaction on-chain. Consumers can verify the full history.
5. **Smart Contract Automation**
    - Show an automated check, e.g. payment released to distributor only after manufacturer confirms dispatch.
    - This proves trustless operation without manual intervention.
6. **Auditability**
    - Show how an external user (like a consumer) can query product authenticity directly from the blockchain contract.
    - Example: enter a product ID → fetch origin and path → prove no tampering.

**Deployment Constraint:**  
Vercel only hosts your Next.js frontend and Node.js APIs. Blockchain itself (smart contracts) runs on a network. For demonstration:

- Use **Hardhat local blockchain** during college demo.
- Or deploy contracts on a public testnet (e.g. Sepolia). Your app then queries real blockchain data via RPC (Infura, Alchemy).

That way you can convincingly demonstrate blockchain benefits even if frontend is on Vercel.

Do you want me to design a **demo flow script** (step-by-step actions for your presentation) that highlights each benefit clearly?

---

>Can we do something like this. We have 4 pcs and we deploy blockchain locally on 4 pc via RPC then, we wipe one of the network and show it reinstates itself

Yes. That works as a decentralization demo. Mechanics:

1. **Setup**
    - Run a local private blockchain (e.g. Geth or Hardhat with multiple nodes) on 4 PCs.
    - Each PC runs one node and connects to the others via RPC.
2. **Ledger Sync**
    - Start with a product lifecycle transaction sequence. All 4 nodes hold identical blockchain state.
    - Show that each PC has the same block height and transaction history.
3. **Failure Simulation**
    - Shut down one PC or wipe its chain data.
    - Restart it with the same network config so it reconnects to the peers.
4. **Reinstatement**
    - The wiped node downloads the full ledger from the remaining 3 PCs.
    - Highlight that it automatically reaches consensus and regains the exact state.
5. **Point to Emphasize**
    - No single node is the “master.”
    - Ledger integrity persists despite one node’s data loss.
    - This is a direct visual proof of blockchain’s decentralization and fault tolerance.

This requires using a proper client (Geth, Besu, or Hardhat multi-node mode), not just Hardhat’s default single-node dev chain.

Do you want a step-by-step guide for setting up a **4-node private Ethereum network** for this demo?

---

>Generate a step by step guide

Use Geth with Clique PoA and a LAN bootnode. Four PCs act as four Ethereum nodes. Frontend on Vercel talks to any node RPC.

1. Prereqs on all 4 PCs

* OS Linux or WSL
* geth and bootnode installed
* Node.js 18 plus Hardhat
* Same LAN
* Example LAN IPs

  * PC1 192.168.1.11
  * PC2 192.168.1.12
  * PC3 192.168.1.13
  * PC4 192.168.1.14

2. Create data dirs and accounts on each PC

```bash
mkdir -p ~/supplychain/node
geth account new --datadir ~/supplychain/node
# save address and password
```

3. Collect sealer addresses

* Copy the 4 account addresses to one coordinator PC.
* You will seal on PC1, PC2, PC3. PC4 will be non-sealer full node.

4. Build Clique genesis with puppeth on coordinator PC

```bash
puppeth
```

* Create new network name supplychain
* Manage existing genesis
* Create new genesis from scratch
* Consensus engine Clique
* Block period 2
* Configure 3 sealers using the 3 addresses from PC1, PC2, PC3
* Pre-fund all 4 addresses
* No precompile changes
* Save and export genesis.json

5. Distribute genesis.json to all PCs

* Copy the same genesis.json to each PC at \~/supplychain/genesis.json

6. Init each node with the genesis

```bash
geth --datadir ~/supplychain/node init ~/supplychain/genesis.json
```

7. Start a LAN bootnode on PC1

```bash
cd ~/supplychain
bootnode -genkey boot.key
bootnode -nodekey boot.key -addr :30301
```

* Note the printed enode URL. Replace 127.0.0.1 with 192.168.1.11 and keep port 30301. Example
  enode://\<bootnode\_pubkey>@192.168.1.11:30301

8. Start Geth nodes
   PC1 sealer

```bash
geth --datadir ~/supplychain/node \
  --networkid 15151 \
  --port 30303 \
  --http --http.addr 0.0.0.0 --http.port 8545 \
  --http.api eth,net,web3,txpool,personal \
  --ws --ws.addr 0.0.0.0 --ws.port 8546 --ws.api eth,net,web3,txpool \
  --bootnodes "enode://<bootnode_pubkey>@192.168.1.11:30301" \
  --syncmode full \
  --allow-insecure-unlock \
  --unlock 0xPC1_ADDRESS \
  --password /path/to/password.txt \
  --mine --miner.etherbase 0xPC1_ADDRESS
```

PC2 sealer

```bash
geth --datadir ~/supplychain/node \
  --networkid 15151 \
  --port 30303 \
  --http --http.addr 0.0.0.0 --http.port 8545 \
  --http.api eth,net,web3,txpool,personal \
  --bootnodes "enode://<bootnode_pubkey>@192.168.1.11:30301" \
  --syncmode full \
  --allow-insecure-unlock \
  --unlock 0xPC2_ADDRESS \
  --password /path/to/password.txt \
  --mine --miner.etherbase 0xPC2_ADDRESS
```

PC3 sealer

```bash
geth --datadir ~/supplychain/node \
  --networkid 15151 \
  --port 30303 \
  --http --http.addr 0.0.0.0 --http.port 8545 \
  --http.api eth,net,web3,txpool,personal \
  --bootnodes "enode://<bootnode_pubkey>@192.168.1.11:30301" \
  --syncmode full \
  --allow-insecure-unlock \
  --unlock 0xPC3_ADDRESS \
  --password /path/to/password.txt \
  --mine --miner.etherbase 0xPC3_ADDRESS
```

PC4 non-sealer full node

```bash
geth --datadir ~/supplychain/node \
  --networkid 15151 \
  --port 30303 \
  --http --http.addr 0.0.0.0 --http.port 8545 \
  --http.api eth,net,web3,txpool \
  --bootnodes "enode://<bootnode_pubkey>@192.168.1.11:30301" \
  --syncmode full
```

9. Verify peers and blocks on any PC

```bash
geth attach http://127.0.0.1:8545
> admin.peers.length
> net.peerCount
> eth.blockNumber
```

10. Hardhat network config for deployments
    hardhat.config.js

```js
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    supplychain: {
      url: "http://192.168.1.11:8545",
      chainId: 15151,
      accounts: [
        "0xYOUR_PRIVATE_KEY" // use a funded dev key, or use ledger via MetaMask for UI only
      ]
    }
  }
};
```

Deploy

```bash
npx hardhat run scripts/deploy.js --network supplychain
```

11. Frontend wiring

* In Next.js, set NEXT\_PUBLIC\_RPC\_URL to one node RPC, for example [http://192.168.1.11:8545](http://192.168.1.11:8545)
* Use ethers with JsonRpcProvider to read chain data
* For writes use MetaMask on your laptop with a custom network

  * Network name SupplyChain
  * RPC URL [http://192.168.1.11:8545](http://192.168.1.11:8545)
  * Chain ID 15151
  * Currency symbol ETH

12. Demo flow

* Manufacturer creates product on chain using the UI. Confirm transaction hash and new block height on any node.
* Distributor and Retailer execute handoff functions. Show identical block numbers on all four PCs.
* Kill PC4 geth process. Delete its chain data.

```bash
rm -rf ~/supplychain/node/geth/chaindata
```

* Restart PC4 with the same command from step 8. Watch it resync from peers until eth.blockNumber matches.
* Show that previously created product history is fully restored on PC4 without manual recovery.

13. Notes

* Use the same genesis and networkid on all nodes
* Unique enode keys are automatic per datadir
* Keep RPC open only on LAN
* If peers fail to connect, check UDP 30303 and TCP 30303 and bootnode UDP 30301 on the LAN firewall
