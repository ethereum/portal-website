# FAQ:

## What is the Portal Network?
"Portal Network" is an in-progress effort to enable lightweight protocol access to resource-constrained devices. The term "portal" indicates that these networks provide a view into the protocol but are not critical to the operation of the core Ethereum protocol.

The Portal Network will be comprised of one or more decentralized peer-to-peer networks which together provide the data and functionality necessary to expose the standard JSON-RPC API. These networks are being specially designed to ensure that clients participating in these networks can do so with minimal expenditure of networking bandwidth, CPU, RAM, and HDD resources.

## Why don't Portal clients implement the full Ethereum JSON-RPC API?
The original pitch for Portal focused on delivering a network that allowed clients to serve JSON-RPC requests by fetching data on demand from Portal. Recently we've come to understand that this use case will likely be difficult based on network latencies, forcing us to re-evaluate our roadmap. 
Portal is still building the same functionality needed to serve JSON-RPC but we expect the performance of the initial versions of the network to be too slow to compete with centralized providers.

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