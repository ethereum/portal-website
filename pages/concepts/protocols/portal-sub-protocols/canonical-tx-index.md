# Canonical Transaction Index Network

***Note that this network is in the planning phase. It's possible that the spec will change significantly.***

The canonical transaction index consists of a mapping from transaction hash to the canonical block hash within which the transaction was included and the index of the transaction within the set of transactions executed within that block.

The canonical transaction index network is a [Kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf) DHT that uses the [Portal Wire Protocol](./portal-wire-protocol.md) to establish an overlay network on top of the [Discovery v5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5-wire.md) protocol.


## Data

### Data Types

- Transaction Index Entry


### Retrieval

- Transaction index entries can be retrieved by transaction hash.


## Specification

You can find the full specification on the [Portal Network Github](https://github.com/ethereum/portal-network-specs/blob/master/canonical-transaction-index-network.md)