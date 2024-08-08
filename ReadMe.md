
# Setup

    If you don't have truffle or Ganache try to install them using the below commands

1. Install Truffle and Ganache

    `npm install -g truffle`

    `npm install -g ganache-cli`

2. Create a Truffle Project

    `truffle init`

# Deploying the Contract

1. Compile the Contracts

    `truffle compile`

2. Deploy the Contracts

    `truffle migrate`

3. Interact with the SmartContract using client

    1. SubmitInference

            `npx ts-node client.js submit 2 '{"request":"Write a essay of 500 words on cosmos-sdk?"}'`
    2. GetInference

            `npx ts-node client.js get 60` 
