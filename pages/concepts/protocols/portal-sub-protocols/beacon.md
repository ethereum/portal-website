# Beacon Network

The Beacon Network serves data from the Beacon Chain (Ethereum's consensus protocol) designed to support light clients. Light weight nodes and Portal clients will be able to keep up to date with the Ethereum chain and check the canonicality of their post-merge blocks using data retrieved this network.

The Beacon Network is a [Kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf) DHT that forms an overlay network on top of the [Discovery v5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5-wire.md) network. 

A beacon chain light client could keep track of the chain of beacon block headers by performing Light client state updates
following the light client [sync protocol](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/light-client/sync-protocol.md).
The [LightClientBootstrap](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/light-client/sync-protocol.md#lightclientbootstrap) structure allow setting up a
[LightClientStore](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/light-client/sync-protocol.md#lightclientstore) with the initial sync committee and block header from a user-configured trusted block root.

Once the client establishes a recent header, it could sync to other headers by processing objects of type [LightClientUpdate](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/light-client/sync-protocol.md#lightclientupdate),
[LightClientFinalityUpdate](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/light-client/sync-protocol.md#lightclientfinalityupdate)
and [LightClientOptimisticUpdate](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/light-client/sync-protocol.md#lightclientoptimisticupdate).
These data types allow a client to stay up-to-date with the beacon chain.

To verify canonicalness of an execution block header older than ~27 hours, we need the ongoing `BeaconState` accumulator (state.historical_summaries) which stores Merkle roots of recent history logs.





### Data

#### Types

* LightClientBootstrap
* LightClientUpdate
* LightClientFinalityUpdate
* LightClientOptimisticUpdate
* HistoricalSummaries

Light client data types are specified in light client [sync protocol](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/light-client/sync-protocol.md#containers).

#### Retrieval

The network supports the following mechanisms for data retrieval:

* `LightClientBootstrap` structure by a post-Altair beacon block root.
* `LightClientUpdatesByRange` - requests the `LightClientUpdate` instances in the sync committee period range [start_period, start_period + count), leading up to the current head sync committee period as selected by fork choice.
* The latest `LightClientFinalityUpdate` known by a peer.
* The latest `LightClientOptimisticUpdate` known by a peer.
* The latest `HistoricalSummaries` known by a peer.

