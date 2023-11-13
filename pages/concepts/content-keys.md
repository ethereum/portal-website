# Content Keys

> Content keys are a compact way to specify which piece of data you want to access in a request to the Portal Network. 

As a user, you will usually make requests to Portal nodes using higher level APIs such as the Ethereum JSON-RPC API. This API exposes methods such as `eth_getBlockByHash`. In an Ethereum node, this API acts as an entry point into an algorithm that looks up a specific block hash in the node's local blockchain database. However, an equivalent request to a Portal node does not trigger a lookup in a local database, because there *is no local database*. The data is retrieved from other nodes on the network. 

This means that there needs to be a way to specify individual data elements in a way that is standardized across all nodes and minimizes the amount of data that has to be broadcast over the network. Instead of the high level API triggering a simple local lookup, Portal implements a lower level API for communicating requests and responses between Portal clients. All the metadata required to identify a specific piece of network data is provided in a compact form known as a **content key**. 

## Content key structure

A [content key](https://github.com/ethereum/portal-network-specs/blob/master/content-keys-test-vectors.md) is a string of hex-encoded bytes made up from an identifier and a block hash.

The identifier is a single byte that maps to the fields found in an Ethereum block, for example in the history sub-protocol:

- `0x00`: block header
- `0x01`: block body
- `0x02`: block receipts


This is prepended to the hash of the block that you want to retrieve data from. For example, if you want to retrieve the header from the block with hash `0x6f68209b1294f6365a7ef6c24d41a7195bc68831ae57261b277029196e00f6b0`, your content key would be `0x00` + `6f68209b1294f6365a7ef6c24d41a7195bc68831ae57261b277029196e00f6b0` = `0x006f68209b1294f6365a7ef6c24d41a7195bc68831ae57261b277029196e00f6b0`.


You can use the low-level API directly. The content key is sent to the node as a parameter is a JSON object along with some metadata about the request. The basic form of a request is as follows:

```json
{
    "jsonrpc":"2.0", "method": "<portal-method>", "params":[<content-key>], "id":1
}
```

This can be sent to your node over HTTP using curl, as follows:

```sh
curl -X POST --data '{"jsonrpc":"2.0", "method": "portal_historyRecursiveFindContent", "params":["0x006f68209b1294f6365a7ef6c24d41a7195bc68831ae57261b277029196e00f6b0"], "id":1}'
```

When you use a higher level API method such as `eth_getBlockHash` the client makes the lower level API requests under-the-hood, passing the content keys.

## Identifying sub-protocols

Content keys are specific to each sub-protocol. This means that a request has to have a way to be specific to a particular protocol. Since each sub-protocol establishes its own independently-managed DHT, routing requests to the right sub-protocol happens in the client simply by having API methods specific to each sub-protocol. For example, methods in the `history_` namespace interact with the History network only, and are only exposed in clients that have the history sub-protocl enabled.

Read more on content keys in the [Portal Network specification](https://github.com/ethereum/portal-network-specs/blob/master/README.md). You can also follow our [tutorial](../resources/tutorials/query-history.md) for making low-level API requests passing content keys to Trin.

