
## Setup

    If you don't have truffle or Ganache try to install them using the below commands

1. Install Truffle and Ganache

    `npm install -g truffle`

    `npm install -g ganache-cli`

2. Create a Truffle Project

    `truffle init`

3. Open the Ganache App Image

    Start the Ganache server


## Set ENV Variables

    ETH_PRIVATE_KEY ='YOUR ETH_PRIVATE_KEY'
    
    COSMOS_MNEMONIC='YOUR COSMOS_MNEMONIC'

    ARKA_URL='COSMOS RPC URL'

    CONTRACT_ADDRESS='SOLIDITY CONTRACT ADDRESS'

    GANACHE_URL="GANACHE URL"

    ABIPATH="ABI FILE PATH"


## Deploying the Contract

1. Compile the Contracts

    `truffle compile`

2. Deploy the Contracts

    `truffle migrate`


3. Interact with the SmartContract using client

    1. SubmitInference

            `npx ts-node client.js submit 2 '{"request":"Write a essay of 500 words on cosmos-sdk?"}'`
    2. GetInference

            `npx ts-node client.js get 60` 

