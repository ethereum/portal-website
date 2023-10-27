# Beacon Network

***Note that this network is not production-ready***

The Beacon Network serves data from the Beacon Chain (Ethereum's consensus protocol) designed to support light clients. 
Lightweight nodes and Portal clients will be able to use the data retrieved from this network to determine which blocks have made it on-chain, according to validators. This only applies to post-merge blocks.

The Beacon Network is a [Kademlia](../kademlia.mdx) DHT that forms an overlay network on top of the [Discovery v5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5-wire.md) network. 


### Data

The Beacon Network serves the following data types:

* `LightClientBootstrap`
* `LightClientUpdate`
* `LightClientFinalityUpdate`
* `LightClientOptimisticUpdate`
* `HistoricalSummaries`

Light client data types are defined in the light client [sync protocol](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/light-client/sync-protocol.md#containers).

## Data Retrieval

The network supports the following mechanisms for data retrieval:

* `LightClientBootstrap` structure by a post-Altair beacon block root.
* `LightClientUpdatesByRange` - requests the `LightClientUpdate` instances in the sync committee period range [start_period, start_period + count), leading up to the current head sync committee period as selected by fork choice.
* The latest `LightClientFinalityUpdate` known by a peer.
* The latest `LightClientOptimisticUpdate` known by a peer.
* The latest `HistoricalSummaries` known by a peer.

## Supporting light clients

A light client could keep track of the chain of beacon block headers by performing Light client state updates
following the light client [sync protocol](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/light-client/sync-protocol.md).
The [LightClientBootstrap](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/light-client/sync-protocol.md#lightclientbootstrap) structure allows for setting up a
[LightClientStore](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/light-client/sync-protocol.md#lightclientstore) with the initial sync committee and block header from a user-configured trusted block root.

Once the client establishes a recent header, it could sync to other headers by processing objects of type [LightClientUpdate](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/light-client/sync-protocol.md#lightclientupdate),
[LightClientFinalityUpdate](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/light-client/sync-protocol.md#lightclientfinalityupdate)
and [LightClientOptimisticUpdate](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/light-client/sync-protocol.md#lightclientoptimisticupdate).
These data types allow a client to stay up-to-date with the beacon chain.

To verify canonicalness of an execution block header older than ~27 hours, we need the ongoing `BeaconState` accumulator (state.historical_summaries) which stores Merkle roots of recent history logs.

## Specification

Read the fuill specification for the Beacon network on the [Portal Network Github](https://github.com/ethereum/portal-network-specs/blob/master/beacon-chain/beacon-network.md)