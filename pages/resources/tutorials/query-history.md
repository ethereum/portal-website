# Retrieving historical data from a Portal client

The Portal Network aims to provide a decentralized store of historical Ethereum data. It does this by distributing data across the network. Your Portal Network client provides you with a window into the network and request specific data from other nodes. In this guide you will learn how to start a Poral Network client and request some historical data. You will:

- install and run Trin
- learn how to retrieve data from your node
- learn how to decode Portal Network data

## Prerequisites

To retrieve data from the Portal network, you need to run a Portal client. In this tutorial you will use Trin. Trin is written in Rust, so your computer will need to have Rust installed.

There are several options for how you send requests to your node. In this guide you will learn how to use HTTP to send requests. The requests are formatted as JSON data, and you will send them to your node using a tool called `curl`.

The responses arrive at your node encoded, so you also have to decode them to make the data human-readable. You can use many different tools for this, in this tutorial we will use some simple commands from Foundry. 

To follow this guide you need to have the following installed on your machine:

- [Rust](https://www.rust-lang.org/tools/install)
- [cURL](https://curl.se/)
- [Foundry](getfoundry.sh)
- [Trin](https://github.com/ethereum/trin)

There are specific instructions for installing Trin in the next section.


## Install Trin

Trin turns your computer into a Portal Network node, meaning it can relay requests to other nodes on the network. Your request is passed around the network until it reaches a node storing the specific information you need. Then, that node sends the data to you.

The easiest way to get Trin is to clone the [Github repository](https://github.com/ethereum/trin).

With Trin downloaded, you can build the executable by running the following command from the project root:

`cargo build --workspace --release`


## send a request

## Decode response