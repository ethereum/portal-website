# Design Requirements for Portal SubNetworks

At it's core, the Portal Network is a specialized storage network for
Ethereum's data.  It is a distributed peer-to-peer network where all nodes in
the network participate in storing and serving data.  The ongoing health of the
network depends on our protocol designs adhering to the following requirements.

## Provable Data Only

All data stored in the network must be able to be cryptographically anchored
such that it can be proven to be correct.  For example, a block header is
addressed by it's block hash, and upon retrieval, the header can then be proven
to be the correct data by taking the `keccak(rlp(header))` and verifying that it
matches the expected hash.

This requirement ensures that the network can only be used to store the intended
data, which protects it against both spam and certain categories of denial of
service attacks.  Without this requirement the network could be abused by
people attempting to store other types of data, or attacked by people trying to
fill the network's storage capacity up with garbage data.

## Canonical Data Only

All data stored in the network must be canonically anchored.  This requirement
is similar to the previous "Provable Data Only", however is a bit more specific
in that it requires all data to not only be provable, but also canonical.  An
example of this would be the header for a non-canonical block which are often
referred to as ommers (which is the gender nuetral term for aunt or uncle).  

An example of this is our use of [double batched merkle log
accumulators](https://github.com/ethereum/EIPs/pull/8277).  These allow us to
easily prove an individual block header is part of the canonical chain of
headers.

## Easy To Prove

Some things are provable, but not easy to prove.  An example of this is proving
that any individual block header is canonical.  The naive approach to proving a
header is part of the canonical chain is to trace it's parent chain backwards
in time to either genesis or to another historical header that is trusted.  In
practice, this is an arduous process that requires downloading and verifying
very large amounts of information.

The Portal Network solves this problem by borrowing from the Beacon chain
specifications and using *double batched merkle log accumulators*.  These
accumulators allow for users to verify a header is canonical by verifying a
small merkle proof instead of needing to verifying the entire historical chain
of hashes.

In general, this principle must apply to all data in our networks.


## Amplification Attacks

As we look at the various proof requirements, one "trap" that is easy to fall
into is the introduction of what is referred to as an "amplification attack".
Suppose that we were to introduce a new type of data `B` that in order to prove
it's canonicalness, a node would need to fetch a different piece of data `A`
from the network.  If the relative sizes are such that `B` is smaller than `A`
then we will also be introducing an attack vector.  

A bad actor can send out an invalid payload for `B`.  The receiving node would
then need to fetch `A` from the network in an attempt to verify the `B` payload
they received.  The verification will ultimately fail for `B`, but the damage
to the network occurs because the bad actor has been able to send a small
payload which results in the recipients then sending out larger payloads.  This
allows someone to execute a denial of service attack on our network by sending
out a lot of small payloads which inturn cause the receiving nodes to then send
out a bunch of even larger payloads, effectively amplifying the amount of
bandwidth needed to execute this attack.


## Evenly Distributed Data

The Portal Network is a fancy DHT.  This DHT has a 256 bit address space, and
all content within the portal network has a `content-id` which dictates its
location in this address space.  Data in the portal network is required to be
evenly distributed across this address space.  This is how we ensure that
individual nodes in the network are able to effectively choose how much data
they are willing to store for the network.

If our addressing scheme does not evenly distribute the data then we would end
up with areas of the address space where there is significantly more data than
other areas of the network.  We refer to such areas as *"hot spots"*.  Nodes in
the DHT that found themselves very close to these hot spots would end up being
responsible for a disporportionately large amount of data.
