# Execution

The Portal Network is a new foundation for Ethereum execution client
architecture that fundamentally fixes many inherent limitations imposed by the
original DevP2P based architecture. Here we  explore what those limitations
are, how the Portal Network solves them, and what the resulting execution
client looks like when built off of this new architecture.

## Execution Client Requirements

### Syncing the Header Chain

An execution client must start by syncing the history of the chain.  This
syncing process starts by the client filling out the header chain.  At present
clients will mostly be syncing this all the way back to genesis and with future
adoption of EIP-4444 clients may switch to syncing only the most recent blocks
from history.  In either of these models, a client needs to know what the
latest or HEAD block is and then will use that to work backwards to the genesis
block of the chain.  The academic or naive model of this involves following the
`header.parent_hash` backwards through all 20 million blocks, however, in
practice this is too slow. Clients instead fetch ranges of blocks from other
clients requesting them by block number.  In order for clients to serve this
data they must have an index that allows them to lookup blocks by their number.
This leads us to our first set of client requirements.

- The ability to fetch blocks by their hash
- The ability to fetch blocks by their block number
- The ability to fetch ranges of blocks

### Syncing the Block Bodies and Receipts

After obtaining a header, the client will then have the necessary information
to fetch the block body and the receipt for that block.  That necessary
information is the `header.transactions_root`, `header.ommers_root` and
`headers.receipts_root` which are necessary for cryptographic validation that
the data sent is indeed the data for that block.  This leads us to our next set
of client requirements.

- The ability to fetch block bodies by the block hash
- The ability to fetch block receipts by the block hash

### Syncing the State

After obtaining the full header chain and the block bodies for every block, a
client can then begin working on obtaining a copy of the state.  This can be
done by re-executing every block since genesis to recompute the full data set
locally, or by fetching a snapshot of the state from another client.  Most
clients choose to do the snapshot approach because it is significantly faster.

Historically, clients used a method of syncing the state called "fast sync",
which despite it's name, is not very fast.  This method involves starting at
the state root of the HEAD block and walking the full trie, individually
fetching every single node in the trie.  This approach has been superceded by
"snap sync" which instead involves fetching a full snapshot of only the "leaf"
data from the trie.  The efficiency of snap sync is that it fetches data in
contiguous chunks rather than as individual trie nodes.  Once a full copy of
the state has been obtained, clients can then keep their state database
up-to-date by executing every new block added to the chain and recording the
changes to the state database that result from block execution.

This leads us to the last set of client requiremments for syncing.

- For "fast sync":
  - The ability to fetch trie nodes by their node hash
- For "snap sync":
  - The ability to fetch account and contract storage leaf data at a specific block height across a specific key range in the trie.
- For Both:
  - The ability to fetch contract bytecode by its code hash.

### Staying Synced

In order for a client to stay synced, they need to be made aware of new blocks
as they are added to the chain.  New blocks are then executed locally to arrive
at the new HEAD block.  This leads us to the main client requirement for
staying online.

- Access to new block headers and bodies as they are added to the chain.

### Sending Transactions

In order for a client to send transactions, it must be a participant of the
transaction pool.  Participation in the transaction pool involves participation
in transaction gossip, which requires the ability to validate transactions.
Validation of a transaction requires an up-to-date copy of the Ethereum state
data.  This leads us to the following client requiremments.

- Ability to lookup `account.nonce` and `account.balance` values for all transactions in the transaction mempool.

## DevP2P Requirements

Putting all of this together gives us a full picture of the requirements that
the DevP2P network imposes on clients.

- A full copy of the block header chain
- A full copy of the block bodies and receipts
- A full and up-to-date copy of the state

Additionally, it imposes the following additional *implicit* requirements.

- A full index mapping block numbers to their canonical block hash
- A state database that is suitable for serving the SNAP sync protocol which
  requires the ability to efficiently fetch contiguous sections of the state
  trie data by their key range.

There are also additional implicit bandwidth requirements such as:

- Ability to continually receive the full mempool of pending transactions
- Serving other clients that choose to peer with you as a source of data for syncing.

As well as these implicit CPU and RAM requirements

- The ability to execute blocks in the EVM to keep your state database up-to-date
- Adequate RAM for caching to keep EVM execution fast.

And because the EVM tends to be limited by disk speed:

- A hard drive fast enough for state retrieval during EVM execution.

These are the invariants that DevP2P imposes on execution clients and thus the
reasons why execution clients for Ethereum are all very heavy pieces of
software.

## Reframing the Portal Network

This leads us to the reframing of what the Portal Network is.  The messaging to
date has been heavy with "light client".  While Portal Network is aimed at
lightweight Ethereum clients, it would be an understatement to say that
this is what the Portal Network primarily does.  In fact, "lightweight" clients
are more of a side effect.

The Portal Network is more accurately described as a fundamental
re-architecture of the Ethereum execution client such that the requirements
placed on client design by the network are minimal and intentional.  Lets dive
into exactly what that means.

### Distributed Storage

The most significant thing that the Portal Network does is implement a
distributed storage model for Ethereum's data.  All of the data that an
execution client might want whether it is headers, the indexes for doing block
number lookups, or state data is stored in a distributed model that allows for
clients in the network to decide how much of it they wish to store.  The
correlary to this is that all of the storage requirements that make a DevP2P
based execution client go away. Where as a DevP2P based client is required to
store a full terabyte of data, a Portal client can store as little or as much
of that data at it choses. This may seem to good to be true. How can a client
simply discard a full terabyte of data at zero cost?  The answer is that there
is a cost, and that cost is paid for in speed.

The fastest place to get any of Ethereum's data is always going to be reading
it from your own database on your own disk. A Portal client that chooses to
discard the full data set is going to be slower at everything it does than a
client that choses to keep it all locally.  The client that has the data
locally only faces the latency of fetching the data from disk.  The client that
chooses to store nothing is faced with the latency of having to navigate the
distributed storage network that is the Portal network to retrieve that data.
Depending on the use case, or the limitations of the machine running the
client, this kind of latency may be acceptable.  In other use cases it may be
justified to keep the data locally on disk.  The important part here is that
the Portal architecture allows for this trade off, where as DevP2P based
execution clients do not even have the option.

This trade off between keeping data on disk vs fetching it as needed from the
network also has an important nuance as to why Portal's architecture is so
powerful. While Ethereum's data set may measure close to a terabyte, the vast
majority of that data is never or rarely accessed.  A cleverly written
execution client that is based on the Portal network architecture would be able
to discard the data that is rarely or never accessed, while choosing to also
keep around the data that is accessed most often locally on disk.  Such a
client may be able to discard a significant portion of the overall data set
while also avoiding most or all of the performance implications of having to
fetch data from the network.  This is an area of research that hasn't been
thoroughly explored by our execution client teams because of the limitations
and requirements placed on their clients by the DevP2P protocol.

## New Capabilities

Lets look at what kind of new capabilities the Portal Network architecture
opens up for execution clients.

### Reduction in historical storage

One of the simplest capabilities that this new architecture provides is the
ability to discard historical block data. This data accounts for around 500GB
disk usage by a synced execution client.

A Portal client that is part of the history network would allocate a fixed
amount of storage they wish to offer the network.  As a participant of this
network they can then access any of the historical block data on demand by
simply looking up which nodes in the network should be storing the block data
and requesting it from them. The only cost to the client or user is network
latency in the time it takes to retrieve the block data.

An execution client that wishes to still be apart of the DevP2P network prior
to the adoption of EIP-4444 could choose to proxy any incoming requests from
the DevP2P network into the Portal network in order to remain capable of
serving requested data while still taking advantage of the Portal architecture.

The History Network is capable of serving all of the following.

- Headers addressed by the block hash
- Headers addressed by the block number
- Bodies addressed by the block hash
- Receipts addressed by the block hash

As with every piece of data stored in the Portal network, everything is
cryptographically anchored to the canonical Ethereum blockchain.


### Tracking the beacon chain HEAD

Running a beacon node alongside an execution client can be cumbersom.  Over
time, many execution clients may choose to include an embedded beacon chain
client or light client, meaning that their execution client would be both apart
of the DevP2P network and the LibP2P network that the beacon chain operates on.

An alternative would be to use the Portal Beacon Network, which implements the
beacon chain lightclient syncing protocol.  An execution client that wishes to
follow the beacon chain only needs be apart of this singular network to do so.
Any execution client that is already integrating with the Portal Network
protocols can save themselves from also needing to be part of the LibP2P
network and the maintenance overhead of a third P2P stack by using the Portal
Beacon Network.

### Reduction of state storage and management overhead

> Note that most of the State Network components of Portal are under active
> development and may be in varying stages of readyness.

The State Network component of Portal is by far the largest and most complex,
and for good reason.  Handling the state data in Ethereum is complex and
difficult.  The goal of the State Network in Portal is to offload that
complexity to the network itself, giving clients a higher degree of freedom in
how that store and handle this data.

An execution client that wishes to reduce it's overall state storage can choose
to fetch state data on demand from the Portal State Network.  The network
supports on demand retrieval of arbitrary state data, including an archival
view of this data for all historical blocks.

## New challenges for client design

There are also areas where the Portal architecture introduces new challenges
for client design.

### Trade off between latency and performance

As mentioned, one of the key features of Portal is the ability to trade
performance between network latency and local storage. Each piece of data that
is fetched from the network costs latency and performance.  This is an open
area of research so it is expected to be a rapidly evolving field since the
very first portal based execution clients are being built.  Caching will likely
play a big role in this.  

One concrete example might be the retrieval of a specific transaction within a
specific block.  The initial lookup and retrieval costs a few network round
trips to lookup what block the transaction is contained in, followed by the
retrieval of that block's header, followed by the retrieval of the block body
containing the transaction itself.  An intelligent caching strategy would
likely include keeping all of this data in a cache locally so that future
requests for that data can be served directly from disk.

More intelligent caching strategies will likely be needed for the state data. A
client would likely want to keep a list of *hot* acccounts for which it
continually maintains an up-to-date local copy of the account state. This would
be useful for any commonly accessed account such as in wallet use cases.

The most advanced strategies will likely involve keeping some kind of *cold* /
*hot* information about the ethereum state itself, so that truly cold state can
be dropped to reduce the overall state size with zero impact on normal EVM
execution. This type of approach will likely be needed for use of Portal based
execution clients in protocol use cases like staking.  In such cases it will be
important to maintain peak performance. It is also worth noting that use cases
such as these will need to take into account attack vectors such as a
transaction intentionally accessing a large amount of cold state, causing the
executing client to fall behind on block processing due to not having a full
local copy of the state.

Caching strategies for Portal clients will be an active area of research and
development for a long time as new approaches are tried and measured.
