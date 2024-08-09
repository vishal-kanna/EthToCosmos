const { Web3 } = require("web3");
const { program } = require("commander");
const { Tendermint34Client } = require("@cosmjs/tendermint-rpc");
const config1 = require("./constants");
const {
  StargateClient,
  SigningStargateClient,
  defaultRegistryTypes,
} = require("@cosmjs/stargate");
const { Registry, DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { MsgSubmitInference } = require("./proto/arka/deployment/v1beta1/tx");
const { createProtobufRpcClient, QueryClient } = require("@cosmjs/stargate");
require("dotenv").config();

const MNEMONIC = process.env.COSMOS_MNEMONIC;
const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY;
const COSMOS_URL = process.env.ARKA_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const GANACHE_URL = process.env.GANACHE_URL;

const {
  QueryClientImpl,
  QueryInferenceRequest,
} = require("./proto/arka/deployment/v1beta1/query");
const web3 = new Web3(GANACHE_URL);

web3.eth
  .getChainId()
  .then((result) => {
    console.log("Chain ID: " + result);
  })
  .catch((error) => {
    console.error(error);
  });

const contract = new web3.eth.Contract(config1.CONTRACTABI, CONTRACT_ADDRESS);
const responseArray = [];

async function getInference(inferenceId, deploymentId, sender) {
  try {
    const tendermintClient = await Tendermint34Client.connect(COSMOS_URL);
    const queryClient = new QueryClient(tendermintClient);
    const rpcClient = createProtobufRpcClient(queryClient);
    const queryService = new QueryClientImpl(rpcClient);

    const query = QueryInferenceRequest.create({
      deploymentId: deploymentId,
      id: inferenceId,
      creator: sender,
    });

    const inferenceResponse = await queryService.Inference(query);

    const decoder = new TextDecoder("utf-8");
    const uint8Array = new Uint8Array(inferenceResponse.inference.request);
    inferenceResponse.inference.request = decoder.decode(uint8Array);

    const resultArray = new Uint8Array(inferenceResponse.inference.result);
    inferenceResponse.inference.result = decoder.decode(resultArray);

    if (!responseArray.some((response) => response.id === inferenceId)) {
      responseArray.push(createInferenceResponse(inferenceResponse.inference));
    }
    await resultCheck(responseArray);
  } catch (error) {
    console.error("Error during inference request:", error);
  }
}

function createInferenceResponse(inference) {
  return new InferenceResponse(
    inference.id,
    inference.request,
    inference.result,
    inference.createdAt,
    inference.status,
    inference.creator,
    inference.deploymentId,
    inference.checksum
  );
}

async function resultCheck(responseArray) {
  const toRefresh = [];

  for (let i = responseArray.length - 1; i >= 0; i--) {
    const response = responseArray[i];

    if (response.result === "") {
      toRefresh.push(response);
      responseArray.splice(i, 1);
    } else {
      await storeInferenceOnBlockchain(response);
    }
  }

  for (const response of toRefresh) {
    await getInference(response.id, response.deploymentId, response.creator);
  }
}

async function storeInferenceOnBlockchain(response) {
  try {
    const accounts = await web3.eth.getAccounts();
    const c = response.createdAt;
    const tx = contract.methods.storeInference(
      response.id,
      response.request,
      response.result,
      response.deploymentId,
      response.creator,
      String(c),
      response.status
    );

    const gas = await tx.estimateGas({ from: accounts[0] });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(accounts[0]);

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: CONTRACT_ADDRESS,
        data,
        gas,
        gasPrice,
        nonce,
      },
      ETH_PRIVATE_KEY
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log("Saved transaction>>>>>>.", receipt);
  } catch (error) {
    console.error("Error storing inference on blockchain:", error);
  }
}

// Create a Stargate client
const stargateClient = StargateClient.connect(COSMOS_URL);
// // Function to submit inference to Cosmos
async function submitInferenceToCosmos(deployment_id, request) {
  console.log("wallet from mnemonic initialisation");
  const typeUrl = "/arka.deployment.v1beta1.MsgSubmitInference";
  const myregistry = new Registry(defaultRegistryTypes);
  myregistry.register(typeUrl, MsgSubmitInference);
  const signer = await DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC, {
    prefix: "arka",
  });

  const client = await SigningStargateClient.connectWithSigner(
    COSMOS_URL,
    signer,
    { registry: myregistry }
  );
  console.log("submit to cosmos 1");

  const fee = {
    amount: [{ denom: "uarka", amount: "1" }],
    gas: "200000",
  };

  try {
    const req = btoa(request);
    const msg = MsgSubmitInference.fromPartial({
      deploymentId: deployment_id,
      request: req,
      sender: "arka1vyaqysd2d8h0twma5875afn00cfdkk7uhjzxmy",
    });
    const result = await client.signAndBroadcast(
      "arka1vyaqysd2d8h0twma5875afn00cfdkk7uhjzxmy",
      [
        {
          typeUrl: "/arka.deployment.v1beta1.MsgSubmitInference",
          value: msg,
        },
      ],
      fee,
      ""
    );
    var deploymentId = null;
    var inferenceId = null;
    var sender = null;
    for (const event of result.events) {
      if (event.type === "arka.deployment.v1beta1.EventSubmitInference") {
        for (const attribute of event.attributes) {
          if (attribute.key === "deployment_id") {
            deploymentId = attribute.value.replace(/"/g, "");
          }
          if (attribute.key === "inference_id") {
            inferenceId = attribute.value.replace(/"/g, "");
          }
          if (attribute.key == "sender") {
            sender = attribute.value.replace(/"/g, ""); // Remove quotes
          }
        }
        break;
      }
    }

    (async () => {
      await getInference(inferenceId, deploymentId, sender);
      console.log("Final responseArray:", responseArray);
    })();
  } catch (error) {
    console.error("Error submitting inference to Cosmos:", error);
  }
}
async function getInferenceValue(inferenceId) {
  try {
    const inference = await contract.methods
      .getInferenceValue(inferenceId)
      .call();
    console.log("Inference: value from contract", inference);
  } catch (error) {
    console.error("Error getting inference value:", error);
  }
}

async function submitInference(deploymentId, request) {
  const accounts = await web3.eth.getAccounts();
  const tx = contract.methods.submitInference(deploymentId, request);
  const gas = await tx.estimateGas({ from: accounts[0] });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(accounts[0]);

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: CONTRACT_ADDRESS,
      data,
      gas,
      gasPrice,
      nonce,
    },
    ETH_PRIVATE_KEY
  );

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  const eventEmitter = contract.events.InferenceSubmitted({
    fromBlock: "latest",
  });
  if (eventEmitter) {
    eventEmitter.on("data", (event) => {
      const deployment_id = Number(event.returnValues.deploymentId);
      const request = event.returnValues.request;
      console.log(
        "===========================Sending Transaction to Cosmos==========================="
      );

      submitInferenceToCosmos(deployment_id, request);
    });
  } else {
    console.error("Failed to create event emitter.");
  }
}
class InferenceResponse {
  constructor(
    id,
    request,
    result,
    createdAt,
    status,
    creator,
    deploymentId,
    checksum
  ) {
    this.id = id;
    this.request = request;
    this.result = result;
    this.createdAt = createdAt;
    this.status = status;
    this.creator = creator;
    this.deploymentId = deploymentId;
    this.checksum = checksum;
  }
}
program
  .command("submit <deploymentId> <requestData>")
  .description("Submit an inference")
  .action(async (deploymentId, requestData) => {
    try {
      await submitInference(deploymentId, requestData);
      console.log("Inference submitted successfully.");
    } catch (error) {
      console.error("Error submitting inference:", error);
    }
  });

program
  .command("get <inferenceId>")
  .description("Get inference value")
  .action(async (inferenceId) => {
    try {
      await getInferenceValue(inferenceId);
    } catch (error) {
      console.error("Error getting inference value:", error);
    }
  });

program.parse(process.argv);
