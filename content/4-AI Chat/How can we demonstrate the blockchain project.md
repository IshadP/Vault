---
title: How can we demonstrate the blockchain project
draft: false
date: 2025-09-13
ObsidianUIMode: preview
tags:
- 
---

The situation is I want to show in demonstration that 4 computers are connected via network and if I delete or change information in one file it restores with help of block chain how can do this with this app?

Thought for 8s

That's an excellent scenario to demonstrate the core value of blockchain: immutability and distributed consensus. This application is designed to leverage both blockchain for immutable events and Firebase for rich, mutable metadata.

To demonstrate that information, if "deleted or changed" on one computer, can be verified or "restored" with the help of the blockchain, you'll need to set up a distributed environment and then perform specific actions.

## The Plan

### Part 1: Set up a Distributed Development Environment

To simulate 4 computers connected via a network, you'll designate one computer as the "server" hosting the blockchain and Firebase emulators, and the other three as "clients" running the Next.js frontend.

1. **Identify the "Server" Computer**: Choose one computer that will run the Hardhat blockchain node and Firebase emulators. This computer will need a static IP address on your local network, or you'll need to know its dynamic IP. Let's assume its IP is `192.168.1.100` for this plan.
    
2. **Configure the "Server" for Network Access**:
    
    - **Modify `package.json`**: Ensure the `hardhat:node` script explicitly binds to `0.0.0.0` so it's accessible from other machines. The current `hardhat:node` script in `package.json` already uses `npx hardhat node`, and the `hardhat.config.ts` specifies `url: "http://127.0.0.1:8545"`. For external access, you might need to explicitly pass `--hostname 0.0.0.0` to the `hardhat:node` command.
        - **File**: `package.json`
        - **Change**: Locate the `hardhat:node` script and modify it to `cd apps/contracts && npx hardhat node --hostname 0.0.0.0`.
    - **File**: `apps/web/firebase.json`
    - **Change**: Verify that the `firestore` and `ui` emulator configurations have `host: "0.0.0.0"` instead of `127.0.0.1` if you want other machines to access the Firebase Emulator UI directly. The current `firebase.json` already uses `host: "127.0.0.1"`, so you'll need to change this to `0.0.0.0` for external access.
    - **Run Backend Services on "Server"**: On the designated "server" computer, open a terminal and run the following commands separately:
        - `npm run hardhat:node`
        - `npm run firebase:emulator`
        - `npm run hardhat:deploy` (after the node is running)
        - `npm run seed` (after deployment)
        - Keep these terminals open and running.
3. **Configure "Client" Computers**: On the other three computers (your "clients"), you will run only the Next.js frontend.
    
    - **File**: `apps/web/.env.local` (on each client computer)
    - **Change**: Update the following environment variables to point to the "server" computer's IP address:
        - `HARDHAT_RPC_URL=http://192.168.1.100:8545`
        - `FIRESTORE_EMULATOR_HOST=192.168.1.100:8080`
        - `FIREBASE_AUTH_EMULATOR_HOST=192.168.1.100:9099`
        - Keep `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` as they are, assuming Clerk is cloud-based.
    - **Run Frontend on "Clients"**: On each "client" computer, open a terminal in the project root and run:
        - `npm install`
        - `npm run web:dev`
        - Access the application via `http://localhost:3000` on each client.

### Part 2: Demonstrate Immutability and Verification

Now that your environment is set up, you can perform the demonstration:

1. **Initial State - Create a Batch (Manufacturer Role)**:
    
    - On one of the "client" computers, log in as a Manufacturer (e.g., using the seeded Manufacturer account).
    - Navigate to the "Create Batch" page and create a new product batch with a unique name, SKU, description, etc.
    - Observe that a QR code is generated.
    - **Demonstration Point**: Explain that this action triggers an immutable `BatchCreated` event on the blockchain and stores the rich metadata in Firebase.
2. **Verify Consistency Across All Clients**:
    
    - On all four computers (the "server" and the three "clients"), navigate to the public QR view page for the newly created batch (e.g., `/qr/[batchId]`).
    - **Demonstration Point**: Show that all computers display the exact same batch information, including the blockchain events and the Firebase metadata. This proves distributed consistency.
3. **Demonstrate Immutability of Blockchain Events**:
    
    - **Attempt to "Delete" a Blockchain Event**: Explain that there is no function to delete a `BatchCreated` event from the blockchain because it's immutable. Any attempt to alter past events would be rejected by the smart contract.
    - **Demonstration Point**: This highlights the core principle of blockchain: once an event is recorded, it cannot be changed or removed.
4. **Demonstrate Tampering with Off-chain Data (Firebase) and Blockchain Verification**:
    
    - **Simulate Tampering**: On the "server" computer, access the Firebase Emulator UI (usually at `http://localhost:4000`). Navigate to the Firestore data and find the batch you just created. Manually edit its `description` or `images` field to something incorrect or delete some metadata.
    - **Observe on Clients**: On the three "client" computers, refresh the public QR view page for that batch.
    - **Demonstration Point**:
        - The rich metadata (description, images) will now show the _tampered_ data from Firebase.
        - However, the blockchain events (e.g., `BatchCreated` with its original timestamp, manufacturer, initial location) will remain **unchanged and correct**.
        - Explain that while the mutable off-chain data was altered, the blockchain provides the immutable, verifiable truth of the core events. If the application had logic to compare the Firebase metadata with the blockchain's core facts (e.g., expected creation date, manufacturer), it could detect this discrepancy. The blockchain acts as the unalterable audit trail, allowing you to verify the integrity of the off-chain data.
5. **Demonstrate a Valid State Change (Distributor/Retailer Roles)**:
    
    - On one of the "client" computers, log in as a Distributor. Transfer the batch to a Retailer.
    - On another "client" computer, log in as a Retailer. Mark the batch as received.
    - **Demonstration Point**: Show that these actions create new, immutable `BatchTransferred` and `BatchReceived` events on the blockchain, and these events are immediately visible and consistent across all four computers. This shows how valid state transitions are recorded immutably.

This demonstration will effectively showcase how the blockchain provides an unalterable, distributed record of key events, which can be used to verify the integrity of the supply chain, even if other parts of the system (like off-chain databases) are compromised.