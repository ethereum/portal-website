# FAQ:

## What is the Portal Network?

Portal Network is an effort to enable extremely lighweight, decentralized access to Ethereum. Ever wanted to access deep historical data but don't fancy paying for 12TB of storage or waiting weeks to sync an archive node? Don't want to trust a third party provider to provide the data for you? Portal Network is the answer. Ever wanted to run a light client on a phone or super lightweight device without relying on a centralized RPC provider? Portal Network is the answer to that too. 

Portal Network is a set of interconnected nodes, each of whom store a small fraction of the total Ethereum data. When you request data from your node, the request is relayed across the network until it finds a node who can serve it. Then the data is sent back to you peer-to-peer. This means no individual node has to store a local copy of the entire blockchain - the data is distributed across the whole network. The Portal design ensures that nodes participating in the network can do so with minimal expenditure of network bandwidth, CPU, RAM, and hard disk resources.

The term "portal" indicates that this networks provide a view into the Ethereum protocol but Ethereum is not reliant upon Portal noides for its own operation.

## Why don't Portal clients implement the full Ethereum JSON-RPC API?

The original idea for Portal focused on allowing super lightweight Portal clients to expose the full Ethereum JSON-RPC API as a decentralized competitor to centralized providers. However, due to unavoidable network latencies, Portal can't really compete with the speed of centralized providers for several important RPC endpoints. This meant that, while the Ethereum JSON-RPC API will be implemented in Portal clients, the main value proposition comes from providing extremely lightweight, decentralized access to Ethereum history, state and transaction data. This will be used to support light and eventually stateless clients, provide history storage, generate proofs on demand and many other services that strength Ethereum and lower the barrier to entry for users. 

## What can I do with Portal Network today?

Portal Network is still in development. Today you can download and run one of three clients and use them to access historical block data (block header, bodies and receipts) but the network is not yet fully populated with data and proof of canonicality is only available fro pre-merge blocks.
We expect the history network to be the first fully production-ready network.

Other networks are in earlier development and being actively worked on by the Portal teams. You are welcome to help us build!

## Where is Portal Network going from here?

We intend to develop all five subprotocols into production-ready public networks, starting with the History Network. The State network is the next priority so that we can support light clients. Building out this core infrastructure is our primary goal. We believe many use cases will emerge when the infrastructure is in place and we anticipate working with Ethereum client developers and application developers wanting to develop truly decentralized backends for their products.


## Why develop three clients in parallel?

Having three clients being developed simultaneously in threee languages by independent teams is a great way to bootstrap resilience-by-diversity into the network. If a bug emerges in one client, the network can continue using nodes running the other clients. Having multi-client interoperability as a foundation from day one helps us to avoid building myopically, and also allows for a more diverse range of developers to make open source contributions.

## With Ethereum's state and history constantly growing, won't Portal clients eventually stop being light?

Until statelessness is shipped, Ethereum's state and history will continue to grow, and this will increase the total network storage for Portal Network. However, we anticipate this being ameliorated by growth in adoption of Portal clients that will help distribute that storage more widely. We also anticipate growing our developer community and finding more efficient storage methods. Eventually, Ethereum will ship stateless clients which will solve the issue of state and history growth.


## How do you know Portal data is from the canonical Ethereum chain?



## Could Portal Network be a blob storage layer?

In theory a Portal sub-protocol could be implemnted to provide long term blob storage in support of Ethereum rollups. However, this is not ojn the near-term roadmap.

## Could Portal Network be a history storage layer?

Yes! The Portal History Network will serve block header, block bodies and receipts, which ios all that is required to support history expiry proposals such as EIP-4444.


## Why is Ethereum data separated across multiple networks/sub-protocols?



## Why do we need the Portal network?

This effort is motivated by two overlapping goals.

### Full Functionality for Stateless Clients

The core Ethereum protocol is moving towards a "stateless" model of block verification. Under this model a client will be able to fully verify the execution of a block using a witness. Such a client would no longer need to keep or maintain any of the Ethereum "state" data. Such a client is very valuable in the context of the core protocol, as it facilitates a cleaner merge of the Eth1 and Eth2 chains.
Additional reading on why stateless is so important to the Eth1/Eth2 merge: https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
What is easy to overlook is that such a "stateless" client will be unable to much else without additional infrastructure. Specifically it would be unable to serve the vast majority of the JSON-RPC apis. The Portal Network provides this additional infrastructure, allowing stateless clients to also expose the external APIs that support the web3 ecosystem.

### Scalable Lightweight Clients
The term "light client" tends to refer to a client of the existing DevP2P LES network. This network is designed using a client/server architecture. The LES network has a total capacity dictated by the number of "servers" on the network. In order for this network to scale, the "server" capacity has to increase. This also means that at any point in time the network has some total capacity which if exceeded will cause service degredation across the network. Because of this the LES network is unreliable when operating near capacity.
The Portal Network aims to solve this problem by designing our networks so that each additional client that joints the network adds additional capacity to the network. The end result should be a network which becomes more robust and powerful as more nodes join the network.

## Why aren't there financial incentives?

TLDR: Incorrectly implemented incentives lead to perverse incentives.

Using financial incentives is a natural choice for many crypto/blockchain protocols. Well-designed incentives can be a powerful tool to encourage proper use and discourage malicious behaviour. Incentives might seem especially well-suited for the Portal Network, where the strength of the network is correlated to the number of participants and the amount of contributed computing resources. However, at the current point in time, Portal Network developers have opted out of implementing financial incentives.

The problem with financial incentives is they are complex and difficult to implement correctly. They also provide mechanisms for people to game the system and extract value rather than contribute towards overall network health. The Portal Network relies on producing a useful, lightweight client for developers, along with altruism and laziness, to encourage network adoption and sufficient computing resources.
"Never underestimate the power of laziness and software defaults" - Piper
Protocols like BitTorrent and IPFS are proof that this is a feasible strategy. Furthermore, protocols like Filecoin and The Graph Network already exist that use financial incentives to accomplish similar goals to the Portal Network.

## How can you help contribute to ETH Portal Network development?

The ETH Portal Network development effort is an open, multi-team effort. If you're interested in helping contribute towards the desgin and implementation, join the ongoing discussion happening on the discord server
There is also a weekly call Mondays @ 15.30 UTC, where we discuss the latest developments and open questions.