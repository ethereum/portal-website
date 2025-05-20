# Retrieving historical block headers using Trin

The Portal Network aims to provide a decentralized store of historical Ethereum data. It does this by distributing data across the network. Your Portal Network client provides you with a window into the network and request specific data from other nodes. In this guide you will learn how to start a Portal Network client and request some historical data. You will:

- Install and run Trin
- Learn how to retrieve data from your node
- Learn how to decode Portal Network data

## Prerequisites

To retrieve data from the Portal network, you need to run a Portal client. In this tutorial you will use Trin. Trin is written in Rust, so your computer will need to have Rust installed.

There are several options for how you send requests to your node. In this guide you will learn how to use HTTP to send requests. The requests are formatted as JSON data, and you will send them to your node using a tool called `curl`.

The responses arrive at your node encoded, so you also have to decode them to make the data human-readable. You can use many different tools for this, in this tutorial we will use a simple Rust script. 

To follow this guide you need to have the following installed on your machine:

- [Rust](https://www.rust-lang.org/tools/install)
- [cURL](https://curl.se/)
- [Trin](https://github.com/ethereum/trin)

There are specific instructions for installing Trin in the next section.


## Install Trin

Trin turns your computer into a Portal Network node, meaning it can relay requests to other nodes on the network. Your request is passed around the network until it reaches a node storing the specific information you need. Then, that node sends the data to you.

The easiest way to get Trin is to clone the [Github repository](https://github.com/ethereum/trin) and follow the installation instructions in the [Trin book](https://ethereum.github.io/trin/developers/quick_setup.html).

Your command to start Trin with HTTP enabled is:

```sh
/usr/local/bin/trin --web3-transport http
```

By default, Trin exposes `http://localhost:8545` for HTTP traffic.

You can leave Trin running for the remainder of this tutorial.


## Making a request

The Portal network has its own set of [RPC methods](https://github.com/ethereum/portal-network-specs/blob/master/jsonrpc/README.md) that are used to look up specific data on the network. 

In this guide you will use the `portal_historyRecursiveFindContent` method. This is for looking up a specific piece of content on the Portal history network.

To define which specific piece of data you want, you have to construct a **content key**. A [content key](https://github.com/ethereum/portal-network-specs/blob/master/content-keys-test-vectors.md) is a string of hex-encoded bytes made up from an identifier and a block hash.

The identifier is a single byte that maps to the fields found in an Ethereum block, for example:

- `0x00`: block header
- `0x01`: block body
- `0x02`: block receipts


This is prepended to the hash of the block that you want to retrieve data from. For example, if you want to retrieve the header from the block with hash `0x6f68209b1294f6365a7ef6c24d41a7195bc68831ae57261b277029196e00f6b0`, your content key would be `0x00` + `6f68209b1294f6365a7ef6c24d41a7195bc68831ae57261b277029196e00f6b0` = `0x006f68209b1294f6365a7ef6c24d41a7195bc68831ae57261b277029196e00f6b0`.

The content key is sent to the node as a parameter is a JSON object along with some metadata about the request. The basic form of a request is as follows:

```json
{
    "jsonrpc":"2.0", "method": "<portal-method>", "params":[<content-key>], "id":1
}
```

This can be sent to your node over HTTP using curl, as follows:

```sh
curl -X POST --data '{"jsonrpc":"2.0", "method": "portal_historyRecursiveFindContent", "params":["0x006f68209b1294f6365a7ef6c24d41a7195bc68831ae57261b277029196e00f6b0"], "id":1}'
```

## Checking available data

Portal Network is being gradually filled up with historical data through bridge nodes. At the current time, not all of Ethereum's historical data has been uploaded into the network. This means that there is a reasonable chance that an arbitrary request will fail because the data is not yet available. The chance of arbitrary requests succeeding will increase as more data is uploaded. The more people run bridge nodes, the faster this process will be.

To check what data has been uploaded to the network, you can use the network health monitoring tool, [Glados](http://glados.ethportal.net/content/).

Glados allows you to view recent uploads into the network on the landing page. However, you can also append `key/<content-key>` to the landing page URL to lookup a specific content key to see if the data is currently available.

Here's an example of a Glados entry for a recent successful upload:

[Key 0x006e0ee92ebaf1b48919d193bd574b3096a85cc2609d286cdc511ad97ce5a18159](http://glados.ethportal.net/content/key/0x006e0ee92ebaf1b48919d193bd574b3096a85cc2609d286cdc511ad97ce5a18159/)

You can tell from the key that this is a block header (begins `0x00` and the block hash was `0x06e0ee92ebaf1b48919d193bd574b3096a85cc2609d286cdc511ad97ce5a18159` )


So, to retrieve some real data from your Portal node, you can run the following command (or if you wish, replace the content key with another one that you have verified exists using Glados):

```sh
curl -X POST --data '{"jsonrpc":"2.0", "method": "portal_historyRecursiveFindContent", "params":["0x006e0ee92ebaf1b48919d193bd574b3096a85cc2609d286cdc511ad97ce5a18159"], "id":1}'
```

In the next stage you will want to access the data in the `content` field only, so you can amend your query to strip out the relevant data and dump it to a text file:

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "portal_historyRecursiveFindContent", "params":["0x006e0ee92ebaf1b48919d193bd574b3096a85cc2609d286cdc511ad97ce5a18159"], "id":1}' | jq -r ".result.content" >> data.txt
```


## Decoding the response

The response arrives as hex encoded bytes. In order to make the response human-readable, you need to decode it. There are several ways to do this. You can visit an online RLP decoder such as [codechain.github.io/rlp-debugger](https://codechain-io.github.io/rlp-debugger/) or keep following this guide to write a small script in Rust to handle it for you.

> Note: This won't always be necessary - later when the `eth_getBlockByHash` method is implemented you will be able to request human-readable data directly! You can already use `eth_getBlockByHash` in the Nimbus Portal client.

Start by creating a new directory called `decoder`.

Inside `decoder` run `cargo init`.

This will create the bare bones of a Rust project for you. In the project root you will find a file `Cargo.toml` where the project dependencies are defined. You can copy and paste the following into your `Cargo.toml`:

```toml
[package]
name = "decoder"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
ethportal-api = "0.2.2"
eth2_ssz = "0.4.0"
hex = "0.4.3"
```

Now you can write the code for your decoder. Open `src/main.rs`, delete the contents and paste in the following:

```rs
use ethportal_api::HeaderWithProof;
use ssz::Decode;
use hex;

fn main() {
	let header_hex= "<paste the contents of data.txt here>";
    let header_bytes =  hex::decode(header_hex).unwrap();
	let header: HeaderWithProof = Decode::from_ssz_bytes(header_bytes.as_ref()).unwrap();
	println!("{:?}", header);	
}
```

You can now run your decoder app using `cargo run` from the project root. A human readable block header will be printed to the console, looking like this:

```json
{
HeaderWithProof { 
    header: Header { 
        parent_hash: 0x90478176106fe1a3f4f38c27f76cfdb3ba2a25d64fe6727307ba2abc97ef338e, 
        uncles_hash: 0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347, 
        author: 0x333333f332a06ecb5d20d35da44ba07986d6e203, 
        state_root: 0xd364e6b2706bd76fb144bdbc32602d1cd97b9e7dc1cec4349e395ef34dd2ff6b, 
        transactions_root: 0xbbb6a8ac5a5cbd5dde25466632117d322605175dd7c6146fd3b4317926070370, 
        receipts_root: 0xecf61f4545befbfdda13a493f58bcf39436f53a5ea21dd1c9d318e4f8c659931, 
        logs_bloom: 0x04e40979c9c2aa1d56087c6080285820456d0c63428fb0808421800227b30160700440498060002321354bf88822bba04769952acba9eda24cb2c47830240012745447087569816d2820ea3aaf144273c290102a1044090101192a479820245150580c813a0ac5c10e013a6d09010d5b27144d5a983b1fe166e5b41d724aa03d032023000f21897903c878858b0206074445032d8d2c60d9409040c733f0f4b7cb2d245a0f82ea740a0260e09012a84a02bdc516d822c332c0705dd324aaa0116463402e22090ec888043a818636f280a010460c7520601308b42b2aa591e18b5c15f4845a465289d39091aa2d201083c3a091121b1b09502b805421e0d58809, 
        difficulty: 0, 
        number: 18170745, 
        gas_limit: 30000000, 
        gas_used: 11326949, 
        timestamp: 1695136031, 
        extra_data: [114, 115, 121, 110, 99, 45, 98, 117, 105, 108, 100, 101, 114, 46, 120, 121, 122], 
        mix_hash: Some(0xced268a3ad5e47cc29d2ff6502d4353f1a7e6c9be349495dc7cadad54f6b3933), 
        nonce: Some(0x0000000000000000), 
        base_fee_per_gas: Some(16394876782), 
        withdrawals_root: Some(0xb257e1038cfa933c4c007a976c8e645e14b20ed2536653182be37343d9136b6c) }, 
        proof: None(SszNone { value: None }) 
    }
}
```

## Summary

Well done! You have retrieved and decoded historical Ethereum data using your super lightweight Portal client!
Without using Portal Network, this same operation would require you to run an archive node (for old data) or use a centralized RPC provider - instead you have done it in a decentralized and super lightweight way using Trin!

In this guide you learned:

- How to run Trin
- How to format a JSON RPC request
- How to send a request over HTTP
- How to handle hex encoded responses
