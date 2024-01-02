# FAQ:

## What is the Portal Network?

Portal Network is an effort to enable extremely lighweight, decentralized access to Ethereum. Ever wanted to access deep historical data but don't fancy paying for 12TB of storage or waiting weeks to sync an archive node? Don't want to trust a third party provider to provide the data for you? Portal Network is the answer. Ever wanted to run a light client on a phone or super lightweight device without relying on a centralized RPC provider? Portal Network is the answer to that too. 

Portal Network is a peer-to-peer network comprised of interconnected nodes, each of whom store a small fraction of the total Ethereum data. When you request data from your node, the request is relayed across the network until it finds a node who can serve it. Then the data is sent back to you peer-to-peer. This means no individual node has to store a local copy of the entire blockchain - the data is distributed across the whole network. The Portal design ensures that nodes participating in the network can do so with minimal expenditure of network bandwidth, CPU, RAM, and hard disk resources.

The term "portal" indicates that this networks provide a view into the Ethereum protocol but Ethereum is not reliant upon Portal nodes for its own operation.

## Why don't Portal clients implement the full Ethereum JSON-RPC API?

The original idea for Portal focused on allowing super lightweight Portal clients to expose the full Ethereum JSON-RPC API as a decentralized competitor to centralized providers. However, due to unavoidable network latencies, Portal can't really compete with the speed of centralized providers for several important RPC endpoints such as `eth_call`. This meant that, while the Ethereum JSON-RPC API will be implemented in Portal clients, the main value proposition comes from providing extremely lightweight, decentralized access to Ethereum history, state and transaction data. This will be used to support light and eventually stateless clients, provide history storage, generate proofs on demand and many other services that strengthen Ethereum and lower the barrier to entry for users. 

## What can I do with Portal Network today?

Portal Network is still in development. Today you can download and run one of three clients and use them to access historical block data (block header, bodies and receipts) but the network is not yet fully populated with data and proof of canonicality is only available fro pre-merge blocks.
We expect the history network to be the first fully production-ready network.

Other networks are in earlier development and being actively worked on by the Portal teams. You are welcome to help us build!

## Where is Portal Network going from here?

We intend to develop all five subprotocols into production-ready public networks, starting with the History Network. The State network is the next priority so that we can support light clients. Building out this core infrastructure is our primary goal. We believe many use cases will emerge when the infrastructure is in place and we anticipate working with Ethereum client developers and application developers wanting to develop truly decentralized backends for their products.


## Why develop three clients in parallel?

Having three clients being developed simultaneously in three languages by independent teams is a great way to bootstrap resilience-by-diversity into the network. If a bug emerges in one client, the network can continue using nodes running the other clients. Having multi-client interoperability as a foundation from day one helps us to avoid building myopically, and also allows for a more diverse range of developers to make open source contributions.

## With Ethereum's state and history constantly growing, won't Portal clients eventually stop being light?

Until statelessness is shipped, Ethereum's state and history will continue to grow, and this will increase the total network storage for Portal Network. However, we anticipate this being ameliorated by growth in adoption of Portal clients that will help distribute that storage more widely. We also anticipate growing our developer community and finding more efficient storage methods. Eventually, Ethereum will ship stateless clients which will solve the issue of state and history growth.


## How do you know Portal data is from the canonical Ethereum chain?

The canonicality of Portal data is verified using hash accumulators. For pre-merge blocks there are two accumulators: the epoch accumulator and the master accumulator. The epoch accumulator collects the block hashes for every canonical ethereum block in an epoch and constructs a Merkle tree. The root hash for the epoch tree is then added as a leaf to the master accumulator. These structures allow proofs to be generated that demonstrate that specific block hashes are part of the canonical chain. Because The Merge has already happened and the chain of pre-merge blocks is now fixed, the accumulator can be computed once and then stored as a static structure that can be shipped with Portal clients. Anyone can recompute the hash accumulator from Ethereum data.

For blocks created after The Merge, Ethereum itself contains a hash accumulator whose hashes are provided in the block data. This data can be used to generate proof that a specific hash is part of the canonical chain.

Read more about [hash accumulators](../concepts/hash-accumulators.mdx).


## Could Portal Network be a blob storage layer?

The Portal Network is well suited for storing and serving data blobs.  However, we do not currently see many use cases or need for lightweight access to this blob data which has lead us to focus development on other more useful use cases (such as access to the Ethereum state data).

## Could Portal Network be a history storage layer?

Yes! The Portal History Network will serve block header, block bodies and receipts, which is all that is required to support history expiry proposals such as EIP-4444.


## Why is Ethereum data separated across multiple networks/sub-protocols?

This allows clients to participate selectively in sharing the data that is useful to them. This helps each individual node stay lightweight and also the modularity constrains the complexity of each individual sub-protocol.  Additionally, by keeping the data separate, we are able to fine tune each network for their unique access and storage patterns.


## Why aren't there financial incentives?

TLDR: Incorrectly implemented incentives lead to perverse incentives.

Using financial incentives such as tokens is common for many crypto/blockchain protocols. Well-designed incentives can be a powerful tool to encourage proper use and discourage malicious behaviour. Incentives might seem especially well-suited for the Portal Network, where the strength of the network is correlated to the number of participants and the amount of contributed computing resources. However, at the current point in time, Portal Network developers have opted out of implementing any form of financial incentives.

The problem with financial incentives is they are complex and difficult to implement correctly. They also provide mechanisms for people to game the system and extract value rather than contribute towards overall network health. The Portal Network aims to grow adoption by being useful and through community altruism. We believe people will want to use Portal protocols because they enable much more convenient access to Ethereum and will naturally become critical Ethereum infrastructure. Protocols like BitTorrent and IPFS are proof that this is a feasible strategy.

## How can you help contribute to ETH Portal Network development?

The ETH Portal Network development effort is an open, multi-team effort. If you're interested in helping contribute towards the design and implementation, join the ongoing discussion happening on the [Discord server](https://discord.gg/rHruRsbgeY).

There is also an open weekly call Mondays @ 15.30 UTC, where we discuss the latest developments and open questions.