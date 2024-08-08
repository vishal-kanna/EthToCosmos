const path = require("path");
const fs = require("fs");

const ARKA_URL = "https://beta.arka.network/rpc/";
const CONTRACT_ADDRESS = "0x5c846d014Da6b29a1F9CC04b62827000C7bC8AA4";
const GANACHE_URL = "http://127.0.0.1:7545";
let CONTRACTABI;
const contractPath = path.resolve(
  __dirname,
  "../build/contracts/InferenceStorage.json"
);
try {
  CONTRACTABI = JSON.parse(fs.readFileSync(contractPath, "utf8")).abi;
} catch (error) {
  console.error("Error reading contract ABI:", error);
  process.exit(1);
}

module.exports = {
  ARKA_URL,
  CONTRACT_ADDRESS,
  GANACHE_URL,
  CONTRACTABI,
};
