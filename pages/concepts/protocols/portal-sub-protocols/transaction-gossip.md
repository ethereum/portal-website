# Transaction Gossip Network

The transaction gossip network is designed with the following requirements.

- Transaction payloads that are being passed around the network are "self validating", meaning that they include both the transaction object and a proof against the ethereum state adequate to validate `sender.balance` and `sender.nonce` values.
- Under normal network conditions, nodes that are interested in observing the full transaction pool will reliably receive the full set of valid transactions currently being gossiped.
- Participants are not required to process the full pool and can control the total percentage of the transaction pool they wish to process.

## Specification

Read the full specification on the [Portal Network Github](https://github.com/ethereum/portal-network-specs/blob/master/transaction-gossip.md).