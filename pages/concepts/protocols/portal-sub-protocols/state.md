# Execution State Network

***Note that this network is not yet fully production-ready***

State data from the execution chain consists of all account data from the main Ethereum storage trie, all contract storage data from all of the individual contract storage tries, and the individul bytecodes for all contracts.

This network allows users to look up account balances and contract code and storage values.

The execution state network is a [Kademlia](../kademlia.mdx) DHT that uses the [Portal Wire Protocol](./portal-wire-protocol.md) to establish an overlay network on top of the [Discovery v5](../discovery.mdx) protocol.


## Data

All of the execution layer state data is stored in two different formats.

- Raw trie nodes
- Leaf data with merkle proof

### Data Types

The network stores the full execution layer state which encompasses the following:

- Account leaf nodes with accompanying trie proof.
- Contract storage leaf nodes with accompanying trie proof.
- Contract bytecode


## Specification

You can read the full specification on the [Portal Network Github](https://github.com/ethereum/portal-network-specs/blob/master/state-network.md).
