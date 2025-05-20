# Retrieving block bodies using Nimbus Portal client

The Portal Network aims to provide a decentralized store of historical Ethereum data. It does this by distributing data across the network. Your Portal Network client provides you with a window into the network and request specific data from other nodes. In this guide you will learn how to start a Portal Network client and request some historical data. You will:

- Install and run the Nimbus Portal client
- Learn how to retrieve data from your node
- Learn how to decode Portal Network data

## Prerequisites

To retrieve data from the Portal network, you need to run a Portal client. In this tutorial you will use the Nimbus Portal client. This client is written in Nim.

There are several options for how you send requests to your node. In this guide you will learn how to use HTTP to send requests. The requests are formatted as JSON data, and you will send them to your node using a tool called `curl`.

The responses arrive at your node encoded, so you also have to decode them to make the data human-readable. You can use many different tools for this, in this tutorial we will use a simple Nim script. 

To follow this guide you need to have the following installed on your machine:

- [cURL](https://curl.se/)
- [Nimbus](https://github.com/status-im/nimbus-eth1)

There are specific instructions for installing the Nimbus Portal client in the next section.


## Install Nimbus Portal client

The Nimbus Portal client turns your computer into a Portal Network node, meaning it can relay requests to other nodes on the network. Your request is passed around the network until it reaches a node storing the specific information you need. Then, that node sends the data to you.

The easiest way to get the Nimbus Portal client is to clone the Github repository using:

```sh
git clone https://github.com/status-im/nimbus-eth1.git
```

Now you can build the executable by running the following command:

```sh
cd nimbus-eth1 && \
make nimbus_portal_client
```

This will create a `nimbus_portal_client` binary in `./build/nimbus_portal_client`. You can run `nimbus_portal_client` from there, or move the binary into a more convenient location.

You can now run the Nimbus Portal client! You will need to pass some flags to client to enable your node to join the network using some bootstrap nodes that use the same IP range, and to enable RPC requests.

```sh
./build/nimbus_portal_client --rpc
```

By default, the Nimbus Portal client exposes `http://localhost:8545` for HTTP traffic.

You can leave the client running for the remainder of this tutorial.


## Making a request

The Portal network has its own set of [RPC methods](https://github.com/ethereum/portal-network-specs/blob/master/jsonrpc/README.md) that are used to look up specific data on the network. 

The Nimbus Portal client implements a subset of the standard Ethereum JSON RPC methods, including `eth_getBlockByHash`. This will return block body data in human-readable form given a block hash.

Ethereum clients serve these requests by querying their own local copy of the Ethereum blockchain data. However, Portal clients do not have local Ethereum data to query. This means the request is routed through a set of Portal Network specific methods that relay the query to other nodes on the network. In this case, to serve the `eth_getBlockByhash` request the client is doing multiple `portal_historyRecursiveFindContent` calls to search the network for the block header and the block body.

The request has the following general structure:

```json
{
    "jsonrpc":"2.0", "method": "eth_getBlockByHash", "params":[<block-hash>, <tx-details>], "id":1
}
```

There are two parameters in the query: `hash` and `transaction-detail-flag`. The former is the block hash for the block you want to look up. The latter is a Boolean (true/false) that determines whether the response contains all the information about the transactions included in the block (`true`), or just their hashes (`false`).

This can be sent to your node over HTTP using curl, as follows:

```sh
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getBlockByHash", "params":["0x6ec566a8ffb0ee4680a58c23ac276285b180bd36c33db72e341c77118ac10392", false], "id":1}'
```

The response will look something like this (although there will likely be many more transactions in the `transactions` field):

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "number": "0x1154379",
    "hash": "0x6ec566a8ffb0ee4680a58c23ac276285b180bd36c33db72e341c77118ac10392",
    "parentHash": "0x90478176106fe1a3f4f38c27f76cfdb3ba2a25d64fe6727307ba2abc97ef338e",
    "nonce": "0x0000000000000000",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "logsBloom": "0x04e40979c9c2aa1d56087c6080285820456d0c63428fb0808421800227b30160700440498060002321354bf88822bba04769952acba9eda24cb2c47830240012745447087569816d2820ea3aaf144273c290102a1044090101192a479820245150580c813a0ac5c10e013a6d09010d5b27144d5a983b1fe166e5b41d724aa03d032023000f21897903c878858b0206074445032d8d2c60d9409040c733f0f4b7cb2d245a0f82ea740a0260e09012a84a02bdc516d822c332c0705dd324aaa0116463402e22090ec888043a818636f280a010460c7520601308b42b2aa591e18b5c15f4845a465289d39091aa2d201083c3a091121b1b09502b805421e0d58809",
    "transactionsRoot": "0xbbb6a8ac5a5cbd5dde25466632117d322605175dd7c6146fd3b4317926070370",
    "stateRoot": "0xd364e6b2706bd76fb144bdbc32602d1cd97b9e7dc1cec4349e395ef34dd2ff6b",
    "receiptsRoot": "0xecf61f4545befbfdda13a493f58bcf39436f53a5ea21dd1c9d318e4f8c659931",
    "miner": "0x333333f332a06ecb5d20d35da44ba07986d6e203",
    "difficulty": "0x0",
    "totalDifficulty": "0x0",
    "extraData": "0x7273796e632d6275696c6465722e78797a",
    "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "size": "0x2E9",
    "gasLimit": "0x1C9C380",
    "gasUsed": "0xACD5E5",
    "timestamp": "0x6509B91F",
    "baseFeePerGas": null,
    "transactions": [
      {
        "type": "0x2",
        "blockHash": "0x6ec566a8ffb0ee4680a58c23ac276285b180bd36c33db72e341c77118ac10392",
        "blockNumber": "0x1154379",
        "from": "0x05c5988b46e7c9fc2053f9d367de0e3bb5142353",
        "gas": "0x536FB",
        "gasPrice": "0x0",
        "maxFeePerGas": "0x7C67D616E",
        "maxPriorityFeePerGas": "0x3F5476A00",
        "hash": "0xdbb5a5052bd2e0dedfa930342bbd49b07f6164eed6c4c54ec6aadccf7a4b8eef",
        "input": "0x0162e2d000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001600000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000009000000000000000000000000000000000000000000000000000000006509b91f000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001f9d54c40a3a939159e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000003ee5026c07d85ff8ae791370dd0f4c1ae6c97fc",
        "nonce": "0x186",
        "to": "0xdb5889e35e379ef0498aae126fc2cce1fbd23216",
        "transactionIndex": "0x0",
        "value": "0x2c68af0bb140000",
        "v": "0x0",
        "r": "0x51c17a5e33af6a77bc0a17243a2252114252408f64bec1be571d9bb976864633",
        "s": "0x28d91ca84a477101a3acc674c73728b41c7ce5737faa9217fef084a73b46229f",
        "chainId": null,
        "accessList": null,
        "maxFeePerBlobGas": null,
        "versionedHashes": null
      },
      {
        "type": "0x2",
        "blockHash": "0x6ec566a8ffb0ee4680a58c23ac276285b180bd36c33db72e341c77118ac10392",
        "blockNumber": "0x1154379",
        "from": "0x7c29378c480a409648cdf5d72b7277077aa04560",
        "gas": "0x289F0",
        "gasPrice": "0x0",
        "maxFeePerGas": "0x761E6D094",
        "maxPriorityFeePerGas": "0x6DAC2C0",
        "hash": "0x582eb4520e5d595af903599eef4a82acd07b954f158b3465710ecc2de10b212a",
        "input": "0x2da03409000000000000000000000000a1bcbdd8099f315a2d5c4e5427c594920d26aa25000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7",
        "nonce": "0x9B96",
        "to": "0x87d15a98bd9be367170ebeae05d57955a9536f2d",
        "transactionIndex": "0x4C",
        "value": "0x0",
        "v": "0x0",
        "r": "0x14d731d22e137ec66656d1509d3c8eb5bf2e7bb7b50c9cc569a8b20a08a849c6",
        "s": "0x2e8e8ef13f595acd3b9b9a3a39959873830cf8a9f42b8cb7a21399c3349c0ec5",
        "chainId": null,
        "accessList": null,
        "maxFeePerBlobGas": null,
        "versionedHashes": null
      }
    ],
    "uncles": [],
    "withdrawals": null,
    "withdrawalsRoot": null,
    "blobGasUsed": null,
    "excessBlobGas": null,
    "parentBeaconBlockRoot": null
  }
}
```

## Checking available data

Portal Network is being gradually filled up with historical data through bridge nodes. At the current time, not all of Ethereum's historical data has been uploaded into the network. This means that there is a reasonable chance that an arbitrary request will fail because the data is not yet available. The chance of arbitrary requests succeeding will increase as more data is uploaded. The more people run bridge nodes, the faster this process will be.

To check what data has been uploaded to the network, you can use the network health monitoring tool, [Glados](http://glados.ethportal.net/content/).

Glados allows you to view recent uploads into the network on the landing page. However, you can also append `key/<content-key>` to the landing page URL to lookup a specific content key to see if the data is currently available.

Here's an example of a Glados entry for a recent successful upload:

[Key 0x006e0ee92ebaf1b48919d193bd574b3096a85cc2609d286cdc511ad97ce5a18159](http://glados.ethportal.net/content/key/0x006e0ee92ebaf1b48919d193bd574b3096a85cc2609d286cdc511ad97ce5a18159/)

You can tell from then key that this is a block header (begins `0x00` and the block hash was `0x06e0ee92ebaf1b48919d193bd574b3096a85cc2609d286cdc511ad97ce5a18159` )

To look for the corresponding block body you can repeat the same search but replace the leading `0x00` with `0x01`:

[Key 0x016e0ee92ebaf1b48919d193bd574b3096a85cc2609d286cdc511ad97ce5a18159/](http://glados.ethportal.net/content/key/0x016e0ee92ebaf1b48919d193bd574b3096a85cc2609d286cdc511ad97ce5a18159/)


## Summary

Well done! You have retrieved and decoded historical Ethereum data using your super lightweight Portal client!
Without using Portal Network, this same operation would require you to run a full Ethereum node or use a centralized RPC provider - instead you have done it in a decentralized and super lightweight way using the Nimbus Portal client!

In this guide you learned:

- How to run the Nimbus Portal client
- How to format a JSON RPC request
- How to send a request over HTTP
